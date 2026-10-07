<?php
/**
 * Template Name: State Law & MMJ Guide
 * Template Post Type: page
 *
 * Fully editable via WordPress Page Builders (Elementor, Gutenberg, Divi) for on-page SEO optimization.
 * Removes hardcoded template HTML and implements the standard the_content() loop, allowing SEO managers
 * and content editors to author custom headings, state statutes, reciprocity tables, and layouts directly in the WP editor.
 *
 * @package Online_MMJ_Card
 */

get_header();

// Dynamic state metadata for Schema.org & SEO plugins
$state_name    = get_post_meta(get_the_ID(), '_mmj_state_name', true) ?: get_the_title();
$state_code    = get_post_meta(get_the_ID(), '_mmj_state_code', true) ?: 'CA';
$validity      = get_post_meta(get_the_ID(), '_mmj_validity', true) ?: '1 Year';
$state_fee     = get_post_meta(get_the_ID(), '_mmj_state_fee', true) ?: '$0 state fee';
$portal_url    = get_post_meta(get_the_ID(), '_mmj_portal_url', true);
$price         = get_post_meta(get_the_ID(), '_mmj_consult_price', true) ?: '$39.99';
?>

<!-- Schema.org GovernmentService & MedicalWebPage Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "<?php echo esc_js($state_name . ' Medical Marijuana Card & Telehealth Evaluation Guide'); ?>",
  "url": "<?php echo esc_url(get_permalink()); ?>",
  "description": "<?php echo esc_js('Official state legal guide for obtaining a medical marijuana card in ' . $state_name . ' (' . $state_code . ') via 100% online doctor evaluation.'); ?>",
  "about": {
    "@type": "MedicalCondition",
    "name": "Qualifying Conditions for Medical Cannabis"
  }
}
</script>

<?php
$is_builder = function_exists('online_mmj_is_builder_active') ? online_mmj_is_builder_active(get_the_ID()) : false;

if ($is_builder) : ?>
  <!-- Breadcrumb Navigation for SEO Hierarchy in Page Builder -->
  <div class="bg-slate-50 border-b border-slate-200 py-3 text-xs text-slate-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <?php online_mmj_breadcrumbs(); ?>
    </div>
  </div>

  <main id="main-content" class="site-main state-guide-template">
    <?php
    while (have_posts()) :
      the_post();
      $content = get_the_content();
      ?>
      <article id="post-<?php the_ID(); ?>" <?php post_class('entry-state-page'); ?>>
        <div class="entry-content">
          <?php 
          if (!empty(trim($content))) {
              the_content();
          } elseif (function_exists('online_mmj_get_state_fallback_html')) {
              echo online_mmj_get_state_fallback_html(get_the_ID());
          } else {
              the_content();
          }
          ?>
        </div>

        <?php
        wp_link_pages(array(
          'before' => '<div class="page-links text-center py-4 font-bold">' . esc_html__('Pages:', 'online-mmj-card'),
          'after'  => '</div>',
        ));
        ?>
      </article>
      <?php
    endwhile;
    ?>
  </main>
<?php else : ?>
  <!-- Interactive Telehealth Mount for Full Responsive React SPA -->
  <div id="online-mmj-card-root">
    <noscript>
      <div class="bg-slate-50 border-b border-slate-200 py-3 text-xs text-slate-500">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <?php online_mmj_breadcrumbs(); ?>
        </div>
      </div>
      <main id="main-content" class="site-main state-guide-template">
        <?php
        while (have_posts()) :
          the_post();
          $content = get_the_content();
          ?>
          <article id="post-<?php the_ID(); ?>" <?php post_class('entry-state-page'); ?>>
            <div class="entry-content">
              <?php 
              if (!empty(trim($content))) {
                  the_content();
              } elseif (function_exists('online_mmj_get_state_fallback_html')) {
                  echo online_mmj_get_state_fallback_html(get_the_ID());
              } else {
                  the_content();
              }
              ?>
            </div>
          </article>
          <?php
        endwhile;
        ?>
      </main>
    </noscript>
  </div>
<?php endif; ?>

<?php
get_footer();
