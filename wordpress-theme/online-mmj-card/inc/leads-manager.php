<?php
/**
 * Online MMJ Card - Backend Leads Manager & Multi-Email Notifications
 *
 * Provides complete backend management for patient evaluation leads:
 * - Stores patient inquiries in WordPress database
 * - Sends automated HTML notifications to unlimited configured emails via wp_mail()
 * - Allows admin to add/remove as many email addresses as needed
 * - Configures affiliate partner redirect URL and parameter forwarding
 * - Exports leads to CSV spreadsheet
 * - Includes [mmj_evaluation_form] shortcode for Elementor, Divi Pro, and Gutenberg
 *
 * @package Online_MMJ_Card
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

/**
 * 1. Initialize Database Table for Leads on Theme Setup / Activation
 */
if (!function_exists('online_mmj_create_leads_table')) {
    function online_mmj_create_leads_table() {
        global $wpdb;

        // Ensure table creation only executes when needed or on theme activation
        $current_db_version = get_option('online_mmj_db_version', '0');
        if ($current_db_version !== '2.1.0') {
            $table_name = $wpdb->prefix . 'mmj_evaluation_leads';
            $charset_collate = $wpdb->get_charset_collate();

            $sql = "CREATE TABLE IF NOT EXISTS $table_name (
                id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
                full_name varchar(255) NOT NULL,
                email varchar(255) NOT NULL,
                phone varchar(50) NOT NULL,
                state_code varchar(50) DEFAULT '',
                service_slug varchar(100) DEFAULT '',
                accepted_terms tinyint(1) DEFAULT 1,
                marketing_consent tinyint(1) DEFAULT 0,
                affiliate_url text NOT NULL,
                notified_emails text NOT NULL,
                user_ip varchar(45) DEFAULT '',
                source_url text,
                status varchar(50) DEFAULT 'redirected',
                created_at datetime DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id),
                KEY email (email),
                KEY created_at (created_at)
            ) $charset_collate;";

            if (defined('ABSPATH') && file_exists(ABSPATH . 'wp-admin/includes/upgrade.php')) {
                require_once ABSPATH . 'wp-admin/includes/upgrade.php';
                if (function_exists('dbDelta')) {
                    dbDelta($sql);
                }
            }
            update_option('online_mmj_db_version', '2.1.0');
        }

        // Seed default settings if not exists
        if (get_option('online_mmj_notification_emails') === false) {
            $default_emails = array(
                'doctor@onlinemmjcard.com',
                'intake@onlinemmjcard.com',
                'referrals@onlinemmjcard.com'
            );
            update_option('online_mmj_notification_emails', $default_emails);
        }

        if (get_option('online_mmj_affiliate_url') === false) {
            update_option('online_mmj_affiliate_url', 'https://leafwell.com/get-card?utm_source=onlinemmjcard&ref=affiliate_portal');
        }

        if (get_option('online_mmj_pass_params') === false) {
            update_option('online_mmj_pass_params', '1');
        }

        if (get_option('online_mmj_redirect_delay') === false) {
            update_option('online_mmj_redirect_delay', '2');
        }

        if (get_option('online_mmj_starting_price') === false) {
            update_option('online_mmj_starting_price', '$55');
        }
    }
    add_action('after_switch_theme', 'online_mmj_create_leads_table');
    add_action('admin_init', 'online_mmj_create_leads_table');
}

/**
 * 2. Register WordPress Admin Menus for Backend Functionality
 */
function online_mmj_register_leads_admin_menu() {
    // Top level admin menu
    add_menu_page(
        __('MMJ Patient Leads', 'online-mmj-card'),
        __('MMJ Leads & Emails', 'online-mmj-card'),
        'manage_options',
        'online-mmj-leads',
        'online_mmj_render_leads_list_page',
        'dashicons-clipboard',
        25
    );

    // Submenu 1: All Leads
    add_submenu_page(
        'online-mmj-leads',
        __('All Evaluation Leads', 'online-mmj-card'),
        __('All Evaluation Leads', 'online-mmj-card'),
        'manage_options',
        'online-mmj-leads',
        'online_mmj_render_leads_list_page'
    );

    // Submenu 2: Notification Emails & Affiliate Settings
    add_submenu_page(
        'online-mmj-leads',
        __('Notification Emails & Settings', 'online-mmj-card'),
        __('Notification Emails & Affiliate', 'online-mmj-card'),
        'manage_options',
        'online-mmj-lead-settings',
        'online_mmj_render_lead_settings_page'
    );
}
add_action('admin_menu', 'online_mmj_register_leads_admin_menu');

/**
 * 3. Render Backend Leads List Page (wp-admin)
 */
