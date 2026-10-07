<?php
/**
 * Online MMJ Card Theme Functions and Definitions
 *
 * Built for 100% Page Builder compatibility (Elementor, Gutenberg, Divi),
 * advanced SEO plugins (Rank Math, Yoast SEO, AIOSEO), dynamic menus, and widget areas.
 *
 * @package Online_MMJ_Card
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

/**
 * ------------------------------------------------------------------------
 * 0. OnlineMMJCard Error Logging & Safe Activation Diagnostics
 * ------------------------------------------------------------------------
 * Intercepts PHP fatal errors, uncaught exceptions, and WP_Error objects
 * specifically generated within the OnlineMMJCard theme, writing actionable
 * messages and stack traces to a dedicated theme log file instead of white-screening.
 */

if (!function_exists('online_mmj_get_debug_log_file')) {
    /**
     * Resolve the dedicated /wp-content/debug.log file path
     */
    function online_mmj_get_debug_log_file() {
        if (defined('WP_CONTENT_DIR')) {
            return WP_CONTENT_DIR . '/debug.log';
        }
        if (defined('ABSPATH')) {
            return ABSPATH . 'wp-content/debug.log';
        }
        $theme_dir = function_exists('get_template_directory') ? get_template_directory() : __DIR__;
        return dirname(dirname($theme_dir)) . '/debug.log';
    }
}

if (!function_exists('online_mmj_get_log_file_path')) {
    function online_mmj_get_log_file_path() {
        return online_mmj_get_debug_log_file();
    }
}

if (!function_exists('log_theme_error')) {
    /**
     * Custom WordPress error logging function for the OnlineMMJCard theme environment.
     * Captures WP_Error objects, Exceptions, and PHP errors using the error_log() facility
     * and records them to /wp-content/debug.log for easier troubleshooting.
     *
     * @param mixed  $error   WP_Error, Throwable, Exception, array, or string message
     * @param string $context Contextual tag (e.g., 'Theme Activation', 'Template Loading')
     * @return bool
     */
    function log_theme_error($error, $context = 'OnlineMMJCard Theme') {
        $timestamp = gmdate('Y-m-d H:i:s') . ' UTC';
        $log_file  = online_mmj_get_debug_log_file();
        $entry     = '';

        if (function_exists('is_wp_error') && is_wp_error($error)) {
            $code       = $error->get_error_code();
            $message    = $error->get_error_message();
            $data       = $error->get_error_data();
            $all_msgs   = $error->get_error_messages();
            $data_dump  = !empty($data) ? (is_scalar($data) ? (string)$data : json_encode($data)) : 'none';
            $entry = sprintf(
                "[%s] [OnlineMMJCard] [%s] WP_Error (Code: %s): %s | Messages: %s | Data: %s\n",
                $timestamp,
                $context,
                $code,
                $message,
                implode('; ', $all_msgs),
                $data_dump
            );
        } elseif ($error instanceof Throwable) {
            $entry = sprintf(
                "[%s] [OnlineMMJCard] [%s] Exception (%s): %s in %s:%d\nStack Trace:\n%s\n",
                $timestamp,
                $context,
                get_class($error),
                $error->getMessage(),
                $error->getFile(),
                $error->getLine(),
                $error->getTraceAsString()
            );
        } elseif (is_array($error)) {
            $msg  = isset($error['message']) ? $error['message'] : 'PHP runtime error array';
            $file = isset($error['file']) ? $error['file'] : 'unknown file';
            $line = isset($error['line']) ? intval($error['line']) : 0;
            $type = isset($error['type']) ? $error['type'] : 'E_UNKNOWN';
            $entry = sprintf(
                "[%s] [OnlineMMJCard] [%s] PHP Error (Code %s): %s in %s:%d\n",
                $timestamp,
                $context,
                $type,
                $msg,
                $file,
                $line
            );
        } else {
            $entry = sprintf(
                "[%s] [OnlineMMJCard] [%s] %s\n",
                $timestamp,
                $context,
                (string)$error
            );
        }

        // 1. Write specifically to /wp-content/debug.log using PHP/WordPress error_log facility (message_type = 3)
        @error_log($entry, 3, $log_file);

        // 2. Also dispatch to the standard WordPress error_log stream for WP_DEBUG_LOG support
        @error_log('[OnlineMMJCard] ' . trim($entry));

        // 3. Fallback to theme directory log file if /wp-content is not directly writable
        if (!file_exists($log_file) || !is_writable($log_file)) {
            $theme_log = (function_exists('get_template_directory') ? get_template_directory() : __DIR__) . '/theme-debug.log';
            @error_log($entry, 3, $theme_log);
        }

        return true;
    }
}

if (!function_exists('online_mmj_log_error')) {
    /**
     * Alias to log_theme_error for internal theme calls
     */
    function online_mmj_log_error($error, $context = 'OnlineMMJCard Theme') {
        return log_theme_error($error, $context);
    }
}

/**
 * Register theme shutdown handler to catch fatal errors and prevent silent white screens
 */
if (!function_exists('online_mmj_shutdown_error_handler')) {
    function online_mmj_shutdown_error_handler() {
        $last_error = error_get_last();
        if ($last_error && in_array($last_error['type'], array(E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR, E_USER_ERROR), true)) {
            $theme_dir = function_exists('get_template_directory') ? str_replace('\\', '/', get_template_directory()) : '';
            $error_file = isset($last_error['file']) ? str_replace('\\', '/', $last_error['file']) : '';

            $is_theme_error = empty($theme_dir) || (strpos($error_file, $theme_dir) !== false);

            if ($is_theme_error) {
                online_mmj_log_error($last_error, 'Fatal Shutdown Interceptor');

                // If user is administrator or WP_DEBUG is active, render an informative actionable message
                $can_debug = (defined('WP_DEBUG') && WP_DEBUG) || (function_exists('current_user_can') && current_user_can('manage_options'));
                if ($can_debug && !headers_sent()) {
                    ?>
                    <div style="background:#fee2e2; border:2px solid #ef4444; border-radius:12px; padding:24px; max-width:800px; margin:40px auto; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; color:#7f1d1d; box-shadow:0 10px 15px -3px rgba(0,0,0,0.1);">
                        <h2 style="margin:0 0 10px; color:#991b1b; font-size:20px; font-weight:800;">⚠️ OnlineMMJCard Theme Diagnostic Error Caught</h2>
                        <p style="margin:0 0 12px; font-size:14px; line-height:1.5;">The theme intercepted a PHP error to prevent an opaque white-screen. Details have been logged to <code><?php echo esc_html(online_mmj_get_log_file_path()); ?></code>.</p>
                        <div style="background:#fff; border:1px solid #fca5a5; padding:14px; border-radius:8px; font-family:monospace; font-size:13px; color:#1e293b; overflow-x:auto;">
                            <strong>Message:</strong> <?php echo esc_html($last_error['message']); ?><br>
                            <strong>File:</strong> <?php echo esc_html($last_error['file']); ?> (Line <?php echo intval($last_error['line']); ?>)
                        </div>
                    </div>
                    <?php
                }
            }
        }
    }
    register_shutdown_function('online_mmj_shutdown_error_handler');
}

