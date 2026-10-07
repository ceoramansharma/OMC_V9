<?php
/**
 * Template Name: Qualifying Condition Guide
 * Template Post Type: page
 *
 * Dedicated landing page template for qualifying medical marijuana conditions.
 * Fully authorable with Page Builders (Elementor, Gutenberg, Divi) using the standard the_content() loop.
 *
 * @package Online_MMJ_Card
 */

get_header();

$condition_title = get_the_title();
$category        = get_post_meta(get_the_ID(), '_mmj_condition_category', true) ?: 'Chronic Illness';
?>

<!-- Schema.org MedicalCondition Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MedicalCondition",
  "name": "<?php echo esc_js($condition_title); ?>",
  "possibleTreatment": [
    {
      "@type": "MedicalTherapy",
      "name": "Medical Cannabis Recommendation"
    }
  ]
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

  <main id="main-content" class="site-main condition-guide-template py-8">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <?php
      while (have_posts()) :
        the_post();
        $content = get_the_content();
        ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class('entry-condition-page'); ?>>
          <div class="entry-content">
            <?php 
            if (!empty(trim($content))) {
                the_content();
            } elseif (function_exists('online_mmj_get_condition_fallback_html')) {
                echo online_mmj_get_condition_fallback_html(get_the_ID());
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
    </div>
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
      <main id="main-content" class="site-main condition-guide-template py-8">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <?php
          while (have_posts()) :
            the_post();
            $content = get_the_content();
            ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class('entry-condition-page'); ?>>
              <div class="entry-content">
                <?php 
                if (!empty(trim($content))) {
                    the_content();
                } elseif (function_exists('online_mmj_get_condition_fallback_html')) {
                    echo online_mmj_get_condition_fallback_html(get_the_ID());
                } else {
                    the_content();
                }
                ?>
              </div>
            </article>
            <?php
          endwhile;
          ?>
        </div>
      </main>
    </noscript>
  </div>
<?php endif; ?>

<?php
get_footer();