function online_mmj_render_leads_list_page() {
    if (!current_user_can('manage_options')) {
        wp_die(__('You do not have sufficient permissions to access this page.', 'online-mmj-card'));
    }

    global $wpdb;
    $table_name = $wpdb->prefix . 'mmj_evaluation_leads';

    // Handle delete action
    if (isset($_GET['action']) && $_GET['action'] === 'delete' && isset($_GET['lead_id'])) {
        check_admin_referer('delete_lead_' . $_GET['lead_id']);
        $lead_id = intval($_GET['lead_id']);
        $wpdb->delete($table_name, array('id' => $lead_id), array('%d'));
        echo '<div class="notice notice-success is-dismissible"><p>' . esc_html__('Lead #' . $lead_id . ' deleted successfully.', 'online-mmj-card') . '</p></div>';
    }

    // Handle resend email action
    if (isset($_GET['action']) && $_GET['action'] === 'resend' && isset($_GET['lead_id'])) {
        check_admin_referer('resend_lead_' . $_GET['lead_id']);
        $lead_id = intval($_GET['lead_id']);
        $lead = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table_name WHERE id = %d", $lead_id));
        if ($lead) {
            $notified = online_mmj_send_lead_notification_emails($lead);
            echo '<div class="notice notice-success is-dismissible"><p>' . esc_html__('Notification email resent to ' . count($notified) . ' configured recipient(s).', 'online-mmj-card') . '</p></div>';
        }
    }

    // Search query
    $search = isset($_GET['s']) ? sanitize_text_field(trim($_GET['s'])) : '';
    $where = 'WHERE 1=1';
    if (!empty($search)) {
        $like = '%' . $wpdb->esc_like($search) . '%';
        $where .= $wpdb->prepare(" AND (full_name LIKE %s OR email LIKE %s OR phone LIKE %s OR state_code LIKE %s)", $like, $like, $like, $like);
    }

    // Pagination
    $per_page = 20;
    $page = isset($_GET['paged']) ? max(1, intval($_GET['paged'])) : 1;
    $offset = ($page - 1) * $per_page;

    // Total count
    $total_leads = $wpdb->get_var("SELECT COUNT(*) FROM $table_name $where");
    $total_pages = ceil($total_leads / $per_page);

    // Today count
    $today_count = $wpdb->get_var("SELECT COUNT(*) FROM $table_name WHERE DATE(created_at) = CURDATE()");

    // Leads query
    $leads = $wpdb->get_results("SELECT * FROM $table_name $where ORDER BY id DESC LIMIT $per_page OFFSET $offset");
    $configured_emails = get_option('online_mmj_notification_emails', array());
    $affiliate_url = get_option('online_mmj_affiliate_url', '');

    ?>
    <div class="wrap mmj-admin-wrap" style="max-width: 1200px;">
        <h1 class="wp-heading-inline">
            <span class="dashicons dashicons-clipboard" style="font-size:28px; width:28px; height:28px; vertical-align:middle; margin-right:6px; color:#008f58;"></span>
            <?php esc_html_e('Medical Marijuana Patient Leads', 'online-mmj-card'); ?>
        </h1>
        
        <a href="<?php echo esc_url(admin_url('admin-post.php?action=export_mmj_leads_csv')); ?>" class="page-title-action button-primary" style="background:#008f58; border-color:#007a4a;">
            <span class="dashicons dashicons-download" style="vertical-align:text-top; margin-right:4px;"></span>
            <?php esc_html_e('Export All Leads to CSV', 'online-mmj-card'); ?>
        </a>

        <a href="<?php echo esc_url(admin_url('admin.php?page=online-mmj-lead-settings')); ?>" class="page-title-action button">
            <span class="dashicons dashicons-email-alt" style="vertical-align:text-top; margin-right:4px;"></span>
            <?php esc_html_e('Manage Notification Emails (' . count($configured_emails) . ')', 'online-mmj-card'); ?>
        </a>

        <hr class="wp-header-end">

        <!-- Stat Cards -->
        <div style="display:flex; gap:16px; margin:20px 0; flex-wrap:wrap;">
            <div style="background:#fff; border:1px solid #ccd0d4; border-left:4px solid #008f58; padding:16px 20px; border-radius:4px; flex:1; min-width:200px; box-shadow:0 1px 1px rgba(0,0,0,.04);">
                <div style="font-size:12px; font-weight:600; text-transform:uppercase; color:#646970;">Total Leads Captured</div>
                <div style="font-size:28px; font-weight:700; color:#1d2327; margin-top:4px;"><?php echo number_format_i18n($total_leads); ?></div>
            </div>

            <div style="background:#fff; border:1px solid #ccd0d4; border-left:4px solid #2271b1; padding:16px 20px; border-radius:4px; flex:1; min-width:200px; box-shadow:0 1px 1px rgba(0,0,0,.04);">
                <div style="font-size:12px; font-weight:600; text-transform:uppercase; color:#646970;">Leads Received Today</div>
                <div style="font-size:28px; font-weight:700; color:#1d2327; margin-top:4px;"><?php echo number_format_i18n($today_count); ?></div>
            </div>

            <div style="background:#fff; border:1px solid #ccd0d4; border-left:4px solid #72aee6; padding:16px 20px; border-radius:4px; flex:1; min-width:200px; box-shadow:0 1px 1px rgba(0,0,0,.04);">
                <div style="font-size:12px; font-weight:600; text-transform:uppercase; color:#646970;">Active Notification Emails</div>
                <div style="font-size:28px; font-weight:700; color:#1d2327; margin-top:4px;"><?php echo count($configured_emails); ?> <?php esc_html_e('Recipients', 'online-mmj-card'); ?></div>
            </div>

            <div style="background:#fff; border:1px solid #ccd0d4; border-left:4px solid #4ab866; padding:16px 20px; border-radius:4px; flex:1; min-width:200px; box-shadow:0 1px 1px rgba(0,0,0,.04);">
                <div style="font-size:12px; font-weight:600; text-transform:uppercase; color:#646970;">Affiliate Redirection</div>
                <div style="font-size:13px; font-weight:600; color:#135e96; margin-top:8px; word-break:break-all;">
                    <a href="<?php echo esc_url($affiliate_url); ?>" target="_blank" rel="noopener">
                        <?php echo esc_html(wp_trim_words($affiliate_url, 6, '...')); ?> &rarr;
                    </a>
                </div>
            </div>
        </div>

        <!-- Search Form -->
        <form method="get" style="margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
            <input type="hidden" name="page" value="online-mmj-leads" />
            <p class="search-box" style="position:static; margin:0;">
                <label class="screen-reader-text" for="post-search-input"><?php esc_html_e('Search Leads:', 'online-mmj-card'); ?></label>
                <input type="search" id="post-search-input" name="s" value="<?php echo esc_attr($search); ?>" placeholder="Search by name, email, phone, state..." style="width:280px;" />
                <input type="submit" id="search-submit" class="button" value="<?php esc_attr_e('Search Leads', 'online-mmj-card'); ?>" />
                <?php if (!empty($search)) : ?>
                    <a href="<?php echo esc_url(admin_url('admin.php?page=online-mmj-leads')); ?>" class="button"><?php esc_html_e('Reset', 'online-mmj-card'); ?></a>
                <?php endif; ?>
            </p>
            <div style="color:#646970; font-size:13px;">
                <?php printf(esc_html__('Showing %s leads', 'online-mmj-card'), '<strong>' . count($leads) . '</strong>'); ?>
            </div>
        </form>

        <!-- Leads Table -->
        <table class="wp-list-table widefat fixed striped table-view-list">
            <thead>
                <tr>
                    <th scope="col" style="width:50px;">#ID</th>
                    <th scope="col" style="width:160px;"><?php esc_html_e('Patient Name', 'online-mmj-card'); ?></th>
                    <th scope="col" style="width:190px;"><?php esc_html_e('Contact Information', 'online-mmj-card'); ?></th>
                    <th scope="col" style="width:110px;"><?php esc_html_e('State / Service', 'online-mmj-card'); ?></th>
                    <th scope="col"><?php esc_html_e('Affiliate Partner Redirect URL', 'online-mmj-card'); ?></th>
                    <th scope="col" style="width:140px;"><?php esc_html_e('Submitted At', 'online-mmj-card'); ?></th>
                    <th scope="col" style="width:120px; text-align:right;"><?php esc_html_e('Actions', 'online-mmj-card'); ?></th>
                </tr>
            </thead>
            <tbody>
                <?php if (!empty($leads)) : ?>
                    <?php foreach ($leads as $lead) : 
                        $resend_url = wp_nonce_url(admin_url('admin.php?page=online-mmj-leads&action=resend&lead_id=' . $lead->id), 'resend_lead_' . $lead->id);
                        $delete_url = wp_nonce_url(admin_url('admin.php?page=online-mmj-leads&action=delete&lead_id=' . $lead->id), 'delete_lead_' . $lead->id);
                        $notified_list = maybe_unserialize($lead->notified_emails);
                        if (!is_array($notified_list)) {
                            $notified_list = explode(',', (string)$lead->notified_emails);
                        }
                    ?>
                        <tr>
                            <td><strong>#<?php echo esc_html($lead->id); ?></strong></td>
                            <td>
                                <strong style="font-size:14px; color:#1d2327;"><?php echo esc_html($lead->full_name); ?></strong>
                                <?php if ($lead->marketing_consent) : ?>
                                    <span style="display:block; font-size:10px; color:#008f58; font-weight:600;">&check; Updates Opt-in</span>
                                <?php endif; ?>
                            </td>
                            <td>
                                <div><a href="mailto:<?php echo esc_attr($lead->email); ?>" style="font-weight:600; text-decoration:none;">📧 <?php echo esc_html($lead->email); ?></a></div>
                                <div style="margin-top:2px;"><a href="tel:<?php echo esc_attr($lead->phone); ?>" style="color:#50575e; text-decoration:none;">📞 <?php echo esc_html($lead->phone); ?></a></div>
                            </td>
                            <td>
                                <span class="badge" style="background:#e6f4ea; color:#137333; padding:2px 8px; border-radius:10px; font-weight:700; text-transform:uppercase; font-size:11px;">
                                    <?php echo esc_html($lead->state_code ? strtoupper($lead->state_code) : 'CA'); ?>
                                </span>
                                <div style="font-size:11px; color:#646970; margin-top:3px;">
                                    <?php echo esc_html(str_replace('-', ' ', ucwords($lead->service_slug))); ?>
                                </div>
                            </td>
                            <td>
                                <a href="<?php echo esc_url($lead->affiliate_url); ?>" target="_blank" rel="noopener" style="font-size:11px; color:#2271b1; word-break:break-all; display:block; max-height:36px; overflow:hidden; text-overflow:ellipsis;">
                                    <?php echo esc_html($lead->affiliate_url); ?>
                                </a>
                                <span style="font-size:10px; color:#646970;">
                                    Dispatched to <?php echo count($notified_list); ?> email(s)
                                </span>
                            </td>
                            <td>
                                <div style="font-size:12px; font-weight:600;"><?php echo esc_html(date_i18n(get_option('date_format'), strtotime($lead->created_at))); ?></div>
                                <div style="font-size:11px; color:#646970;"><?php echo esc_html(date_i18n(get_option('time_format'), strtotime($lead->created_at))); ?></div>
                            </td>
                            <td style="text-align:right;">
                                <a href="<?php echo esc_url($resend_url); ?>" class="button button-small" title="<?php esc_attr_e('Resend notification email to all addresses', 'online-mmj-card'); ?>" onclick="return confirm('Resend email notification for this patient lead?');">
                                    Resend
                                </a>
                                <a href="<?php echo esc_url($delete_url); ?>" class="button button-small button-link-delete" onclick="return confirm('Permanently delete this lead?');" style="color:#b32d2e; margin-left:4px;">
                                    Delete
                                </a>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php else : ?>
                    <tr>
                        <td colspan="7" style="text-align:center; padding:30px; color:#646970;">
                            <span class="dashicons dashicons-clipboard" style="font-size:36px; width:36px; height:36px; display:block; margin:0 auto 10px; color:#ccd0d4;"></span>
                            <p style="font-size:14px; margin:0;"><?php esc_html_e('No patient evaluation leads recorded yet.', 'online-mmj-card'); ?></p>
                            <p style="font-size:12px; margin-top:4px;"><?php esc_html_e('As soon as patients submit the intake evaluation form on your website, their full information will be stored here and emailed instantly to your notification list.', 'online-mmj-card'); ?></p>
                        </td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>

        <!-- Pagination -->
        <?php if ($total_pages > 1) : ?>
            <div class="tablenav bottom" style="margin-top:16px;">
                <div class="tablenav-pages">
                    <span class="displaying-num"><?php printf(esc_html__('%s items', 'online-mmj-card'), number_format_i18n($total_leads)); ?></span>
                    <?php
                    echo paginate_links(array(
                        'base'    => add_query_arg('paged', '%#%'),
                        'format'  => '',
                        'prev_text' => '&laquo;',
                        'next_text' => '&raquo;',
                        'total'   => $total_pages,
                        'current' => $page,
                    ));
                    ?>
                </div>
            </div>
        <?php endif; ?>
    </div>
    <?php
}

