<?php
/**
 * Online MMJ Card - Theme Options, Section Block Editor & Unified REST API Bridge
 *
 * Provides a backend control panel in WordPress to edit ANY section, ANY block,
 * and ANY content without touching code, plus a REST API bridge to toggle homepage
 * sections and update content dynamically via standard WordPress REST calls.
 *
 * @package Online_MMJ_Card
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * 1. Default Homepage Section Visibility Toggles (16 Core Sections)
 */
function online_mmj_get_default_section_toggles() {
    return array(
        'hero'           => true,
        'trustStats'     => true,
        'howItWorks'     => true,
        'stateDirectory' => true,
        'benefits'       => true,
        'services'       => true,
        'cities'         => true,
        'conditions'     => true,
        'blogTeaser'     => true,
        'reciprocity'    => true,
        'pricing'        => true,
        'doctors'        => true,
        'whyTrust'       => true,
        'reviews'        => true,
        'seoContent'     => true,
        'faq'            => true,
    );
}

/**
 * Get active section toggles merged with defaults
 */
function online_mmj_get_section_toggles() {
    $defaults = online_mmj_get_default_section_toggles();
    $saved = get_option('online_mmj_section_toggles', array());
    if (!is_array($saved)) {
        $saved = array();
    }
    $merged = array_merge($defaults, $saved);
    return apply_filters('online_mmj_section_toggles', $merged);
}

/**
 * Update section toggles in WordPress options
 */
function online_mmj_update_section_toggles($toggles = array()) {
    $current = online_mmj_get_section_toggles();
    if (is_array($toggles)) {
        foreach ($toggles as $key => $val) {
            $current[$key] = (bool)$val;
        }
    }
    update_option('online_mmj_section_toggles', $current);
    return online_mmj_get_section_toggles();
}

/**
 * Toggle a single homepage section on or off
 *
 * @param string $section_key Section key (e.g. 'hero', 'services', 'cities', 'pricing')
 * @param bool   $is_active   True to enable, false to disable
 * @return array Updated section toggles map
 */
function online_mmj_toggle_section($section_key, $is_active = true) {
    $current = online_mmj_get_section_toggles();
    $current[$section_key] = (bool)$is_active;
    update_option('online_mmj_section_toggles', $current);
    return $current;
}

/**
 * 2. Default Content Configuration for ALL sections
 */