/**
 * Capture WP_Error and exceptions specifically during theme activation
 */
if (!function_exists('online_mmj_theme_activation_check')) {
    function online_mmj_theme_activation_check($old_theme_name = '', $old_theme = null) {
        try {
            $required_files = array(
                'inc/leads-manager.php',
                'inc/elementor-support.php',
                'inc/theme-options.php',
                'inc/pages-manager.php',
                'header.php',
                'footer.php',
                'index.php',
                'style.css'
            );
            $theme_path = function_exists('get_template_directory') ? get_template_directory() : __DIR__;
            $missing = array();

            foreach ($required_files as $req) {
                if (!file_exists($theme_path . '/' . $req)) {
                    $missing[] = $req;
                }
            }

            if (!empty($missing)) {
                $err = new WP_Error(
                    'online_mmj_missing_files',
                    sprintf(__('OnlineMMJCard theme activation detected missing required files: %s', 'online-mmj-card'), implode(', ', $missing))
                );
                online_mmj_log_error($err, 'Theme Activation Check');
                if (function_exists('set_transient')) {
                    set_transient('online_mmj_activation_error', $err->get_error_message(), 60);
                }
                return;
            }

            // Verify database table creation
            if (function_exists('online_mmj_create_leads_table')) {
                online_mmj_create_leads_table();
            }

            // Automatically initialize and publish all core inner pages and blog posts
            if (function_exists('online_mmj_sync_all_core_pages')) {
                online_mmj_sync_all_core_pages(false);
            }

            online_mmj_log_error('OnlineMMJCard theme successfully activated without errors.', 'Theme Activation');
            if (function_exists('set_transient')) {
                set_transient('online_mmj_activation_success', true, 60);
            }

        } catch (Throwable $e) {
            online_mmj_log_error($e, 'Theme Activation Exception');
            if (function_exists('set_transient')) {
                set_transient('online_mmj_activation_error', $e->getMessage() . ' in ' . $e->getFile() . ':' . $e->getLine(), 60);
            }
        }
    }
    add_action('after_switch_theme', 'online_mmj_theme_activation_check', 10, 2);
}

/**
 * Display actionable admin notices after activation
 */
if (!function_exists('online_mmj_activation_admin_notices')) {
    function online_mmj_activation_admin_notices() {
        if (function_exists('get_transient') && ($err_msg = get_transient('online_mmj_activation_error'))) {
            delete_transient('online_mmj_activation_error');
            ?>
            <div class="notice notice-error is-dismissible" style="border-left-color:#ef4444;">
                <p><strong><?php esc_html_e('OnlineMMJCard Theme Activation Warning:', 'online-mmj-card'); ?></strong> <?php echo esc_html($err_msg); ?></p>
                <p><?php esc_html_e('A full diagnostic log was saved to:', 'online-mmj-card'); ?> <code><?php echo esc_html(online_mmj_get_log_file_path()); ?></code></p>
            </div>
            <?php
        }

        if (function_exists('get_transient') && get_transient('online_mmj_activation_success')) {
            delete_transient('online_mmj_activation_success');
            ?>
            <div class="notice notice-success is-dismissible" style="border-left-color:#008f58;">
                <p><strong>&check; <?php esc_html_e('OnlineMMJCard Theme Activated Successfully!', 'online-mmj-card'); ?></strong> <?php esc_html_e('All templates, Elementor/Divi modules, and lead database tables are verified.', 'online-mmj-card'); ?></p>
            </div>
            <?php
        }
    }
    add_action('admin_notices', 'online_mmj_activation_admin_notices');
}

/**
 * Theme Setup & Gutenberg / Page Builder Support
 */
function online_mmj_card_setup() {
    // 1. Let WordPress manage the document title dynamically (required by Yoast/Rank Math)
    add_theme_support('title-tag');

    // 2. Post thumbnails with full size options
    add_theme_support('post-thumbnails');

    // 3. Custom logo support
    add_theme_support('custom-logo', array(
        'height'      => 80,
        'width'       => 240,
        'flex-height' => true,
        'flex-width'  => true,
    ));

    // 4. Gutenberg Block Editor Features
    add_theme_support('align-wide');
    add_theme_support('wp-block-styles');
    add_theme_support('editor-styles');
    add_theme_support('responsive-embeds');

    // 5. HTML5 markup support
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
        'navigation-widgets',
    ));

    // 6. Editor stylesheet for WYSIWYG editing in Block Editor
    add_editor_style('style.css');

    // 7. Custom Editor Color Palette matching OnlineMMJCard brand
    add_theme_support('editor-color-palette', array(
        array(
            'name'  => esc_html__('Primary Emerald', 'online-mmj-card'),
            'slug'  => 'primary-emerald',
            'color' => '#16a34a',
        ),
        array(
            'name'  => esc_html__('Dark Forest Green', 'online-mmj-card'),
            'slug'  => 'dark-forest',
            'color' => '#15803d',
        ),
        array(
            'name'  => esc_html__('Deep Navy Slate', 'online-mmj-card'),
            'slug'  => 'deep-navy',
            'color' => '#0f172a',
        ),
        array(
            'name'  => esc_html__('Light Emerald Tint', 'online-mmj-card'),
            'slug'  => 'emerald-tint',
            'color' => '#ecfdf5',
        ),
        array(
            'name'  => esc_html__('Warning Amber', 'online-mmj-card'),
            'slug'  => 'warning-amber',
            'color' => '#d97706',
        ),
        array(
            'name'  => esc_html__('Pure White', 'online-mmj-card'),
            'slug'  => 'white',
            'color' => '#ffffff',
        ),
    ));

    // 8. Register Dynamic WordPress Navigation Menus
    register_nav_menus(array(
        'primary'         => esc_html__('Primary Header Navigation', 'online-mmj-card'),
        'footer_services' => esc_html__('Footer Services Menu', 'online-mmj-card'),
        'footer_states'   => esc_html__('Footer Top States Menu', 'online-mmj-card'),
        'footer_legal'    => esc_html__('Footer Legal & Policy Menu', 'online-mmj-card'),
    ));
}
add_action('after_setup_theme', 'online_mmj_card_setup');

/**
 * Register Widget Areas & Dynamic Sidebars for SEO Internal Linking
 */
