<?php
/**
 * Plugin Name: Online MMJ Card - Telehealth Application
 * Plugin URI: https://onlinemmjcard.com/
 * Description: Embeds the complete Online MMJ Card medical marijuana telemedicine evaluation platform, state directory, and intake application using the [online_mmj_card] shortcode.
 * Version: 1.0.0
 * Author: Online MMJ Card Team
 * Author URI: https://onlinemmjcard.com/
 * License: GPL-2.0+
 * Text Domain: online-mmj-card
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

/**
 * Register and enqueue the compiled React assets
 */
function online_mmj_card_enqueue_scripts() {
    $plugin_dir_path = plugin_dir_path(__FILE__);
    $plugin_dir_url  = plugin_dir_url(__FILE__);

    // Look for generated assets in dist/assets
    $assets_dir = $plugin_dir_path . 'dist/assets/';
    $assets_url = $plugin_dir_url . 'dist/assets/';

    if (is_dir($assets_dir)) {
        $files = scandir($assets_dir);
        $js_file  = '';
        $css_file = '';

        foreach ($files as $file) {
            if (pathinfo($file, PATHINFO_EXTENSION) === 'js' && strpos($file, 'index') !== false) {
                $js_file = $file;
            }
            if (pathinfo($file, PATHINFO_EXTENSION) === 'css' && strpos($file, 'index') !== false) {
                $css_file = $file;
            }
        }

        // Register CSS
        if ($css_file) {
            wp_register_style(
                'online-mmj-card-styles',
                $assets_url . $css_file,
                array(),
                '1.0.0'
            );
        }

        // Register JS
        if ($js_file) {
            wp_register_script(
                'online-mmj-card-app',
                $assets_url . $js_file,
                array(),
                '1.0.0',
                true
            );

            // Add type="module" attribute for modern Vite bundle
            add_filter('script_loader_tag', function($tag, $handle, $src) {
                if ('online-mmj-card-app' === $handle) {
                    return '<script type="module" src="' . esc_url($src) . '"></script>';
                }
                return $tag;
            }, 10, 3);
        }
    }
}
add_action('wp_enqueue_scripts', 'online_mmj_card_enqueue_scripts');

/**
 * Shortcode to render the Online MMJ Card application: [online_mmj_card]
 */
function online_mmj_card_shortcode($atts) {
    $atts = shortcode_atts(
        array(
            'fullwidth' => 'true',
        ),
        $atts,
        'online_mmj_card'
    );

    // Enqueue the registered assets only when shortcode is present on the page
    wp_enqueue_style('online-mmj-card-styles');
    wp_enqueue_script('online-mmj-card-app');

    // Google Fonts for clean typography
    echo '<link rel="preconnect" href="https://fonts.googleapis.com">';
    echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';
    echo '<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">';

    // Output mount element
    $wrapper_style = ($atts['fullwidth'] === 'true') ? 'style="width: 100%; min-height: 100vh; margin: 0; padding: 0;"' : '';

    return '<div id="online-mmj-card-root" ' . $wrapper_style . '></div>';
}
add_shortcode('online_mmj_card', 'online_mmj_card_shortcode');