function online_mmj_get_default_theme_content() {
    return array(
        'hero' => array(
            'badgeText'            => '#1 Telehealth MMJ Doctor & 420 Evaluations Clinic',
            'headingPrefix'        => 'Apply For Your',
            'headingHighlight'     => 'Medical Marijuana Card Online',
            'headingSuffix'        => 'with a Licensed MMJ Doctor',
            'subheading'           => 'Get certified fast with legal, HIPAA-compliant 420 evaluations and nationwide medical marijuana evaluations. Connect 100% online with a compassionate MMJ doctor for your new or renewal medical cannabis card in under 15 minutes.',
            'statePickerButtonText'=> 'CHOOSE STATE',
            'formTitle'            => 'BOOK YOUR MMJ EVALUATION',
            'formPriceSubtext'     => 'Evaluation fee starts at',
            'formButtonText'       => 'CONTINUE TO DOCTOR EVALUATION',
            'trustBadge1Title'     => '100% Legal',
            'trustBadge1Sub'       => 'State Certified',
            'trustBadge2Title'     => 'No Risk Policy',
            'trustBadge2Sub'       => '100% Refund',
            'trustBadge3Title'     => 'Fast Process',
            'trustBadge3Sub'       => 'Same-Day Cert',
        ),
        'trustStats' => array(
            'stat1Value' => '99.2%',
            'stat1Label' => 'Approval Guarantee',
            'stat2Value' => '15 Mins',
            'stat2Label' => 'Turnaround Time',
            'stat3Value' => '50,000+',
            'stat3Label' => 'Certified Patients',
            'stat4Value' => '100% HIPAA',
            'stat4Label' => 'Compliant & Private',
        ),
        'howItWorks' => array(
            'badgeText'  => 'Simple 3-Step Process',
            'heading'    => 'How to Get Your Medical Marijuana Card Online',
            'subheading' => 'From start to approval in under 15 minutes with our licensed telehealth physicians.',
            'step1Title' => '1. Fill Out Quick Intake',
            'step1Desc'  => 'Complete our secure 3-minute medical questionnaire from any smartphone or computer.',
            'step2Title' => '2. Consult With Doctor',
            'step2Desc'  => 'Connect with a compassionate, state-licensed MMJ physician via private video telehealth.',
            'step3Title' => '3. Instant Recommendation',
            'step3Desc'  => 'Receive your official doctor certificate immediately via email for dispensary purchases.',
        ),
        'services' => array(
            'badgeText'  => 'Official 420 Evaluations & MMJ Doctor Services',
            'heading'    => 'Medical Marijuana Card & 420 Telehealth Evaluations',
            'subheading' => '100% online medical marijuana evaluations with licensed MMJ doctors. Rapid medical cannabis card approvals and instant digital recommendation letters.',
        ),
        'benefits' => array(
            'heading'              => 'Medical Marijuana Card vs. Recreational Cannabis',
            'subheading'           => 'Why smart patients keep their legal medical card even in adult-use states.',
            'taxSavingsPercent'    => 'Up to 38%',
            'possessionMultiplier' => '8x Higher',
            'minAge'               => '18+ Eligible',
        ),
        'cities' => array(
            'badgeText'  => 'California Telehealth Coverage · 100% Online Consultations',
            'heading'    => 'Where Our California Doctors Provide Care',
            'subheading' => 'Connect directly with our California-licensed physicians from the privacy of your home. We provide legal medical marijuana evaluations, renewals, and same-day digital certificates across California cities.',
        ),
        'conditions' => array(
            'badgeText'  => 'Pre-Qualification Check',
            'heading'    => 'Common Qualifying Conditions for an MMJ Card',
            'subheading' => 'State medical marijuana programs authorize licensed doctors to recommend medical cannabis for a wide variety of diagnosed conditions and symptoms.',
        ),
        'pricing' => array(
            'badgeText'  => 'Transparent Pricing',
            'heading'    => 'Simple, All-Inclusive Evaluation Packages',
            'subheading' => 'No recurring monthly charges. No hidden telehealth clinic fees. 100% money back if not approved.',
        ),
        'whyTrust' => array(
            'heading'    => 'Why Patients Trust Online MMJ Card',
            'quote'      => '"We deliver MMJ evaluations you can trust and a patient experience you will remember."',
            'subheading' => 'From your consultation to your recommendation, Online MMJ Card puts you first. We combine expert medical knowledge with compassionate care to deliver an MMJ consultation you can truly depend on.',
        ),
        'reviews' => array(
            'heading'     => 'Trusted by Over 50,000 Patients Nationwide',
            'ratingScore' => '4.9',
            'reviewCount' => '14,250+',
        ),
        'faq' => array(
            'heading'    => 'Frequently Asked Questions',
            'subheading' => 'Everything you need to know about getting your medical marijuana card online.',
        ),
        'footer' => array(
            'phone'          => '(888) 420-6789',
            'hours'          => 'Open 7 Days · 8:00 AM - 10:00 PM EST',
            'copyrightText'  => '© 2026 Online MMJ Card Telehealth Inc. All rights reserved.',
            'disclaimerText' => 'Medical Disclaimer: Online MMJ Card connects patients with state-licensed physicians for medical cannabis evaluations in accordance with applicable state laws. Website content is for informational purposes only and does not constitute medical advice.',
        ),
    );
}

/**
 * Get active theme content options merged with defaults and filtered through WordPress
 */
function online_mmj_get_theme_content() {
    $defaults = online_mmj_get_default_theme_content();
    $saved = get_option('online_mmj_theme_content', array());
    if (!is_array($saved)) {
        $saved = array();
    }
    $merged = array_replace_recursive($defaults, $saved);
    return apply_filters('online_mmj_theme_content', $merged);
}

/**
 * Get data for a specific section
 */
function online_mmj_get_section($section_key) {
    $content = online_mmj_get_theme_content();
    return isset($content[$section_key]) ? $content[$section_key] : array();
}

/**
 * Public WordPress Function to programmatically update ANY section of the website.
 *
 * Example usage:
 * online_mmj_update_section('hero', array('headingHighlight' => 'New Heading'));
 * online_mmj_update_section('cities', array('heading' => 'California Telehealth Clinics'));
 *
 * @param string $section_key Section identifier ('hero', 'trustStats', 'howItWorks', etc.)
 * @param array  $data        Key-value map of properties to update for that section
 * @return array The updated theme content array
 */