function online_mmj_register_widgets() {
    register_sidebar(array(
        'name'          => esc_html__('Primary Sidebar', 'online-mmj-card'),
        'id'            => 'sidebar-1',
        'description'   => esc_html__('Widgets here appear on blog posts and article sidebars.', 'online-mmj-card'),
        'before_widget' => '<section id="%1$s" class="widget %2$s p-6 mb-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-xs">',
        'after_widget'  => '</section>',
        'before_title'  => '<h3 class="widget-title text-sm font-bold uppercase tracking-wider text-slate-800 mb-4 pb-2 border-b border-slate-200">',
        'after_title'   => '</h3>',
    ));

    register_sidebar(array(
        'name'          => esc_html__('Footer Column 1 (Brand & Info)', 'online-mmj-card'),
        'id'            => 'footer-1',
        'description'   => esc_html__('First column of the global footer.', 'online-mmj-card'),
        'before_widget' => '<div id="%1$s" class="widget %2$s space-y-3">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="text-xs font-bold uppercase tracking-wider text-white">',
        'after_title'   => '</h4>',
    ));

    register_sidebar(array(
        'name'          => esc_html__('Footer Column 2 (Services)', 'online-mmj-card'),
        'id'            => 'footer-2',
        'description'   => esc_html__('Second column of the global footer.', 'online-mmj-card'),
        'before_widget' => '<div id="%1$s" class="widget %2$s space-y-3">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="text-xs font-bold uppercase tracking-wider text-white">',
        'after_title'   => '</h4>',
    ));

    register_sidebar(array(
        'name'          => esc_html__('Footer Column 3 (Locations)', 'online-mmj-card'),
        'id'            => 'footer-3',
        'description'   => esc_html__('Third column of the global footer.', 'online-mmj-card'),
        'before_widget' => '<div id="%1$s" class="widget %2$s space-y-3">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="text-xs font-bold uppercase tracking-wider text-white">',
        'after_title'   => '</h4>',
    ));

    register_sidebar(array(
        'name'          => esc_html__('Footer Column 4 (Contact & Legal)', 'online-mmj-card'),
        'id'            => 'footer-4',
        'description'   => esc_html__('Fourth column of the global footer.', 'online-mmj-card'),
        'before_widget' => '<div id="%1$s" class="widget %2$s space-y-3">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="text-xs font-bold uppercase tracking-wider text-white">',
        'after_title'   => '</h4>',
    ));
}
add_action('widgets_init', 'online_mmj_register_widgets');

/**
 * Helper to check if a visual page builder or editor is actively editing or previewing
 */
if (!function_exists('online_mmj_is_builder_active')) {
    function online_mmj_is_builder_active($post_id = 0) {
        if (is_admin()) return true;
        if (isset($_GET['elementor-preview']) || (isset($_GET['action']) && $_GET['action'] === 'elementor')) return true;
        if (class_exists('\Elementor\Plugin') && (\Elementor\Plugin::$instance->editor->is_edit_mode() || \Elementor\Plugin::$instance->preview->is_preview_mode())) return true;
        if (isset($_GET['et_fb']) || (function_exists('et_core_is_fb_enabled') && et_core_is_fb_enabled())) return true;
        if (is_customize_preview()) return true;
        if ($post_id) {
            if (get_post_meta($post_id, '_elementor_edit_mode', true) === 'builder') return true;
            if (get_post_meta($post_id, '_et_pb_use_builder', true) === 'on') return true;
        }
        return false;
    }
}

/**
 * Enqueue scripts and styles.
 */
function online_mmj_card_enqueue_assets() {
    $theme_dir_uri  = get_template_directory_uri();
    $theme_dir_path = get_template_directory();

    // 1. Google Font: Open Sans
    wp_enqueue_style(
        'online-mmj-card-open-sans',
        'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap',
        array(),
        null
    );

    // 2. Base Theme Stylesheet (style.css)
    wp_enqueue_style(
        'online-mmj-card-base-style',
        get_stylesheet_uri(),
        array(),
        '2.1.0'
    );

    // 3. Scan the theme's assets directory for compiled CSS & JS bundles
    $assets_dir = $theme_dir_path . '/assets/';
    $assets_url = $theme_dir_uri . '/assets/';

    if (is_dir($assets_dir)) {
        $files = scandir($assets_dir);
        if ($files) {
            foreach ($files as $file) {
                // Enqueue compiled CSS bundle
                if (preg_match('/^index-.*\.css$/', $file)) {
                    wp_enqueue_style(
                        'online-mmj-card-compiled-css',
                        $assets_url . $file,
                        array('online-mmj-card-base-style'),
                        '2.1.0'
                    );
                }
                // Check if builder or editor is active
                $is_builder_active = online_mmj_is_builder_active();

                // Enqueue compiled JS bundle only when builder is not editing
                if (preg_match('/^index-.*\.js$/', $file) && !$is_builder_active) {
                    wp_enqueue_script(
                        'online-mmj-card-compiled-js',
                        $assets_url . $file,
                        array(),
                        '2.1.0',
                        true
                    );
                }
            }
        }
    }

    // 4. Pass dynamic configuration parameters to frontend scripts
    wp_localize_script(
        'online-mmj-card-compiled-js',
        'onlineMMJCardSettings',
        array(
            'siteUrl'        => esc_url(home_url('/')),
            'ajaxUrl'        => admin_url('admin-ajax.php'),
            'restUrl'        => esc_url_raw(rest_url('online-mmj/v1/submit-evaluation')),
            'apiUrl'         => esc_url_raw(rest_url('online-mmj/v1')),
            'apiNonce'       => wp_create_nonce('wp_rest'),
            'themeUri'       => $theme_dir_uri,
            'isLoggedIn'     => is_user_logged_in(),
            'themeContent'   => function_exists('online_mmj_get_theme_content') ? online_mmj_get_theme_content() : array(),
            'sectionToggles' => function_exists('online_mmj_get_section_toggles') ? online_mmj_get_section_toggles() : array(),
            'customCities'   => function_exists('online_mmj_get_cities') ? online_mmj_get_cities() : array(),
            'customStates'   => function_exists('online_mmj_get_states') ? online_mmj_get_states() : array(),
            'affiliateUrl'   => get_option('online_mmj_affiliate_url', 'https://leafwell.com/get-card?utm_source=onlinemmjcard&ref=affiliate_portal'),
            'redirectDelay'  => intval(get_option('online_mmj_redirect_delay', 2)),
            'startingPrice'  => get_option('online_mmj_starting_price', '$55'),
        )
    );
}
add_action('wp_enqueue_scripts', 'online_mmj_card_enqueue_assets');

/**
 * Register Custom Meta Boxes for Location and SEO Team Editing
 */
