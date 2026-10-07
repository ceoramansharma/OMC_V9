<?php
/**
 * Front Page Template for Online MMJ Card
 *
 * Fully editable via WordPress Page Builders (Elementor, Gutenberg, Divi)
 * while seamlessly supporting the interactive telemedicine application.
 *
 * @package Online_MMJ_Card
 */

get_header();

// Determine if the page is actively being edited or authored in Elementor or Divi builder canvas
$post_id = get_the_ID();
$is_elementor_active = class_exists('\Elementor\Plugin') && (
    \Elementor\Plugin::$instance->editor->is_edit_mode() ||
    \Elementor\Plugin::$instance->preview->is_preview_mode() ||
    (get_post_meta($post_id, '_elementor_edit_mode', true) === 'builder')
);
$is_divi_active = (function_exists('et_core_is_fb_enabled') && et_core_is_fb_enabled()) ||
    (get_post_meta($post_id, '_et_pb_use_builder', true) === 'on');

if ($is_elementor_active || $is_divi_active) : ?>
  <!-- Render Page Builder & Gutenberg Authored Layout -->
  <main id="main-content" class="site-main front-page-builder-canvas" style="width:100%; min-height:60vh; padding:0; margin:0;">
    <?php
    while (have_posts()) :
        the_post();
        the_content();

        wp_link_pages(array(
            'before' => '<div class="page-links text-center py-4">' . esc_html__('Pages:', 'online-mmj-card'),
            'after'  => '</div>',
        ));
    endwhile;
    ?>
  </main>
<?php else : ?>
  <!-- Render Interactive Telehealth Engine -->
  <div id="online-mmj-card-root">
    <noscript>
      <div style="padding: 60px 20px; text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #008f58; font-size: 28px; margin-bottom: 12px;">Online MMJ Card Telehealth Platform</h1>
        <p style="color: #475569; font-size: 16px; line-height: 1.6;">
          Please enable JavaScript in your browser to access the online medical marijuana evaluation and recommendation system.
        </p>
        <div style="margin-top: 24px; padding: 16px; background: #f0fdf4; border-radius: 12px; border: 1px solid #bbf7d0;">
          <p style="margin: 0; font-size: 14px; color: #166534; font-weight: 700;">
            Patient Support Desk: <a href="tel:8884206789" style="color: #166534; text-decoration: underline;">(888) 420-6789</a>
          </p>
        </div>
      </div>
    </noscript>
  </div>
<?php endif;

get_footer();