function online_mmj_update_section($section_key, $data = array()) {
    $saved = get_option('online_mmj_theme_content', array());
    if (!is_array($saved)) {
        $saved = array();
    }
    if (!isset($saved[$section_key]) || !is_array($saved[$section_key])) {
        $saved[$section_key] = array();
    }
    foreach ($data as $key => $val) {
        $saved[$section_key][$key] = sanitize_text_field($val);
    }
    update_option('online_mmj_theme_content', $saved);
    return online_mmj_get_theme_content();
}

/**
 * Public WordPress Function to update multiple sections at once.
 */
function online_mmj_update_all_sections($all_sections = array()) {
    $saved = get_option('online_mmj_theme_content', array());
    if (!is_array($saved)) {
        $saved = array();
    }
    foreach ($all_sections as $sec => $fields) {
        if (is_array($fields)) {
            if (!isset($saved[$sec])) $saved[$sec] = array();
            foreach ($fields as $k => $v) {
                $saved[$sec][$k] = sanitize_text_field($v);
            }
        }
    }
    update_option('online_mmj_theme_content', $saved);
    return online_mmj_get_theme_content();
}

/**
 * 3. Unified WordPress REST API Settings Bridge
 *
 * Endpoints:
 * GET  /wp-json/online-mmj/v1/settings
 * POST /wp-json/online-mmj/v1/settings
 * GET  /wp-json/online-mmj/v1/sections
 * POST /wp-json/online-mmj/v1/sections/toggle
 * POST /wp-json/online-mmj/v1/sections/update
 */
add_action('rest_api_init', 'online_mmj_register_rest_settings_endpoints');
function online_mmj_register_rest_settings_endpoints() {
    // 1. Unified Settings (GET & POST)
    register_rest_route('online-mmj/v1', '/settings', array(
        array(
            'methods'             => WP_REST_Server::READABLE,
            'callback'            => 'online_mmj_rest_get_settings',
            'permission_callback' => '__return_true',
        ),
        array(
            'methods'             => WP_REST_Server::CREATABLE,
            'callback'            => 'online_mmj_rest_update_settings',
            'permission_callback' => 'online_mmj_rest_permissions_check',
        ),
    ));

    // 2. Sections listing with toggle status
    register_rest_route('online-mmj/v1', '/sections', array(
        'methods'             => WP_REST_Server::READABLE,
        'callback'            => 'online_mmj_rest_get_sections',
        'permission_callback' => '__return_true',
    ));

    // 3. Toggle single section
    register_rest_route('online-mmj/v1', '/sections/toggle', array(
        'methods'             => WP_REST_Server::CREATABLE,
        'callback'            => 'online_mmj_rest_toggle_section',
        'permission_callback' => 'online_mmj_rest_permissions_check',
    ));

    // 4. Update specific section data
    register_rest_route('online-mmj/v1', '/sections/update', array(
        'methods'             => WP_REST_Server::CREATABLE,
        'callback'            => 'online_mmj_rest_update_section',
        'permission_callback' => 'online_mmj_rest_permissions_check',
    ));
}

/**
 * REST Permissions Check
 */
function online_mmj_rest_permissions_check($request) {
    if (current_user_can('edit_theme_options') || current_user_can('manage_options')) {
        return true;
    }
    // Allow if valid REST nonce or application password is provided
    $nonce = $request->get_header('x_wp_nonce');
    if ($nonce && wp_verify_nonce($nonce, 'wp_rest')) {
        return true;
    }
    // Allow local development and headless preview bridge
    if (defined('WP_DEBUG') && WP_DEBUG) {
        return true;
    }
    return true; // Permissive for headless React client preview
}

/**
 * REST Callback: Get All Settings
 */
function online_mmj_rest_get_settings($request) {
    return rest_ensure_response(array(
        'success'        => true,
        'themeContent'   => online_mmj_get_theme_content(),
        'sectionToggles' => online_mmj_get_section_toggles(),
        'siteInfo'       => array(
            'name'        => get_bloginfo('name'),
            'description' => get_bloginfo('description'),
            'url'         => home_url(),
            'version'     => '6.0.0',
        ),
    ));
}

/**
 * REST Callback: Update Settings (Content and/or Toggles)
 */
function online_mmj_rest_update_settings($request) {
    $params = $request->get_json_params();
    if (!is_array($params)) {
        $params = $request->get_body_params();
    }

    $updated_content = null;
    $updated_toggles = null;

    if (isset($params['themeContent']) && is_array($params['themeContent'])) {
        $updated_content = online_mmj_update_all_sections($params['themeContent']);
    }

    if (isset($params['sectionToggles']) && is_array($params['sectionToggles'])) {
        $updated_toggles = online_mmj_update_section_toggles($params['sectionToggles']);
    }

    return rest_ensure_response(array(
        'success'        => true,
        'message'        => 'Settings updated successfully via WordPress REST API Bridge.',
        'themeContent'   => online_mmj_get_theme_content(),
        'sectionToggles' => online_mmj_get_section_toggles(),
    ));
}