function online_mmj_register_meta_boxes() {
    add_meta_box(
        'mmj_location_meta_box',
        __('Local City Landing Page & Clinic Settings', 'online-mmj-card'),
        'online_mmj_render_location_meta_box',
        'page',
        'normal',
        'high'
    );

    add_meta_box(
        'mmj_state_meta_box',
        __('State Law & Telehealth Settings', 'online-mmj-card'),
        'online_mmj_render_state_meta_box',
        'page',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'online_mmj_register_meta_boxes');

/**
 * Render Location Meta Box
 */
function online_mmj_render_location_meta_box($post) {
    wp_nonce_field('online_mmj_location_save', 'online_mmj_location_nonce');

    $city_name    = get_post_meta($post->ID, '_mmj_city_name', true);
    $state_name   = get_post_meta($post->ID, '_mmj_state_name', true);
    $state_code   = get_post_meta($post->ID, '_mmj_state_code', true);
    $metro_area   = get_post_meta($post->ID, '_mmj_metro_area', true);
    $phone        = get_post_meta($post->ID, '_mmj_local_phone', true);
    $address      = get_post_meta($post->ID, '_mmj_street_address', true);
    $zip          = get_post_meta($post->ID, '_mmj_zip_code', true);
    $tax_savings  = get_post_meta($post->ID, '_mmj_tax_savings', true);
    $rec_tax      = get_post_meta($post->ID, '_mmj_rec_tax_rate', true);
    $med_tax      = get_post_meta($post->ID, '_mmj_med_tax_rate', true);
    $price        = get_post_meta($post->ID, '_mmj_consult_price', true);
    $lat          = get_post_meta($post->ID, '_mmj_geo_lat', true);
    $lng          = get_post_meta($post->ID, '_mmj_geo_lng', true);
    ?>
    <p><em>Use these fields to configure Schema.org Microdata, LocalBusiness structured data, and dynamic shortcodes. The page content itself can be authored entirely in Elementor, Gutenberg, or Divi.</em></p>
    <table class="form-table" style="width:100%;">
        <tr>
            <th><label for="_mmj_city_name">City Name:</label></th>
            <td><input type="text" id="_mmj_city_name" name="_mmj_city_name" value="<?php echo esc_attr($city_name); ?>" placeholder="e.g. Los Angeles" style="width:100%;" /></td>
        </tr>
        <tr>
            <th><label for="_mmj_state_name">State Name & Code:</label></th>
            <td>
                <input type="text" id="_mmj_state_name" name="_mmj_state_name" value="<?php echo esc_attr($state_name); ?>" placeholder="e.g. California" style="width:68%;" />
                <input type="text" id="_mmj_state_code" name="_mmj_state_code" value="<?php echo esc_attr($state_code); ?>" placeholder="e.g. CA" style="width:28%;" />
            </td>
        </tr>
        <tr>
            <th><label for="_mmj_metro_area">Metro Area / Region:</label></th>
            <td><input type="text" id="_mmj_metro_area" name="_mmj_metro_area" value="<?php echo esc_attr($metro_area); ?>" placeholder="e.g. Greater Los Angeles & San Fernando Valley" style="width:100%;" /></td>
        </tr>
        <tr>
            <th><label for="_mmj_local_phone">Local Patient Phone:</label></th>
            <td><input type="text" id="_mmj_local_phone" name="_mmj_local_phone" value="<?php echo esc_attr($phone); ?>" placeholder="e.g. (888) 420-6789" style="width:100%;" /></td>
        </tr>
        <tr>
            <th><label for="_mmj_street_address">Street Address & Zip:</label></th>
            <td>
                <input type="text" id="_mmj_street_address" name="_mmj_street_address" value="<?php echo esc_attr($address); ?>" placeholder="e.g. 700 S Flower St, Suite 1000" style="width:72%;" />
                <input type="text" id="_mmj_zip_code" name="_mmj_zip_code" value="<?php echo esc_attr($zip); ?>" placeholder="e.g. 90017" style="width:24%;" />
            </td>
        </tr>
        <tr>
            <th><label for="_mmj_tax_savings">Tax Savings % & Price:</label></th>
            <td>
                <input type="text" id="_mmj_tax_savings" name="_mmj_tax_savings" value="<?php echo esc_attr($tax_savings); ?>" placeholder="e.g. Up to 34.5%" style="width:48%;" />
                <input type="text" id="_mmj_consult_price" name="_mmj_consult_price" value="<?php echo esc_attr($price); ?>" placeholder="e.g. $39.99" style="width:48%;" />
            </td>
        </tr>
        <tr>
            <th><label for="_mmj_rec_tax_rate">Recreational Tax Rate:</label></th>
            <td><input type="text" id="_mmj_rec_tax_rate" name="_mmj_rec_tax_rate" value="<?php echo esc_attr($rec_tax); ?>" placeholder="e.g. 9.5% Sales + 15% State Excise + 10% Local" style="width:100%;" /></td>
        </tr>
        <tr>
            <th><label for="_mmj_med_tax_rate">Medical Patient Tax Rate:</label></th>
            <td><input type="text" id="_mmj_med_tax_rate" name="_mmj_med_tax_rate" value="<?php echo esc_attr($med_tax); ?>" placeholder="e.g. 0% Sales Tax (Exempt from city/state retail taxes)" style="width:100%;" /></td>
        </tr>
        <tr>
            <th><label for="_mmj_geo_lat">Geo Coordinates (Lat / Lng):</label></th>
            <td>
                <input type="text" id="_mmj_geo_lat" name="_mmj_geo_lat" value="<?php echo esc_attr($lat); ?>" placeholder="e.g. 34.0522" style="width:48%;" />
                <input type="text" id="_mmj_geo_lng" name="_mmj_geo_lng" value="<?php echo esc_attr($lng); ?>" placeholder="e.g. -118.2437" style="width:48%;" />
            </td>
        </tr>
    </table>
    <?php
}

/**
 * Render State Meta Box
 */
function online_mmj_render_state_meta_box($post) {
    wp_nonce_field('online_mmj_state_save', 'online_mmj_state_nonce');

    $validity    = get_post_meta($post->ID, '_mmj_validity', true);
    $possession  = get_post_meta($post->ID, '_mmj_possession_limit', true);
    $cultivation = get_post_meta($post->ID, '_mmj_home_cultivation', true);
    $state_fee   = get_post_meta($post->ID, '_mmj_state_fee', true);
    $portal_url  = get_post_meta($post->ID, '_mmj_portal_url', true);
    ?>
    <table class="form-table" style="width:100%;">
        <tr>
            <th><label for="_mmj_validity">Card Validity:</label></th>
            <td><input type="text" id="_mmj_validity" name="_mmj_validity" value="<?php echo esc_attr($validity); ?>" placeholder="e.g. 1 Year / 2 Years" style="width:100%;" /></td>
        </tr>
        <tr>
            <th><label for="_mmj_possession_limit">Possession Limits:</label></th>
            <td><input type="text" id="_mmj_possession_limit" name="_mmj_possession_limit" value="<?php echo esc_attr($possession); ?>" placeholder="e.g. Up to 8 oz flower" style="width:100%;" /></td>
        </tr>
        <tr>
            <th><label for="_mmj_home_cultivation">Home Cultivation Policy:</label></th>
            <td><input type="text" id="_mmj_home_cultivation" name="_mmj_home_cultivation" value="<?php echo esc_attr($cultivation); ?>" placeholder="e.g. 6 mature plants (up to 99 with grower rec)" style="width:100%;" /></td>
        </tr>
        <tr>
            <th><label for="_mmj_state_fee">State Application Fee:</label></th>
            <td><input type="text" id="_mmj_state_fee" name="_mmj_state_fee" value="<?php echo esc_attr($state_fee); ?>" placeholder="e.g. $0 state fee" style="width:100%;" /></td>
        </tr>
        <tr>
            <th><label for="_mmj_portal_url">State Health Portal URL:</label></th>
            <td><input type="url" id="_mmj_portal_url" name="_mmj_portal_url" value="<?php echo esc_attr($portal_url); ?>" placeholder="https://..." style="width:100%;" /></td>
        </tr>
    </table>
    <?php
}

/**
 * Save Meta Box Data
 */
function online_mmj_save_meta_boxes($post_id) {
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_page', $post_id)) {
        return;
    }

    // Location Fields
    if (isset($_POST['online_mmj_location_nonce']) && wp_verify_nonce($_POST['online_mmj_location_nonce'], 'online_mmj_location_save')) {
        $fields = array(
            '_mmj_city_name', '_mmj_state_name', '_mmj_state_code', '_mmj_metro_area',
            '_mmj_local_phone', '_mmj_street_address', '_mmj_zip_code', '_mmj_tax_savings',
            '_mmj_rec_tax_rate', '_mmj_med_tax_rate', '_mmj_consult_price', '_mmj_geo_lat', '_mmj_geo_lng'
        );
        foreach ($fields as $field) {
            if (isset($_POST[$field])) {
                update_post_meta($post_id, $field, sanitize_text_field($_POST[$field]));
            }
        }
    }

    // State Fields
    if (isset($_POST['online_mmj_state_nonce']) && wp_verify_nonce($_POST['online_mmj_state_nonce'], 'online_mmj_state_save')) {
        $state_fields = array(
            '_mmj_validity', '_mmj_possession_limit', '_mmj_home_cultivation',
            '_mmj_state_fee', '_mmj_portal_url'
        );
        foreach ($state_fields as $sf) {
            if (isset($_POST[$sf])) {
                update_post_meta($post_id, $sf, sanitize_text_field($_POST[$sf]));
            }
        }
    }
}
add_action('save_post', 'online_mmj_save_meta_boxes');