/**
 * 4. Render Backend Notification Emails & Affiliate Settings Page
 */
function online_mmj_render_lead_settings_page() {
    if (!current_user_can('manage_options')) {
        wp_die(__('You do not have sufficient permissions to access this page.', 'online-mmj-card'));
    }

    // Save settings
    if (isset($_POST['online_mmj_save_settings_nonce']) && wp_verify_nonce($_POST['online_mmj_save_settings_nonce'], 'online_mmj_save_settings_action')) {
        // Process emails
        $submitted_emails = isset($_POST['notification_emails']) ? (array)$_POST['notification_emails'] : array();
        $cleaned_emails = array();
        foreach ($submitted_emails as $em) {
            $em = sanitize_email(trim($em));
            if (!empty($em) && is_email($em) && !in_array($em, $cleaned_emails)) {
                $cleaned_emails[] = $em;
            }
        }
        if (empty($cleaned_emails)) {
            $cleaned_emails = array(get_option('admin_email'));
        }
        update_option('online_mmj_notification_emails', $cleaned_emails);

        // Process affiliate settings
        if (isset($_POST['affiliate_url'])) {
            update_option('online_mmj_affiliate_url', esc_url_raw($_POST['affiliate_url']));
        }
        update_option('online_mmj_pass_params', isset($_POST['pass_params']) ? '1' : '0');
        if (isset($_POST['redirect_delay'])) {
            update_option('online_mmj_redirect_delay', max(0, intval($_POST['redirect_delay'])));
        }
        if (isset($_POST['starting_price'])) {
            update_option('online_mmj_starting_price', sanitize_text_field($_POST['starting_price']));
        }

        echo '<div class="notice notice-success is-dismissible"><p>' . esc_html__('Lead notification and affiliate settings updated successfully!', 'online-mmj-card') . '</p></div>';
    }

    // Handle test email action
    if (isset($_POST['online_mmj_send_test_email']) && check_admin_referer('online_mmj_test_email_action', 'online_mmj_test_email_nonce')) {
        $test_emails = get_option('online_mmj_notification_emails', array(get_option('admin_email')));
        $test_lead = (object) array(
            'id' => 9999,
            'full_name' => 'John Doe (Test Patient)',
            'email' => 'john.doe.test@example.com',
            'phone' => '(888) 420-6789',
            'state_code' => 'CA',
            'service_slug' => 'new-patient-recommendation',
            'affiliate_url' => get_option('online_mmj_affiliate_url', 'https://affiliate.onlinemmjcard.com/booking'),
            'user_ip' => '127.0.0.1',
            'created_at' => current_time('mysql'),
            'source_url' => home_url('/book-evaluation/'),
            'marketing_consent' => 1,
        );

        $sent = online_mmj_send_lead_notification_emails($test_lead);
        if (!empty($sent)) {
            echo '<div class="notice notice-success is-dismissible"><p><strong>&check; ' . esc_html__('Test notification email successfully dispatched to ' . count($sent) . ' recipient(s): ' . implode(', ', $sent), 'online-mmj-card') . '</strong></p></div>';
        } else {
            echo '<div class="notice notice-error is-dismissible"><p><strong>' . esc_html__('Failed to send test email. Please check your WordPress mail / SMTP configuration.', 'online-mmj-card') . '</strong></p></div>';
        }
    }

    $emails = get_option('online_mmj_notification_emails', array(get_option('admin_email')));
    $affiliate_url = get_option('online_mmj_affiliate_url', 'https://leafwell.com/get-card?utm_source=onlinemmjcard&ref=affiliate_portal');
    $pass_params = get_option('online_mmj_pass_params', '1');
    $redirect_delay = get_option('online_mmj_redirect_delay', '2');
    $starting_price = get_option('online_mmj_starting_price', '$55');

    ?>
    <div class="wrap mmj-admin-wrap" style="max-width: 900px;">
        <h1>
            <span class="dashicons dashicons-email-alt" style="font-size:28px; width:28px; height:28px; vertical-align:middle; margin-right:6px; color:#008f58;"></span>
            <?php esc_html_e('Notification Emails & Affiliate Settings', 'online-mmj-card'); ?>
        </h1>
        <p class="description">
            <?php esc_html_e('Configure where patient lead notifications are dispatched as soon as someone submits the evaluation form. You can add as many email addresses as needed.', 'online-mmj-card'); ?>
        </p>

        <form method="post" action="">
            <?php wp_nonce_field('online_mmj_save_settings_action', 'online_mmj_save_settings_nonce'); ?>

            <!-- Notification Emails Card -->
            <div class="postbox" style="margin-top:20px; border-radius:6px; box-shadow:0 1px 3px rgba(0,0,0,.08);">
                <div class="postbox-header" style="background:#f8fafc; border-bottom:1px solid #e2e8f0; padding:12px 18px;">
                    <h2 class="hndle" style="font-size:16px; font-weight:700; color:#0f172a; margin:0;">
                        <?php esc_html_e('1. Notification Email Addresses (Unlimited)', 'online-mmj-card'); ?>
                    </h2>
                </div>
                <div class="inside" style="padding:18px;">
                    <p style="margin-top:0; font-size:13px; color:#475569;">
                        <?php esc_html_e('Whenever a patient fills out the intake form, an instant notification containing all of their contact details, state, and evaluation requirements will be sent to every address listed below:', 'online-mmj-card'); ?>
                    </p>

                    <div id="mmj-emails-repeater" style="margin-bottom:16px;">
                        <?php foreach ($emails as $idx => $email_val) : ?>
                            <div class="mmj-email-row" style="display:flex; gap:8px; align-items:center; margin-bottom:10px;">
                                <span class="dashicons dashicons-email" style="color:#64748b;"></span>
                                <input type="email" name="notification_emails[]" value="<?php echo esc_attr($email_val); ?>" placeholder="name@clinic.com" style="width:340px; padding:6px 10px;" required />
                                <button type="button" class="button mmj-remove-email-btn" style="color:#b32d2e; border-color:#e2e8f0;" <?php if (count($emails) <= 1) echo 'disabled'; ?>>
                                    &times; <?php esc_html_e('Remove', 'online-mmj-card'); ?>
                                </button>
                            </div>
                        <?php endforeach; ?>
                    </div>

                    <button type="button" id="mmj-add-email-btn" class="button button-secondary" style="border-color:#008f58; color:#008f58; font-weight:600;">
                        <span class="dashicons dashicons-plus-alt2" style="vertical-align:text-top; margin-right:4px;"></span>
                        <?php esc_html_e('+ Add Another Email Address', 'online-mmj-card'); ?>
                    </button>
                </div>
            </div>

            <!-- Affiliate Partner Redirect Settings Card -->
            <div class="postbox" style="margin-top:20px; border-radius:6px; box-shadow:0 1px 3px rgba(0,0,0,.08);">
                <div class="postbox-header" style="background:#f8fafc; border-bottom:1px solid #e2e8f0; padding:12px 18px;">
                    <h2 class="hndle" style="font-size:16px; font-weight:700; color:#0f172a; margin:0;">
                        <?php esc_html_e('2. Affiliate Partner Redirection', 'online-mmj-card'); ?>
                    </h2>
                </div>
                <div class="inside" style="padding:18px;">
                    <table class="form-table" style="margin:0; width:100%;">
                        <tr>
                            <th scope="row"><label for="affiliate_url"><?php esc_html_e('Affiliate Partner URL:', 'online-mmj-card'); ?></label></th>
                            <td>
                                <input type="url" id="affiliate_url" name="affiliate_url" value="<?php echo esc_attr($affiliate_url); ?>" class="regular-text" style="width:100%;" required />
                                <p class="description"><?php esc_html_e('The target affiliate landing page where patients will be forwarded to complete their appointment with the partner clinic.', 'online-mmj-card'); ?></p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><?php esc_html_e('Forward Patient Info:', 'online-mmj-card'); ?></th>
                            <td>
                                <label for="pass_params">
                                    <input type="checkbox" id="pass_params" name="pass_params" value="1" <?php checked($pass_params, '1'); ?> />
                                    <?php esc_html_e('Append patient parameters (name, email, phone, state) to the affiliate redirect URL', 'online-mmj-card'); ?>
                                </label>
                                <p class="description"><?php esc_html_e('Enables autofill and conversion tracking on partner booking forms.', 'online-mmj-card'); ?></p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="redirect_delay"><?php esc_html_e('Redirect Delay (Seconds):', 'online-mmj-card'); ?></label></th>
                            <td>
                                <input type="number" id="redirect_delay" name="redirect_delay" value="<?php echo esc_attr($redirect_delay); ?>" min="0" max="10" style="width:80px;" />
                                <p class="description"><?php esc_html_e('Time to show the "Evaluation Intake Saved & Forwarding" confirmation overlay before redirecting (recommended: 2 seconds).', 'online-mmj-card'); ?></p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="starting_price"><?php esc_html_e('Form Starting Price Tag:', 'online-mmj-card'); ?></label></th>
                            <td>
                                <input type="text" id="starting_price" name="starting_price" value="<?php echo esc_attr($starting_price); ?>" style="width:120px;" placeholder="$55" />
                                <p class="description"><?php esc_html_e('Starting price shown on the intake form subheader (e.g. $55, $39.99).', 'online-mmj-card'); ?></p>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <!-- Save Changes -->
            <p class="submit" style="margin-top:20px;">
                <input type="submit" name="submit" id="submit" class="button button-primary button-large" value="<?php esc_attr_e('Save Settings', 'online-mmj-card'); ?>" style="background:#008f58; border-color:#007a4a; padding:6px 24px; font-weight:700;" />
            </p>
        </form>

        <!-- Test Notification Email Dispatcher -->
        <div class="postbox" style="margin-top:30px; border-radius:6px; box-shadow:0 1px 3px rgba(0,0,0,.08); border-left:4px solid #2271b1;">
            <div class="inside" style="padding:18px;">
                <h3 style="margin-top:0; font-size:15px; font-weight:700; color:#1e293b;">
                    <?php esc_html_e('Verify Email Sending (Test Notification)', 'online-mmj-card'); ?>
                </h3>
                <p style="font-size:13px; color:#475569;">
                    <?php esc_html_e('Click the button below to send a sample test evaluation lead notification email to all configured recipient addresses right now:', 'online-mmj-card'); ?>
                </p>
                <form method="post" action="">
                    <?php wp_nonce_field('online_mmj_test_email_action', 'online_mmj_test_email_nonce'); ?>
                    <button type="submit" name="online_mmj_send_test_email" class="button button-secondary" style="font-weight:600;">
                        <span class="dashicons dashicons-email" style="vertical-align:text-top; margin-right:4px;"></span>
                        <?php esc_html_e('Send Test Notification Email Now', 'online-mmj-card'); ?>
                    </button>
                </form>
            </div>
        </div>
    </div>

    <!-- Repeater Script for Dynamic Email List -->
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        const repeater = document.getElementById('mmj-emails-repeater');
        const addBtn = document.getElementById('mmj-add-email-btn');

        if (!repeater || !addBtn) return;

        function updateRemoveButtons() {
            const rows = repeater.querySelectorAll('.mmj-email-row');
            rows.forEach(function(row) {
                const btn = row.querySelector('.mmj-remove-email-btn');
                if (btn) btn.disabled = (rows.length <= 1);
            });
        }

        addBtn.addEventListener('click', function() {
            const div = document.createElement('div');
            div.className = 'mmj-email-row';
            div.style.cssText = 'display:flex; gap:8px; align-items:center; margin-bottom:10px;';
            div.innerHTML = `
                <span class="dashicons dashicons-email" style="color:#64748b;"></span>
                <input type="email" name="notification_emails[]" value="" placeholder="doctor@clinic.com" style="width:340px; padding:6px 10px;" required />
                <button type="button" class="button mmj-remove-email-btn" style="color:#b32d2e; border-color:#e2e8f0;">&times; Remove</button>
            `;
            repeater.appendChild(div);
            div.querySelector('input').focus();
            updateRemoveButtons();
        });

        repeater.addEventListener('click', function(e) {
            if (e.target && e.target.classList.contains('mmj-remove-email-btn')) {
                const rows = repeater.querySelectorAll('.mmj-email-row');
                if (rows.length > 1) {
                    e.target.closest('.mmj-email-row').remove();
                    updateRemoveButtons();
                }
            }
        });

        updateRemoveButtons();
    });
    </script>
    <?php
}