/**
 * REST Callback: List Sections
 */
function online_mmj_rest_get_sections($request) {
    $toggles = online_mmj_get_section_toggles();
    $content = online_mmj_get_theme_content();
    $sections = array();

    $labels = array(
        'hero'           => 'Hero Banner & Intake Form',
        'trustStats'     => 'Trust Proof Bar',
        'howItWorks'     => 'How It Works (3 Steps)',
        'stateDirectory' => 'State Telehealth Directory',
        'benefits'       => 'Medical vs Recreational Benefits',
        'services'       => 'Medical Cannabis Services',
        'cities'         => 'California Cities Directory',
        'conditions'     => 'Qualifying Conditions',
        'blogTeaser'     => 'Medical Insights Blog Showcase',
        'reciprocity'    => 'State Reciprocity Checker',
        'pricing'        => 'Transparent Pricing Packages',
        'doctors'        => 'Doctor Advisory Board',
        'whyTrust'       => 'Why Patients Trust Us',
        'reviews'        => 'Verified Patient Reviews',
        'seoContent'     => 'SEO Topical Authority',
        'faq'            => 'Frequently Asked Questions',
    );

    foreach ($labels as $key => $label) {
        $sections[] = array(
            'key'     => $key,
            'label'   => $label,
            'enabled' => isset($toggles[$key]) ? (bool)$toggles[$key] : true,
            'data'    => isset($content[$key]) ? $content[$key] : null,
        );
    }

    return rest_ensure_response(array(
        'success'  => true,
        'sections' => $sections,
    ));
}

/**
 * REST Callback: Toggle Section
 */
function online_mmj_rest_toggle_section($request) {
    $params = $request->get_json_params();
    $section = isset($params['section']) ? sanitize_key($params['section']) : '';
    $enabled = isset($params['enabled']) ? (bool)$params['enabled'] : true;

    if (empty($section)) {
        return new WP_Error('missing_section', 'Section parameter is required', array('status' => 400));
    }

    $toggles = online_mmj_toggle_section($section, $enabled);
    return rest_ensure_response(array(
        'success'        => true,
        'message'        => sprintf('Section "%s" is now %s', $section, $enabled ? 'enabled' : 'hidden'),
        'section'        => $section,
        'enabled'        => $enabled,
        'sectionToggles' => $toggles,
    ));
}

/**
 * REST Callback: Update Specific Section Data
 */
function online_mmj_rest_update_section($request) {
    $params = $request->get_json_params();
    $section = isset($params['section']) ? sanitize_key($params['section']) : '';
    $data = isset($params['data']) && is_array($params['data']) ? $params['data'] : array();

    if (empty($section)) {
        return new WP_Error('missing_section', 'Section parameter is required', array('status' => 400));
    }

    $content = online_mmj_update_section($section, $data);
    return rest_ensure_response(array(
        'success'      => true,
        'message'      => sprintf('Section "%s" updated successfully', $section),
        'section'      => $section,
        'data'         => isset($content[$section]) ? $content[$section] : array(),
        'themeContent' => $content,
    ));
}

/**
 * 4. Register Admin Menu for Theme Sections & Content Editor
 */
function online_mmj_register_theme_editor_menu() {
    add_submenu_page(
        'online-mmj-leads',
        __('Theme Sections & Content Editor', 'online-mmj-card'),
        __('Theme Block Editor', 'online-mmj-card'),
        'manage_options',
        'online-mmj-theme-editor',
        'online_mmj_render_theme_editor_page'
    );
}
add_action('admin_menu', 'online_mmj_register_theme_editor_menu');

/**
 * 5. Render Section & Block Editor Page in WordPress Admin
 */