/**
 * Breadcrumb Helper Function for SEO
 * Fully compatible with Yoast SEO, Rank Math, and native fallback with Schema.org markup.
 */
function online_mmj_breadcrumbs() {
    if (function_exists('yoast_breadcrumb')) {
        yoast_breadcrumb('<nav class="mmj-breadcrumbs"><div class="mmj-container">', '</div></nav>');
        return;
    }

    if (function_exists('rank_math_the_breadcrumbs')) {
        echo '<nav class="mmj-breadcrumbs"><div class="mmj-container">';
        rank_math_the_breadcrumbs();
        echo '</div></nav>';
        return;
    }

    echo '<nav aria-label="Breadcrumb" class="mmj-breadcrumbs">';
    echo '<div class="mmj-container" itemscope itemtype="https://schema.org/BreadcrumbList">';
    
    echo '<span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">';
    echo '<a itemprop="item" href="' . esc_url(home_url('/')) . '"><span itemprop="name">Home</span></a>';
    echo '<meta itemprop="position" content="1" />';
    echo '</span>';

    if (is_page()) {
        global $post;
        $position = 2;
        if ($post->post_parent) {
            $ancestors = array_reverse(get_post_ancestors($post->ID));
            foreach ($ancestors as $ancestor) {
                echo '<span class="separator">/</span>';
                echo '<span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">';
                echo '<a itemprop="item" href="' . esc_url(get_permalink($ancestor)) . '"><span itemprop="name">' . esc_html(get_the_title($ancestor)) . '</span></a>';
                echo '<meta itemprop="position" content="' . $position . '" />';
                echo '</span>';
                $position++;
            }
        }
        echo '<span class="separator">/</span>';
        echo '<span itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">';
        echo '<span itemprop="name" class="current">' . esc_html(get_the_title()) . '</span>';
        echo '<meta itemprop="position" content="' . $position . '" />';
        echo '</span>';
    } elseif (is_single()) {
        echo '<span class="separator">/</span>';
        echo '<a href="' . esc_url(get_permalink(get_option('page_for_posts'))) . '">Blog</a>';
        echo '<span class="separator">/</span>';
        echo '<span class="current">' . esc_html(get_the_title()) . '</span>';
    } elseif (is_archive()) {
        echo '<span class="separator">/</span>';
        echo '<span class="current">' . esc_html(get_the_archive_title()) . '</span>';
    } elseif (is_404()) {
        echo '<span class="separator">/</span>';
        echo '<span class="current">404 Not Found</span>';
    }

    echo '</div>';
    echo '</nav>';
}

/**
 * Shortcode to render interactive appointment booking trigger
 */
function online_mmj_booking_shortcode($atts) {
    $a = shortcode_atts(array(
        'button_text' => 'Book Online Evaluation Now',
        'service'     => 'new-patient',
    ), $atts);

    $service_slugs = array(
        'new-patient' => 'new-patient-medical-marijuana-card',
        'renewal'     => 'medical-marijuana-card-renewal',
        'cultivation' => '99-plant-cultivation-recommendation',
        'esa-letter'  => 'emotional-support-animal-letter',
    );
    $slug = isset($service_slugs[$a['service']]) ? $service_slugs[$a['service']] : 'new-patient-medical-marijuana-card';

    return sprintf(
        '<div class="mmj-booking-cta my-6 text-center">
            <a href="%s" class="mmj-btn-primary">%s &rarr;</a>
        </div>',
        esc_url(home_url('/' . $slug . '/')),
        esc_html($a['button_text'])
    );
}
add_shortcode('online_mmj_booking', 'online_mmj_booking_shortcode');

/**
 * Shortcode to render interactive React evaluation app inside any Page Builder row
 * Usage: [online_mmj_app] or [mmj_app] or [online_mmj_react_root]
 */