/**
 * 5. Automated HTML Email Dispatch Function
 */
function online_mmj_send_lead_notification_emails($lead) {
    $recipients = get_option('online_mmj_notification_emails', array(get_option('admin_email')));
    if (empty($recipients)) {
        $recipients = array(get_option('admin_email'));
    }

    $site_name = get_bloginfo('name');
    $subject = sprintf('🚨 New MMJ Patient Lead: %s (%s)', $lead->full_name, !empty($lead->state_code) ? strtoupper($lead->state_code) : 'CA');

    // Build responsive HTML message
    $headers = array('Content-Type: text/html; charset=UTF-8');
    $headers[] = 'From: ' . $site_name . ' Telehealth <no-reply@' . parse_url(home_url(), PHP_URL_HOST) . '>';

    $body  = '<!DOCTYPE html><html><head><meta charset="utf-8">';
    $body .= '<style>body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;color:#1e293b;line-height:1.5;margin:0;padding:24px;background:#f1f5f9;} .card{background:#ffffff;border-radius:12px;max-width:600px;margin:0 auto;overflow:hidden;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);} .header{background:#008f58;color:#ffffff;padding:24px 28px;} .content{padding:28px;} table{width:100%;border-collapse:collapse;margin:16px 0;} th{text-align:left;font-size:12px;color:#64748b;text-transform:uppercase;padding:8px 0;width:140px;border-bottom:1px solid #f1f5f9;} td{padding:8px 0;font-size:14px;border-bottom:1px solid #f1f5f9;font-weight:600;color:#0f172a;} .btn{display:inline-block;background:#008f58;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:700;font-size:14px;margin-top:16px;} .footer{background:#f8fafc;padding:16px 28px;font-size:12px;color:#64748b;border-top:1px solid #e2e8f0;}</style>';
    $body .= '</head><body><div class="card">';
    $body .= '<div class="header"><h1 style="margin:0;font-size:20px;font-weight:800;letter-spacing:-0.5px;">🚨 New Patient Evaluation Lead</h1><p style="margin:4px 0 0;font-size:13px;opacity:0.9;">Submitted via ' . esc_html($site_name) . '</p></div>';
    $body .= '<div class="content">';
    $body .= '<p style="margin-top:0;font-size:14px;color:#334155;">A new patient has completed the medical marijuana evaluation intake form. Here are their complete details:</p>';
    $body .= '<table>';
    $body .= '<tr><th>Patient Name</th><td><strong style="color:#008f58;font-size:16px;">' . esc_html($lead->full_name) . '</strong></td></tr>';
    $body .= '<tr><th>Email Address</th><td><a href="mailto:' . esc_attr($lead->email) . '" style="color:#0284c7;text-decoration:none;">' . esc_html($lead->email) . '</a></td></tr>';
    $body .= '<tr><th>Phone Number</th><td><a href="tel:' . esc_attr($lead->phone) . '" style="color:#0284c7;text-decoration:none;">' . esc_html($lead->phone) . '</a></td></tr>';
    $body .= '<tr><th>State</th><td><span style="background:#e6f4ea;color:#137333;padding:2px 8px;border-radius:4px;font-weight:700;">' . esc_html(!empty($lead->state_code) ? strtoupper($lead->state_code) : 'CA') . '</span></td></tr>';
    $body .= '<tr><th>Service Requested</th><td>' . esc_html(str_replace('-', ' ', ucwords($lead->service_slug))) . '</td></tr>';
    $body .= '<tr><th>Submission Time</th><td>' . esc_html(date_i18n('F j, Y, g:i a', strtotime($lead->created_at))) . '</td></tr>';
    $body .= '<tr><th>Referral Target</th><td><a href="' . esc_url($lead->affiliate_url) . '" style="color:#64748b;font-size:12px;word-break:break-all;">' . esc_html($lead->affiliate_url) . '</a></td></tr>';
    if (!empty($lead->user_ip)) {
        $body .= '<tr><th>Patient IP</th><td>' . esc_html($lead->user_ip) . '</td></tr>';
    }
    $body .= '</table>';
    $body .= '<div style="text-align:center;"><a href="' . esc_url(admin_url('admin.php?page=online-mmj-leads')) . '" class="btn">View All Leads in WordPress Admin &rarr;</a></div>';
    $body .= '</div>';
    $body .= '<div class="footer">This is an automated notification from your Online MMJ Card telemedicine platform. Configured recipients: ' . esc_html(implode(', ', $recipients)) . '</div>';
    $body .= '</div></body></html>';

    $successfully_sent = array();
    foreach ($recipients as $recipient_email) {
        $sent = wp_mail($recipient_email, $subject, $body, $headers);
        if ($sent) {
            $successfully_sent[] = $recipient_email;
        }
    }

    return $successfully_sent;
}