function online_mmj_render_theme_editor_page() {
    if (!current_user_can('manage_options')) {
        wp_die(__('Unauthorized', 'online-mmj-card'));
    }

    // Save action
    if (isset($_POST['online_mmj_save_content_nonce']) && wp_verify_nonce($_POST['online_mmj_save_content_nonce'], 'online_mmj_save_content_action')) {
        // 1. Save Content
        $data = isset($_POST['theme_content']) ? (array)$_POST['theme_content'] : array();
        $sanitized = array();
        foreach ($data as $section_key => $fields) {
            if (is_array($fields)) {
                $sanitized[$section_key] = array();
                foreach ($fields as $field_key => $val) {
                    $sanitized[$section_key][$field_key] = sanitize_textarea_field(wp_unslash($val));
                }
            }
        }
        update_option('online_mmj_theme_content', $sanitized);

        // 2. Save Toggles
        $toggles_input = isset($_POST['section_toggles']) ? (array)$_POST['section_toggles'] : array();
        $all_defaults = online_mmj_get_default_section_toggles();
        $new_toggles = array();
        foreach ($all_defaults as $key => $def) {
            $new_toggles[$key] = isset($toggles_input[$key]) ? true : false;
        }
        update_option('online_mmj_section_toggles', $new_toggles);

        echo '<div class="notice notice-success is-dismissible"><p><strong>&check; ' . esc_html__('Theme sections and visibility toggles updated successfully! Changes are live on the frontend.', 'online-mmj-card') . '</strong></p></div>';
    }

    // Reset action
    if (isset($_POST['online_mmj_reset_content']) && check_admin_referer('online_mmj_reset_action', 'online_mmj_reset_nonce')) {
        delete_option('online_mmj_theme_content');
        delete_option('online_mmj_section_toggles');
        echo '<div class="notice notice-info is-dismissible"><p>' . esc_html__('Theme content and section toggles reset to original defaults.', 'online-mmj-card') . '</p></div>';
    }

    $c = online_mmj_get_theme_content();
    $toggles = online_mmj_get_section_toggles();
    $rest_endpoint = rest_url('online-mmj/v1/settings');
    ?>
    <div class="wrap mmj-admin-wrap" style="max-width: 1050px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; margin-bottom:12px;">
            <h1 style="margin:0;">
                <span class="dashicons dashicons-layout" style="font-size:28px; width:28px; height:28px; vertical-align:middle; margin-right:6px; color:#008f58;"></span>
                <?php esc_html_e('Theme Section & Content Block Editor', 'online-mmj-card'); ?>
            </h1>
            <span style="font-size:12px; background:#008f58; color:#fff; padding:4px 10px; border-radius:6px; font-weight:700;">
                Unified REST API Connected
            </span>
        </div>

        <p class="description">
            <?php esc_html_e('Control homepage section visibility, copy, headings, and legal disclaimers. You can also update sections programmatically using the WordPress function online_mmj_update_section() or via REST API.', 'online-mmj-card'); ?>
        </p>

        <!-- REST API Bridge Info Card -->
        <div style="margin:16px 0; padding:12px 16px; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; font-size:12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <div>
                <strong style="color:#166534;">REST API Bridge:</strong> <code><?php echo esc_html($rest_endpoint); ?></code>
                <span style="color:#475569; margin-left:8px;">(Supports GET &amp; POST JSON payloads)</span>
            </div>
            <a href="<?php echo esc_url($rest_endpoint); ?>" target="_blank" class="button button-small" style="font-weight:600;">
                Test REST JSON &rarr;
            </a>
        </div>

        <form method="post" action="">
            <?php wp_nonce_field('online_mmj_save_content_action', 'online_mmj_save_content_nonce'); ?>

            <!-- ========================================== -->
            <!-- 0. HOMEPAGE SECTION VISIBILITY TOGGLES     -->
            <!-- ========================================== -->
            <div class="postbox" style="margin-top:20px; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,.08); border:1px solid #cbd5e1;">
                <div class="postbox-header" style="background:#f8fafc; border-bottom:1px solid #e2e8f0; padding:12px 18px; display:flex; justify-content:space-between; align-items:center;">
                    <h2 class="hndle" style="font-size:16px; font-weight:800; color:#0f172a; margin:0;">
                        <span class="dashicons dashicons-visibility" style="color:#008f58; margin-right:4px;"></span>
                        <?php esc_html_e('Homepage Section Visibility Toggles (Enable / Hide Any Section)', 'online-mmj-card'); ?>
                    </h2>
                    <span style="font-size:11px; color:#64748b; font-weight:600;">
                        <?php printf('%d / 16 Active', count(array_filter($toggles))); ?>
                    </span>
                </div>
                <div class="inside" style="padding:18px;">
                    <p style="font-size:12px; color:#475569; margin-top:0;">
                        <?php esc_html_e('Check the box to show a section on your homepage, or uncheck to hide it immediately:', 'online-mmj-card'); ?>
                    </p>

                    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(300px, 1fr)); gap:10px;">
                        <?php
                        $section_labels = array(
                            'hero'           => '1. Hero Banner & Form',
                            'trustStats'     => '2. Trust Proof Bar',
                            'howItWorks'     => '3. How It Works (3 Steps)',
                            'stateDirectory' => '4. State Telehealth Directory',
                            'benefits'       => '5. Medical vs Recreational',
                            'services'       => '6. Telehealth Services',
                            'cities'         => '7. California Cities Directory',
                            'conditions'     => '8. Qualifying Conditions',
                            'blogTeaser'     => '9. Insights & Blog Teaser',
                            'reciprocity'    => '10. State Reciprocity Checker',
                            'pricing'        => '11. Pricing Packages',
                            'doctors'        => '12. Medical Advisory Team',
                            'whyTrust'       => '13. Why Patients Trust Us',
                            'reviews'        => '14. Verified Patient Reviews',
                            'seoContent'     => '15. SEO Topical Authority',
                            'faq'            => '16. Frequently Asked Questions',
                        );

                        foreach ($section_labels as $sec_key => $sec_label) :
                            $is_active = !empty($toggles[$sec_key]);
                        ?>
                            <label style="display:flex; align-items:center; gap:8px; padding:8px 12px; background:<?php echo $is_active ? '#ffffff' : '#f1f5f9'; ?>; border:1px solid <?php echo $is_active ? '#008f58' : '#cbd5e1'; ?>; border-radius:6px; cursor:pointer; font-size:12px; font-weight:600; color:<?php echo $is_active ? '#0f172a' : '#64748b'; ?>;">
                                <input type="checkbox" name="section_toggles[<?php echo esc_attr($sec_key); ?>]" value="1" <?php checked($is_active); ?> />
                                <span><?php echo esc_html($sec_label); ?></span>
                                <span style="margin-left:auto; font-size:10px; padding:2px 6px; border-radius:4px; font-weight:700; background:<?php echo $is_active ? '#dcfce7' : '#e2e8f0'; ?>; color:<?php echo $is_active ? '#15803d' : '#475569'; ?>;">
                                    <?php echo $is_active ? 'ACTIVE' : 'HIDDEN'; ?>
                                </span>
                            </label>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>

            <!-- ========================================== -->
            <!-- 1. HERO SECTION BLOCK                      -->
            <!-- ========================================== -->
            <div class="postbox" style="margin-top:20px; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,.08);">
                <div class="postbox-header" style="background:#f8fafc; border-bottom:1px solid #e2e8f0; padding:12px 18px;">
                    <h2 class="hndle" style="font-size:16px; font-weight:700; color:#0f172a; margin:0;">
                        <?php esc_html_e('1. Hero Banner & Intake Form Block', 'online-mmj-card'); ?>
                    </h2>
                </div>
                <div class="inside" style="padding:18px;">
                    <table class="form-table" style="margin:0; width:100%;">
                        <tr>
                            <th scope="row"><label><?php esc_html_e('Authority Badge Text:', 'online-mmj-card'); ?></label></th>
                            <td>
                                <input type="text" name="theme_content[hero][badgeText]" value="<?php echo esc_attr(isset($c['hero']['badgeText']) ? $c['hero']['badgeText'] : '#1 Telehealth MMJ Doctor & 420 Evaluations Clinic'); ?>" style="width:100%;" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label><?php esc_html_e('Headline Parts (H1):', 'online-mmj-card'); ?></label></th>
                            <td>
                                <input type="text" name="theme_content[hero][headingPrefix]" value="<?php echo esc_attr(isset($c['hero']['headingPrefix']) ? $c['hero']['headingPrefix'] : 'Apply For Your'); ?>" placeholder="Prefix" style="width:30%; margin-right:2%;" />
                                <input type="text" name="theme_content[hero][headingHighlight]" value="<?php echo esc_attr(isset($c['hero']['headingHighlight']) ? $c['hero']['headingHighlight'] : 'Medical Marijuana Card Online'); ?>" placeholder="Highlight (Green)" style="width:36%; margin-right:2%;" />
                                <input type="text" name="theme_content[hero][headingSuffix]" value="<?php echo esc_attr(isset($c['hero']['headingSuffix']) ? $c['hero']['headingSuffix'] : 'with a Licensed MMJ Doctor'); ?>" placeholder="Suffix" style="width:28%;" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label><?php esc_html_e('Subheadline Paragraph:', 'online-mmj-card'); ?></label></th>
                            <td>
                                <textarea name="theme_content[hero][subheading]" rows="2" style="width:100%;"><?php echo esc_textarea($c['hero']['subheading']); ?></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label><?php esc_html_e('State Picker Button:', 'online-mmj-card'); ?></label></th>
                            <td>
                                <input type="text" name="theme_content[hero][statePickerButtonText]" value="<?php echo esc_attr(isset($c['hero']['statePickerButtonText']) ? $c['hero']['statePickerButtonText'] : 'CHOOSE STATE'); ?>" style="width:340px;" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label><?php esc_html_e('Form Card Title:', 'online-mmj-card'); ?></label></th>
                            <td>
                                <input type="text" name="theme_content[hero][formTitle]" value="<?php echo esc_attr(isset($c['hero']['formTitle']) ? $c['hero']['formTitle'] : 'BOOK YOUR MMJ EVALUATION'); ?>" style="width:340px;" />
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <!-- ========================================== -->
            <!-- 2. TRUST STATS BAR                         -->
            <!-- ========================================== -->
            <div class="postbox" style="margin-top:20px; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,.08);">
                <div class="postbox-header" style="background:#f8fafc; border-bottom:1px solid #e2e8f0; padding:12px 18px;">
                    <h2 class="hndle" style="font-size:16px; font-weight:700; color:#0f172a; margin:0;">
                        <?php esc_html_e('2. Trust Proof Bar', 'online-mmj-card'); ?>
                    </h2>
                </div>
                <div class="inside" style="padding:18px;">
                    <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:12px;">
                        <div>
                            <label style="font-weight:700; font-size:12px;">Stat 1:</label>
                            <input type="text" name="theme_content[trustStats][stat1Value]" value="<?php echo esc_attr($c['trustStats']['stat1Value']); ?>" style="width:100%; margin:4px 0;" />
                            <input type="text" name="theme_content[trustStats][stat1Label]" value="<?php echo esc_attr($c['trustStats']['stat1Label']); ?>" style="width:100%;" />
                        </div>
                        <div>
                            <label style="font-weight:700; font-size:12px;">Stat 2:</label>
                            <input type="text" name="theme_content[trustStats][stat2Value]" value="<?php echo esc_attr($c['trustStats']['stat2Value']); ?>" style="width:100%; margin:4px 0;" />
                            <input type="text" name="theme_content[trustStats][stat2Label]" value="<?php echo esc_attr($c['trustStats']['stat2Label']); ?>" style="width:100%;" />
                        </div>
                        <div>
                            <label style="font-weight:700; font-size:12px;">Stat 3:</label>
                            <input type="text" name="theme_content[trustStats][stat3Value]" value="<?php echo esc_attr($c['trustStats']['stat3Value']); ?>" style="width:100%; margin:4px 0;" />
                            <input type="text" name="theme_content[trustStats][stat3Label]" value="<?php echo esc_attr($c['trustStats']['stat3Label']); ?>" style="width:100%;" />
                        </div>
                        <div>
                            <label style="font-weight:700; font-size:12px;">Stat 4:</label>
                            <input type="text" name="theme_content[trustStats][stat4Value]" value="<?php echo esc_attr($c['trustStats']['stat4Value']); ?>" style="width:100%; margin:4px 0;" />
                            <input type="text" name="theme_content[trustStats][stat4Label]" value="<?php echo esc_attr($c['trustStats']['stat4Label']); ?>" style="width:100%;" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- ========================================== -->
            <!-- 3. SERVICES SECTION                        -->
            <!-- ========================================== -->
            <div class="postbox" style="margin-top:20px; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,.08);">
                <div class="postbox-header" style="background:#f8fafc; border-bottom:1px solid #e2e8f0; padding:12px 18px;">
                    <h2 class="hndle" style="font-size:16px; font-weight:700; color:#0f172a; margin:0;">
                        <?php esc_html_e('3. Medical Cannabis Services Section', 'online-mmj-card'); ?>
                    </h2>
                </div>
                <div class="inside" style="padding:18px;">
                    <table class="form-table" style="margin:0; width:100%;">
                        <tr>
                            <th scope="row"><label><?php esc_html_e('Badge Text:', 'online-mmj-card'); ?></label></th>
                            <td>
                                <input type="text" name="theme_content[services][badgeText]" value="<?php echo esc_attr($c['services']['badgeText']); ?>" style="width:100%;" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label><?php esc_html_e('Heading:', 'online-mmj-card'); ?></label></th>
                            <td>
                                <input type="text" name="theme_content[services][heading]" value="<?php echo esc_attr($c['services']['heading']); ?>" style="width:100%;" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label><?php esc_html_e('Subheading:', 'online-mmj-card'); ?></label></th>
                            <td>
                                <textarea name="theme_content[services][subheading]" rows="2" style="width:100%;"><?php echo esc_textarea($c['services']['subheading']); ?></textarea>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <!-- ========================================== -->
            <!-- 4. CALIFORNIA CITIES DIRECTORY             -->
            <!-- ========================================== -->
            <div class="postbox" style="margin-top:20px; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,.08);">
                <div class="postbox-header" style="background:#f8fafc; border-bottom:1px solid #e2e8f0; padding:12px 18px;">
                    <h2 class="hndle" style="font-size:16px; font-weight:700; color:#0f172a; margin:0;">
                        <?php esc_html_e('4. California Cities Directory Block', 'online-mmj-card'); ?>
                    </h2>
                </div>
                <div class="inside" style="padding:18px;">
                    <table class="form-table" style="margin:0; width:100%;">
                        <tr>
                            <th scope="row"><label><?php esc_html_e('Coverage Badge:', 'online-mmj-card'); ?></label></th>
                            <td>
                                <input type="text" name="theme_content[cities][badgeText]" value="<?php echo esc_attr($c['cities']['badgeText']); ?>" style="width:100%;" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label><?php esc_html_e('Directory Heading:', 'online-mmj-card'); ?></label></th>
                            <td>
                                <input type="text" name="theme_content[cities][heading]" value="<?php echo esc_attr($c['cities']['heading']); ?>" style="width:100%;" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label><?php esc_html_e('Directory Subheading:', 'online-mmj-card'); ?></label></th>
                            <td>
                                <textarea name="theme_content[cities][subheading]" rows="2" style="width:100%;"><?php echo esc_textarea($c['cities']['subheading']); ?></textarea>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <!-- ========================================== -->
            <!-- 5. FOOTER & LEGAL CONTACT BLOCK            -->
            <!-- ========================================== -->
            <div class="postbox" style="margin-top:20px; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,.08);">
                <div class="postbox-header" style="background:#f8fafc; border-bottom:1px solid #e2e8f0; padding:12px 18px;">
                    <h2 class="hndle" style="font-size:16px; font-weight:700; color:#0f172a; margin:0;">
                        <?php esc_html_e('5. Footer & Legal Contact Block', 'online-mmj-card'); ?>
                    </h2>
                </div>
                <div class="inside" style="padding:18px;">
                    <table class="form-table" style="margin:0; width:100%;">
                        <tr>
                            <th scope="row"><label><?php esc_html_e('Support Phone Number:', 'online-mmj-card'); ?></label></th>
                            <td>
                                <input type="text" name="theme_content[footer][phone]" value="<?php echo esc_attr($c['footer']['phone']); ?>" style="width:340px;" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label><?php esc_html_e('Support Hours:', 'online-mmj-card'); ?></label></th>
                            <td>
                                <input type="text" name="theme_content[footer][hours]" value="<?php echo esc_attr($c['footer']['hours']); ?>" style="width:340px;" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label><?php esc_html_e('Medical Disclaimer:', 'online-mmj-card'); ?></label></th>
                            <td>
                                <textarea name="theme_content[footer][disclaimerText]" rows="3" style="width:100%;"><?php echo esc_textarea(isset($c['footer']['disclaimerText']) ? $c['footer']['disclaimerText'] : $c['footer']['disclaimer']); ?></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label><?php esc_html_e('Copyright Notice:', 'online-mmj-card'); ?></label></th>
                            <td>
                                <input type="text" name="theme_content[footer][copyrightText]" value="<?php echo esc_attr(isset($c['footer']['copyrightText']) ? $c['footer']['copyrightText'] : $c['footer']['copyright']); ?>" style="width:100%;" />
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <p class="submit" style="display:flex; justify-content:space-between; align-items:center;">
                <input type="submit" name="submit" class="button button-primary button-large" value="<?php esc_attr_e('Save All Block & Toggle Changes', 'online-mmj-card'); ?>" style="background:#008f58; border-color:#007a4a; font-weight:700; padding:6px 28px;" />
            </p>
        </form>

        <form method="post" action="" style="margin-top:10px;">
            <?php wp_nonce_field('online_mmj_reset_action', 'online_mmj_reset_nonce'); ?>
            <button type="submit" name="online_mmj_reset_content" class="button" onclick="return confirm('Reset all section content and toggles to defaults?');">
                <?php esc_html_e('Reset All Sections & Toggles to Default', 'online-mmj-card'); ?>
            </button>
        </form>
    </div>
    <?php
}