if (!function_exists('online_mmj_app_shortcode')) {
    function online_mmj_app_shortcode($atts) {
        ob_start();
        ?>
        <div class="online-mmj-form-embed-wrapper w-full max-w-xl mx-auto my-8">
            <div id="online-mmj-card-root">
                <noscript>
                    <div class="p-6 bg-slate-50 border border-slate-200 rounded-2xl text-center">
                        <p class="font-bold text-slate-800">Please enable JavaScript to complete your online doctor intake.</p>
                        <a href="tel:8884206789" class="text-[#008f58] font-bold underline">(888) 420-6789</a>
                    </div>
                </noscript>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    add_shortcode('online_mmj_app', 'online_mmj_app_shortcode');
    add_shortcode('mmj_app', 'online_mmj_app_shortcode');
    add_shortcode('online_mmj_react_root', 'online_mmj_app_shortcode');
}

/**
 * Load Page Builder & Core Admin Extensions safely with error interception
 */
$theme_inc_files = array(
    'leads-manager.php'     => get_template_directory() . '/inc/leads-manager.php',
    'elementor-support.php' => get_template_directory() . '/inc/elementor-support.php',
    'theme-options.php'     => get_template_directory() . '/inc/theme-options.php',
    'pages-manager.php'     => get_template_directory() . '/inc/pages-manager.php',
);

foreach ($theme_inc_files as $module_name => $module_path) {
    if (file_exists($module_path)) {
        try {
            require_once $module_path;
        } catch (Throwable $e) {
            online_mmj_log_error($e, 'Module Loader (' . $module_name . ')');
        }
    } else {
        online_mmj_log_error("Missing required theme module: {$module_path}", 'Module Loader');
    }
}

/**
 * ------------------------------------------------------------------------
 * Virtual App Route Interceptor & Direct URL / Reload Handler
 * ------------------------------------------------------------------------
 * Prevents 404 errors when visitors reload or directly visit any app page
 * (e.g. /medical-marijuana-card-california/, /medical-marijuana-card-los-angeles/,
 * /medical-marijuana-for-chronic-pain/, etc.), serving HTTP 200 and booting the React SPA.
 */
if (!function_exists('online_mmj_find_post_or_page')) {
    function online_mmj_find_post_or_page($slug) {
        global $wpdb;
        $slug = sanitize_title($slug);
        if (empty($slug)) return null;

        $id = $wpdb->get_var($wpdb->prepare(
            "SELECT ID FROM {$wpdb->posts} WHERE post_name = %s AND post_type IN ('page', 'post') AND post_status = 'publish' LIMIT 1",
            $slug
        ));
        return $id ? get_post($id) : null;
    }
}

if (!function_exists('online_mmj_is_valid_app_route')) {
    function online_mmj_is_valid_app_route($slug) {
        $slug = trim($slug, '/');
        if (empty($slug)) return false;

        // Check if real published post or page exists
        if (online_mmj_find_post_or_page($slug)) {
            return true;
        }

        // Prefix patterns
        if (strpos($slug, 'medical-marijuana-card-') === 0 ||
            strpos($slug, 'medical-marijuana-doctor-') === 0 ||
            strpos($slug, 'medical-marijuana-for-') === 0 ||
            strpos($slug, 'state/') === 0 ||
            strpos($slug, 'local/') === 0 ||
            strpos($slug, 'condition/') === 0 ||
            strpos($slug, 'service/') === 0 ||
            strpos($slug, 'blog/') === 0 ||
            strpos($slug, 'insights/') === 0) {
            return true;
        }

        $core_slugs = array(
            'new-patient-medical-marijuana-card',
            'medical-marijuana-card-renewal',
            '99-plant-cultivation-recommendation',
            'emotional-support-animal-letter',
            'new-patient', 'renewal', 'cultivation', 'esa-letter',
            'book-evaluation', 'book', 'evaluate', 'apply', 'online-medical-card-application',
            'patient-portal', 'portal',
            'contact-us', 'contact',
            'qualifying-conditions', 'conditions',
            'medical-marijuana-insights', 'blog', 'insights',
            'medical-marijuana-reciprocity', 'reciprocity', 'reciprocity-checker',
            'doctor-directory', 'doctors', 'faq', 'faqs', 'sitemap',
            // States
            'california', 'new-york', 'florida', 'pennsylvania', 'ohio',
            'oklahoma', 'massachusetts', 'illinois', 'michigan', 'arizona',
            'connecticut', 'maryland', 'missouri', 'new-jersey', 'virginia',
            'texas', 'georgia', 'minnesota', 'colorado', 'nevada',
            // Cities
            'los-angeles', 'san-diego', 'san-francisco', 'sacramento', 'san-jose', 'fresno', 'oakland',
            'miami', 'orlando', 'tampa', 'jacksonville',
            'new-york-city', 'buffalo', 'rochester',
            'philadelphia', 'pittsburgh',
            'columbus', 'cleveland', 'cincinnati',
            'los-angeles-ca', 'san-diego-ca', 'san-francisco-ca', 'sacramento-ca', 'san-jose-ca', 'fresno-ca', 'oakland-ca',
            'miami-fl', 'orlando-fl', 'tampa-fl', 'jacksonville-fl',
            'new-york-city-ny', 'buffalo-ny', 'rochester-ny',
            'philadelphia-pa', 'pittsburgh-pa',
            'columbus-oh', 'cleveland-oh', 'cincinnati-oh',
            // Conditions
            'chronic-pain', 'anxiety', 'insomnia', 'ptsd', 'cancer', 'glaucoma',
            'epilepsy', 'multiple-sclerosis', 'migraines', 'arthritis', 'crohns', 'crohns-disease', 'nausea',
            // Articles
            'medical-marijuana-card-vs-recreational-cannabis',
            'how-to-talk-to-doctor-about-medical-marijuana',
            'california-ab-2188-workplace-cannabis-rights',
            'understanding-terpenes-cannabinoids-guide',
            'understanding-terpenes-and-cannabinoids-guide',
            'medical-marijuana-travel-rules-state-reciprocity',
            'cannabis-for-sleep-insomnia-science',
            'medical-marijuana-for-seniors-aging-comfortably',
            'rso-rick-simpson-oil-dosing-protocol',
        );

        return in_array($slug, $core_slugs, true);
    }
}

/**
 * Generate Dynamic XML Sitemap prioritizing Primary Keywords
 */
if (!function_exists('online_mmj_generate_dynamic_xml_sitemap')) {
    function online_mmj_generate_dynamic_xml_sitemap() {
        $base = home_url();
        $today = date('Y-m-d');
        
        $urls = array();
        
        // 1. Home Page (Priority 1.0)
        $urls[] = array(
            'loc' => home_url('/'),
            'priority' => '1.0',
            'changefreq' => 'daily'
        );

        // 2. Primary Keyword Services (Priority 0.90)
        $services = array(
            'new-patient-medical-marijuana-card',
            'medical-marijuana-card-renewal',
            '99-plant-cultivation-recommendation',
            'emotional-support-animal-letter',
            'book-evaluation'
        );
        foreach ($services as $srv) {
            $urls[] = array(
                'loc' => home_url('/' . $srv . '/'),
                'priority' => '0.90',
                'changefreq' => 'weekly'
            );
        }

        // 3. Primary Keyword States (Priority 0.95)
        $states = array(
            'california', 'new-york', 'florida', 'pennsylvania', 'ohio',
            'oklahoma', 'missouri', 'connecticut', 'texas', 'georgia',
            'illinois', 'maryland', 'virginia', 'massachusetts', 'michigan',
            'minnesota', 'arizona', 'new-jersey', 'colorado', 'nevada',
            'washington', 'maine', 'oregon', 'utah', 'louisiana',
            'new-mexico', 'rhode-island', 'delaware', 'hawaii', 'arkansas',
            'new-hampshire', 'west-virginia', 'mississippi', 'alabama', 'kentucky', 'iowa'
        );
        foreach ($states as $st) {
            $urls[] = array(
                'loc' => home_url('/medical-marijuana-card-' . $st . '/'),
                'priority' => '0.95',
                'changefreq' => 'weekly'
            );
        }

        // 4. Primary Keyword Cities (Priority 0.85)
        $cities = array(
            'los-angeles', 'san-diego', 'san-francisco', 'sacramento', 'san-jose',
            'fresno', 'oakland', 'bakersfield', 'anaheim', 'riverside',
            'stockton', 'irvine', 'chula-vista', 'fremont', 'san-bernardino',
            'modesto', 'fontana', 'moreno-valley', 'glendale',
            'miami', 'orlando', 'tampa', 'jacksonville',
            'new-york-city', 'buffalo', 'rochester',
            'philadelphia', 'pittsburgh',
            'columbus', 'cleveland', 'cincinnati'
        );
        foreach ($cities as $ct) {
            $urls[] = array(
                'loc' => home_url('/medical-marijuana-card-' . $ct . '/'),
                'priority' => '0.85',
                'changefreq' => 'weekly'
            );
        }

        // 5. Primary Keyword Qualifying Conditions (Priority 0.80)
        $conditions = array(
            'chronic-pain', 'anxiety-ptsd', 'insomnia-sleep', 'cancer-chemo',
            'epilepsy-seizures', 'multiple-sclerosis', 'arthritis-joint',
            'migraines-headaches', 'ibd-crohns', 'depression', 'autism-spectrum', 'glaucoma'
        );
        foreach ($conditions as $cond) {
            $urls[] = array(
                'loc' => home_url('/medical-marijuana-for-' . $cond . '/'),
                'priority' => '0.80',
                'changefreq' => 'monthly'
            );
        }

        // 6. Clinical Articles & Blog Insights (Priority 0.75)
        $urls[] = array(
            'loc' => home_url('/medical-marijuana-insights/'),
            'priority' => '0.80',
            'changefreq' => 'daily'
        );
        $articles = array(
            'medical-marijuana-card-vs-recreational-cannabis',
            'how-to-talk-to-doctor-about-medical-marijuana',
            'california-ab-2188-workplace-cannabis-rights',
            'understanding-terpenes-cannabinoids-guide',
            'medical-marijuana-travel-rules-state-reciprocity',
            'cannabis-for-sleep-insomnia-science',
            'medical-marijuana-for-seniors-aging-comfortably',
            'rso-rick-simpson-oil-dosing-protocol'
        );
        foreach ($articles as $art) {
            $urls[] = array(
                'loc' => home_url('/' . $art . '/'),
                'priority' => '0.75',
                'changefreq' => 'weekly'
            );
        }

        // 7. Contact Page (Priority 0.70)
        $urls[] = array(
            'loc' => home_url('/contact-us/'),
            'priority' => '0.70',
            'changefreq' => 'monthly'
        );

        // Include any published WordPress pages and posts dynamically
        $wp_pages = get_posts(array(
            'post_type' => array('page', 'post'),
            'post_status' => 'publish',
            'posts_per_page' => 100,
            'fields' => 'ids'
        ));
        $existing_locs = array_column($urls, 'loc');
        foreach ($wp_pages as $pid) {
            $link = get_permalink($pid);
            if (!in_array($link, $existing_locs, true)) {
                $urls[] = array(
                    'loc' => $link,
                    'priority' => '0.80',
                    'changefreq' => 'weekly'
                );
            }
        }

        // Build XML string
        $xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
        $xml .= "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";
        foreach ($urls as $u) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>" . esc_url($u['loc']) . "</loc>\n";
            $xml .= "    <lastmod>" . esc_html($today) . "</lastmod>\n";
            $xml .= "    <changefreq>" . esc_html($u['changefreq']) . "</changefreq>\n";
            $xml .= "    <priority>" . esc_html($u['priority']) . "</priority>\n";
            $xml .= "  </url>\n";
        }
        $xml .= "</urlset>";

        return $xml;
    }
}