/**
 * 6. REST API & AJAX Endpoints for Form Submissions
 */
function online_mmj_register_lead_endpoints() {
    register_rest_route('online-mmj/v1', '/submit-evaluation', array(
        'methods'             => 'POST',
        'callback'            => 'online_mmj_handle_api_lead_submission',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'online_mmj_register_lead_endpoints');

// AJAX fallback
add_action('wp_ajax_submit_mmj_lead', 'online_mmj_handle_ajax_lead_submission');
add_action('wp_ajax_nopriv_submit_mmj_lead', 'online_mmj_handle_ajax_lead_submission');

function online_mmj_handle_ajax_lead_submission() {
    $data = $_POST;
    $result = online_mmj_process_lead_data($data);
    wp_send_json($result);
}

function online_mmj_handle_api_lead_submission($request) {
    $data = $request->get_json_params();
    if (empty($data)) {
        $data = $request->get_body_params();
    }
    $result = online_mmj_process_lead_data($data);
    return new WP_REST_Response($result, $result['success'] ? 200 : 400);
}

/**
 * Core processor for saving lead, sending notifications, and returning affiliate URL
 */
function online_mmj_process_lead_data($data) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'mmj_evaluation_leads';

    $full_name = isset($data['fullName']) ? sanitize_text_field($data['fullName']) : (isset($data['full_name']) ? sanitize_text_field($data['full_name']) : '');
    $email     = isset($data['email']) ? sanitize_email($data['email']) : '';
    $phone     = isset($data['phoneNumber']) ? sanitize_text_field($data['phoneNumber']) : (isset($data['phone']) ? sanitize_text_field($data['phone']) : '');
    $state_id  = isset($data['stateId']) ? sanitize_text_field($data['stateId']) : (isset($data['state']) ? sanitize_text_field($data['state']) : 'california');
    $service_id = isset($data['serviceId']) ? sanitize_text_field($data['serviceId']) : (isset($data['service']) ? sanitize_text_field($data['service']) : 'new-patient');
    $marketing = !empty($data['marketingConsent']) || !empty($data['marketing_consent']) ? 1 : 0;
    $source_url = isset($data['sourceUrl']) ? esc_url_raw($data['sourceUrl']) : (isset($_SERVER['HTTP_REFERER']) ? esc_url_raw($_SERVER['HTTP_REFERER']) : home_url());

    if (empty($full_name) || empty($email) || !is_email($email) || empty($phone)) {
        return array(
            'success' => false,
            'message' => 'Please provide a valid full name, email, and phone number.',
        );
    }

    // Retrieve affiliate settings
    $base_affiliate_url = get_option('online_mmj_affiliate_url', 'https://leafwell.com/get-card?utm_source=onlinemmjcard&ref=affiliate_portal');
    $pass_params = get_option('online_mmj_pass_params', '1');

    // Build affiliate URL with patient parameters
    $final_redirect_url = $base_affiliate_url;
    if ($pass_params === '1') {
        $parts = explode(' ', trim($full_name));
        $first_name = $parts[0];
        $last_name = count($parts) > 1 ? implode(' ', array_slice($parts, 1)) : '';

        $query_args = array(
            'name'       => $full_name,
            'first_name' => $first_name,
            'last_name'  => $last_name,
            'email'      => $email,
            'phone'      => $phone,
            'state'      => $state_id,
            'service'    => $service_id,
            'ref'        => 'onlinemmjcard',
            'timestamp'  => time(),
        );
        $final_redirect_url = add_query_arg($query_args, $base_affiliate_url);
    }

    $notified_emails = get_option('online_mmj_notification_emails', array(get_option('admin_email')));
    $user_ip = !empty($_SERVER['REMOTE_ADDR']) ? sanitize_text_field($_SERVER['REMOTE_ADDR']) : '';

    // Insert lead into database
    $inserted = $wpdb->insert(
        $table_name,
        array(
            'full_name'         => $full_name,
            'email'             => $email,
            'phone'             => $phone,
            'state_code'        => $state_id,
            'service_slug'      => $service_id,
            'accepted_terms'    => 1,
            'marketing_consent' => $marketing,
            'affiliate_url'     => $final_redirect_url,
            'notified_emails'   => maybe_serialize($notified_emails),
            'user_ip'           => $user_ip,
            'source_url'        => $source_url,
            'status'            => 'redirected',
            'created_at'        => current_time('mysql'),
        ),
        array('%s', '%s', '%s', '%s', '%s', '%d', '%d', '%s', '%s', '%s', '%s', '%s', '%s')
    );

    $lead_id = $wpdb->insert_id;

    // Send notifications to all configured emails
    $lead_obj = (object) array(
        'id'           => $lead_id,
        'full_name'    => $full_name,
        'email'        => $email,
        'phone'        => $phone,
        'state_code'   => $state_id,
        'service_slug' => $service_id,
        'affiliate_url'=> $final_redirect_url,
        'user_ip'      => $user_ip,
        'created_at'   => current_time('mysql'),
    );
    $sent_emails = online_mmj_send_lead_notification_emails($lead_obj);

    return array(
        'success'         => true,
        'leadId'          => $lead_id,
        'redirectUrl'     => $final_redirect_url,
        'notifiedEmails'  => $sent_emails,
        'redirectDelay'   => intval(get_option('online_mmj_redirect_delay', 2)),
    );
}

/**
 * 7. CSV Export Handler
 */
function online_mmj_export_leads_csv() {
    if (!current_user_can('manage_options')) {
        wp_die(__('Unauthorized', 'online-mmj-card'));
    }

    global $wpdb;
    $table_name = $wpdb->prefix . 'mmj_evaluation_leads';
    $leads = $wpdb->get_results("SELECT * FROM $table_name ORDER BY id DESC");

    $filename = 'mmj_patient_leads_' . date('Y-m-d_His') . '.csv';

    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=' . $filename);
    header('Pragma: no-cache');
    header('Expires: 0');

    $output = fopen('php://output', 'w');
    fputcsv($output, array('Lead ID', 'Date Created', 'Patient Name', 'Email', 'Phone', 'State', 'Service', 'Marketing Opt-In', 'Affiliate Redirect URL', 'IP Address'));

    foreach ($leads as $l) {
        fputcsv($output, array(
            $l->id,
            $l->created_at,
            $l->full_name,
            $l->email,
            $l->phone,
            $l->state_code,
            $l->service_slug,
            $l->marketing_consent ? 'Yes' : 'No',
            $l->affiliate_url,
            $l->user_ip,
        ));
    }

    fclose($output);
    exit;
}
add_action('admin_post_export_mmj_leads_csv', 'online_mmj_export_leads_csv');

/**
 * 8. Shortcode [mmj_evaluation_form] for Elementor, Divi Pro, and Gutenberg
 *
 * Allows embedding the exact intake evaluation form into ANY Elementor section,
 * Divi Code or Text module, or WordPress Gutenberg block.
 */
if (!function_exists('online_mmj_evaluation_form_shortcode')) {
    function online_mmj_evaluation_form_shortcode($atts) {
        $a = shortcode_atts(array(
            'title'        => 'ONLINE MMJ EVALUATION',
            'starting_at'  => get_option('online_mmj_starting_price', '$55'),
            'default_state'=> 'california',
            'button_text'  => 'Continue &rarr;',
        ), $atts);

        $form_id = 'mmj_form_' . wp_rand(1000, 9999);
        $ajax_url = admin_url('admin-ajax.php');

        ob_start();
        ?>
        <div id="<?php echo esc_attr($form_id); ?>" class="mmj-evaluation-card" style="background:#fff; border-radius:24px; box-shadow:0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1); border:2px solid #d1fae5; padding:28px 24px; max-width:480px; margin:0 auto; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; text-align:left; position:relative;">
            
            <div style="position:absolute; top:-14px; right:20px; background:#008f58; color:#fff; font-size:11px; font-weight:800; padding:4px 12px; border-radius:9999px; text-transform:uppercase; letter-spacing:0.5px; box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);">
                99% Approved · Same Day
            </div>

            <div style="text-align:center; margin-bottom:18px;">
                <h3 style="margin:0; font-size:22px; font-weight:900; color:#008f58; text-transform:uppercase; letter-spacing:-0.5px;">
                    <?php echo esc_html($a['title']); ?>
                </h3>
                <p style="margin:4px 0 0; font-size:13px; color:#475569; font-weight:600;">
                    Certified Medical Doctors from <span style="color:#008f58; font-weight:800; font-size:15px;"><?php echo esc_html($a['starting_at']); ?></span>
                </p>
            </div>

            <div class="mmj-form-feedback" style="display:none; padding:10px 14px; border-radius:8px; margin-bottom:14px; font-size:12px; font-weight:700;"></div>

            <form class="mmj-ajax-intake-form" onsubmit="return false;">
                <div style="margin-bottom:12px;">
                    <label style="display:block; font-size:12px; font-weight:700; color:#334155; margin-bottom:4px;">Full Name</label>
                    <input type="text" name="fullName" placeholder="Full name as per ID" required style="width:100%; padding:10px 14px; border:1px solid #cbd5e1; border-radius:10px; font-size:14px; box-sizing:border-box;" />
                </div>

                <div style="margin-bottom:12px;">
                    <label style="display:block; font-size:12px; font-weight:700; color:#334155; margin-bottom:4px;">Email Address</label>
                    <input type="email" name="email" placeholder="name@example.com" required style="width:100%; padding:10px 14px; border:1px solid #cbd5e1; border-radius:10px; font-size:14px; box-sizing:border-box;" />
                </div>

                <div style="margin-bottom:12px;">
                    <label style="display:block; font-size:12px; font-weight:700; color:#334155; margin-bottom:4px;">Phone Number</label>
                    <input type="tel" name="phoneNumber" placeholder="(555) 000-0000" required style="width:100%; padding:10px 14px; border:1px solid #cbd5e1; border-radius:10px; font-size:14px; box-sizing:border-box;" />
                </div>

                <div style="display:flex; gap:10px; margin-bottom:14px;">
                    <div style="flex:1;">
                        <label style="display:block; font-size:12px; font-weight:700; color:#334155; margin-bottom:4px;">State</label>
                        <select name="stateId" style="width:100%; padding:10px; border:1px solid #cbd5e1; border-radius:10px; font-size:13px; font-weight:600; box-sizing:border-box;">
                            <option value="california">California (CA)</option>
                            <option value="new-york">New York (NY)</option>
                            <option value="florida">Florida (FL)</option>
                            <option value="pennsylvania">Pennsylvania (PA)</option>
                            <option value="ohio">Ohio (OH)</option>
                            <option value="texas">Texas (TX)</option>
                            <option value="illinois">Illinois (IL)</option>
                            <option value="michigan">Michigan (MI)</option>
                            <option value="virginia">Virginia (VA)</option>
                            <option value="oklahoma">Oklahoma (OK)</option>
                        </select>
                    </div>
                    <div style="flex:1;">
                        <label style="display:block; font-size:12px; font-weight:700; color:#334155; margin-bottom:4px;">Service</label>
                        <select name="serviceId" style="width:100%; padding:10px; border:1px solid #cbd5e1; border-radius:10px; font-size:13px; font-weight:600; box-sizing:border-box;">
                            <option value="new-patient">New Patient Rec</option>
                            <option value="renewal">Card Renewal</option>
                            <option value="cultivation">99-Plant Cultivation</option>
                            <option value="esa-letter">ESA Dog/Cat Letter</option>
                        </select>
                    </div>
                </div>

                <div style="margin-bottom:14px; font-size:11px; color:#475569;">
                    <label style="display:flex; align-items:flex-start; gap:6px; cursor:pointer;">
                        <input type="checkbox" name="acceptedTerms" required checked style="margin-top:2px;" />
                        <span>I agree to the <a href="<?php echo esc_url(home_url('/terms-and-conditions/')); ?>" target="_blank" style="color:#008f58; text-decoration:underline;">Terms of Service</a> & <a href="<?php echo esc_url(home_url('/privacy-policy/')); ?>" target="_blank" style="color:#008f58; text-decoration:underline;">Privacy Policy</a>.</span>
                    </label>
                </div>

                <button type="submit" class="mmj-submit-btn" style="width:100%; background:#008f58; color:#fff; font-size:14px; font-weight:900; text-transform:uppercase; letter-spacing:0.5px; padding:14px 20px; border:none; border-radius:12px; cursor:pointer; box-shadow:0 4px 6px -1px rgba(0,0,0,0.1); transition:background .2s;">
                    <?php echo esc_html($a['button_text']); ?>
                </button>

                <p style="margin:12px 0 0; text-align:center; font-size:11px; color:#94a3b8;">
                    &bull; HIPAA Compliant &bull; 100% Refund Guarantee If Not Approved
                </p>
            </form>
        </div>

        <script>
        (function() {
            const wrap = document.getElementById('<?php echo esc_js($form_id); ?>');
            if (!wrap) return;
            const form = wrap.querySelector('.mmj-ajax-intake-form');
            const feedback = wrap.querySelector('.mmj-form-feedback');
            const submitBtn = wrap.querySelector('.mmj-submit-btn');

            form.addEventListener('submit', function(e) {
                e.preventDefault();
                submitBtn.disabled = true;
                submitBtn.textContent = 'Processing Intake...';
                feedback.style.display = 'none';

                const formData = new FormData(form);
                formData.append('action', 'submit_mmj_lead');

                fetch('<?php echo esc_url($ajax_url); ?>', {
                    method: 'POST',
                    body: formData
                })
                .then(res => res.json())
                .then(data => {
                    if (data.success && data.redirectUrl) {
                        feedback.style.display = 'block';
                        feedback.style.background = '#e6f4ea';
                        feedback.style.color = '#137333';
                        feedback.style.border = '1px solid #ceead6';
                        feedback.textContent = 'Intake Saved! Forwarding to partner clinic...';

                        setTimeout(function() {
                            window.location.href = data.redirectUrl;
                        }, (data.redirectDelay || 2) * 1000);
                    } else {
                        feedback.style.display = 'block';
                        feedback.style.background = '#fce8e6';
                        feedback.style.color = '#c5221f';
                        feedback.style.border = '1px solid #fad2cf';
                        feedback.textContent = data.message || 'Error submitting intake. Please check fields.';
                        submitBtn.disabled = false;
                        submitBtn.textContent = '<?php echo esc_js($a['button_text']); ?>';
                    }
                })
                .catch(err => {
                    feedback.style.display = 'block';
                    feedback.style.background = '#fce8e6';
                    feedback.style.color = '#c5221f';
                    feedback.style.border = '1px solid #fad2cf';
                    feedback.textContent = 'Network error. Please try again.';
                    submitBtn.disabled = false;
                    submitBtn.textContent = '<?php echo esc_js($a['button_text']); ?>';
                });
            });
        })();
        </script>
        <?php
        return ob_get_clean();
    }
    add_shortcode('mmj_evaluation_form', 'online_mmj_evaluation_form_shortcode');
}