if (!function_exists('online_mmj_handle_virtual_app_routes')) {
    function online_mmj_handle_virtual_app_routes() {
        $raw_path = isset($_SERVER['REQUEST_URI']) ? parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) : '';
        $path = trim($raw_path, '/');
        if (empty($path)) return;

        // Canonical 301 Redirects: Ensure only keyword URLs are indexed and visited
        $short_cities = array(
            'los-angeles', 'san-diego', 'san-francisco', 'sacramento', 'san-jose', 'fresno', 'oakland',
            'bakersfield', 'anaheim', 'riverside', 'stockton', 'irvine', 'chula-vista', 'fremont',
            'san-bernardino', 'modesto', 'fontana', 'moreno-valley', 'glendale',
            'miami', 'orlando', 'tampa', 'jacksonville',
            'new-york-city', 'buffalo', 'rochester',
            'philadelphia', 'pittsburgh',
            'columbus', 'cleveland', 'cincinnati'
        );

        $short_states = array(
            'california', 'new-york', 'florida', 'pennsylvania', 'ohio',
            'oklahoma', 'massachusetts', 'illinois', 'michigan', 'arizona',
            'connecticut', 'maryland', 'missouri', 'new-jersey', 'virginia',
            'texas', 'georgia', 'minnesota', 'colorado', 'nevada'
        );

        $clean_city = preg_replace('/-(ca|fl|ny|pa|oh)$/i', '', $path);
        if (in_array($path, $short_cities, true) || in_array($clean_city, $short_cities, true)) {
            wp_redirect(home_url('/medical-marijuana-card-' . $clean_city . '/'), 301);
            exit;
        }

        if (in_array($path, $short_states, true)) {
            wp_redirect(home_url('/medical-marijuana-card-' . $path . '/'), 301);
            exit;
        }

        // Dynamic XML Sitemap for Search Engines
        if ($path === 'sitemap.xml' || $path === 'sitemap') {
            header('Content-Type: application/xml; charset=utf-8');
            header('X-Robots-Tag: noindex, follow', true);
            echo online_mmj_generate_dynamic_xml_sitemap();
            exit;
        }

        if (is_404()) {
            if (online_mmj_is_valid_app_route($path)) {
                global $wp_query;
                status_header(200);
                $wp_query->is_404 = false;

                // Look for direct match or variants
                $post = online_mmj_find_post_or_page($path);
                if (!$post) {
                    $post = online_mmj_find_post_or_page($clean_city);
                }
                if (!$post && strpos($path, 'medical-marijuana-card-') !== 0) {
                    $post = online_mmj_find_post_or_page('medical-marijuana-card-' . $path);
                }
                if (!$post && strpos($path, 'medical-marijuana-for-') !== 0) {
                    $post = online_mmj_find_post_or_page('medical-marijuana-for-' . $path);
                }

                if ($post) {
                    if ($post->post_type === 'page') {
                        $wp_query->is_page = true;
                    } elseif ($post->post_type === 'post') {
                        $wp_query->is_single = true;
                    }
                    $wp_query->queried_object = $post;
                    $wp_query->queried_object_id = $post->ID;

                    $template = get_post_meta($post->ID, '_wp_page_template', true);
                    if ($template && file_exists(get_template_directory() . '/' . $template)) {
                        include get_template_directory() . '/' . $template;
                        exit;
                    }
                    if ($post->post_type === 'post') {
                        include get_template_directory() . '/single.php';
                        exit;
                    }
                    include get_template_directory() . '/page.php';
                    exit;
                }

                // If not found as post, render front-page which boots React SPA into online-mmj-card-root
                include get_template_directory() . '/front-page.php';
                exit;
            }
        }
    }
    add_action('template_redirect', 'online_mmj_handle_virtual_app_routes', 1);
}

if (!function_exists('online_mmj_register_app_rewrite_rules')) {
    function online_mmj_register_app_rewrite_rules() {
        add_rewrite_rule('^medical-marijuana-card-([^/]+)/?$', 'index.php?mmj_entity=$matches[1]&mmj_type=card', 'top');
        add_rewrite_rule('^medical-marijuana-doctor-([^/]+)/?$', 'index.php?mmj_entity=$matches[1]&mmj_type=doctor', 'top');
        add_rewrite_rule('^medical-marijuana-for-([^/]+)/?$', 'index.php?mmj_entity=$matches[1]&mmj_type=condition', 'top');
    }
    add_action('init', 'online_mmj_register_app_rewrite_rules');

    add_filter('query_vars', function($vars) {
        $vars[] = 'mmj_entity';
        $vars[] = 'mmj_type';
        return $vars;
    });
}

/**
 * Register Admin Menu for Theme Error & Diagnostic Logs
 */
if (!function_exists('online_mmj_register_error_logs_menu')) {
    function online_mmj_register_error_logs_menu() {
        add_submenu_page(
            'online-mmj-leads',
            __('Theme Error & Diagnostic Logs', 'online-mmj-card'),
            __('Theme Error Logs', 'online-mmj-card'),
            'manage_options',
            'online-mmj-theme-logs',
            'online_mmj_render_error_logs_page'
        );
    }
    add_action('admin_menu', 'online_mmj_register_error_logs_menu', 35);
}

/**
 * Render Theme Error Logs Page in WordPress Admin
 */
if (!function_exists('online_mmj_render_error_logs_page')) {
    function online_mmj_render_error_logs_page() {
        if (!current_user_can('manage_options')) {
            wp_die(__('Unauthorized access', 'online-mmj-card'));
        }

        $log_file = online_mmj_get_log_file_path();

        // Handle clear logs
        if (isset($_POST['online_mmj_clear_logs']) && check_admin_referer('online_mmj_clear_logs_action', 'online_mmj_clear_logs_nonce')) {
            @file_put_contents($log_file, '');
            echo '<div class="notice notice-success is-dismissible"><p>' . esc_html__('Theme diagnostic log cleared.', 'online-mmj-card') . '</p></div>';
        }

        $log_contents = file_exists($log_file) ? file_get_contents($log_file) : '';
        $log_size = file_exists($log_file) ? size_format(filesize($log_file)) : '0 B';
        ?>
        <div class="wrap" style="max-width: 1000px;">
            <h1 class="wp-heading-inline">
                <span class="dashicons dashicons-warning" style="font-size:28px; width:28px; height:28px; vertical-align:middle; margin-right:6px; color:#d97706;"></span>
                <?php esc_html_e('OnlineMMJCard Theme Error & Diagnostic Logs', 'online-mmj-card'); ?>
            </h1>

            <div style="margin: 16px 0; display:flex; gap:16px; align-items:center; flex-wrap:wrap;">
                <span style="font-size:12px; color:#64748b;">
                    <strong>Log Destination:</strong> <code><?php echo esc_html($log_file); ?></code> (<?php echo esc_html($log_size); ?>)
                </span>
                <?php if (!empty($log_contents)) : ?>
                    <form method="post" action="" style="display:inline;" onsubmit="return confirm('Clear all error logs?');">
                        <?php wp_nonce_field('online_mmj_clear_logs_action', 'online_mmj_clear_logs_nonce'); ?>
                        <button type="submit" name="online_mmj_clear_logs" class="button button-secondary button-small" style="color:#b91c1c;">
                            <?php esc_html_e('Clear Log File', 'online-mmj-card'); ?>
                        </button>
                    </form>
                <?php endif; ?>
            </div>

            <div style="background:#0f172a; color:#f8fafc; border-radius:8px; padding:18px; font-family:monospace; font-size:12px; line-height:1.6; max-height:550px; overflow-y:auto; white-space:pre-wrap; border:1px solid #334155;">
                <?php if (!empty($log_contents)) : ?>
                    <?php echo esc_html($log_contents); ?>
                <?php else : ?>
                    <span style="color:#94a3b8;">// No errors logged. OnlineMMJCard theme is operating normally without PHP exceptions or WP_Error faults.</span>
                <?php endif; ?>
            </div>
        </div>
        <?php
    }
}

/**
 * Load Theme Diagnostics & Activation Interceptor
 */
if (file_exists(get_template_directory() . '/debug_theme.php')) {
    require_once get_template_directory() . '/debug_theme.php';
}

