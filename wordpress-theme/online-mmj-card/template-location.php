<?php
/**
 * Template Name: Local City Landing Page
 * Template Post Type: page
 *
 * Fully editable via WordPress Page Builders (Elementor, Gutenberg, Divi) for on-page SEO optimization.
 * Removes hardcoded template HTML and implements the standard the_content() loop, allowing SEO managers
 * and content editors to author custom headings, copy, FAQ schema, and layouts directly in the WP editor.
 *
 * @package Online_MMJ_Card
 */

get_header();

// Retrieve dynamic custom fields for Schema.org SEO structured data
$city_name     = get_post_meta(get_the_ID(), '_mmj_city_name', true) ?: get_the_title();
$state_name    = get_post_meta(get_the_ID(), '_mmj_state_name', true) ?: 'California';
$state_code    = get_post_meta(get_the_ID(), '_mmj_state_code', true) ?: 'CA';
$metro_area    = get_post_meta(get_the_ID(), '_mmj_metro_area', true) ?: $city_name . ' Metro & Surrounding Areas';
$local_phone   = get_post_meta(get_the_ID(), '_mmj_local_phone', true) ?: '(888) 420-6789';
$street        = get_post_meta(get_the_ID(), '_mmj_street_address', true) ?: '700 S Flower St, Suite 1000';
$zip           = get_post_meta(get_the_ID(), '_mmj_zip_code', true) ?: '90017';
$price         = get_post_meta(get_the_ID(), '_mmj_consult_price', true) ?: '$39.99';
$lat           = get_post_meta(get_the_ID(), '_mmj_geo_lat', true) ?: '34.0522';
$lng           = get_post_meta(get_the_ID(), '_mmj_geo_lng', true) ?: '-118.2437';
?>

<!-- Schema.org MedicalClinic Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "MedicalClinic"],
  "name": "<?php echo esc_js('Online MMJ Card - ' . $city_name . ' Telehealth Service'); ?>",
  "url": "<?php echo esc_url(get_permalink()); ?>",
  "telephone": "<?php echo esc_js($local_phone); ?>",
  "priceRange": "$$",
  "medicalSpecialty": ["Cannabis Medicine", "Primary Care"],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "<?php echo esc_js($street); ?>",
    "addressLocality": "<?php echo esc_js($city_name); ?>",
    "addressRegion": "<?php echo esc_js($state_code); ?>",
    "postalCode": "<?php echo esc_js($zip); ?>",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": <?php echo (float)$lat; ?>,
    "longitude": <?php echo (float)$lng; ?>
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

  <main id="main-content" class="site-main local-city-template">
    <?php
    while (have_posts()) :
      the_post();
      $content = get_the_content();
      ?>
      <article id="post-<?php the_ID(); ?>" <?php post_class('entry-location-page'); ?>>
        <div class="entry-content">
          <?php 
          if (!empty(trim($content))) {
              the_content();
          } elseif (function_exists('online_mmj_get_city_fallback_html')) {
              echo online_mmj_get_city_fallback_html(get_the_ID());
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
      <main id="main-content" class="site-main local-city-template">
        <?php
        while (have_posts()) :
          the_post();
          $content = get_the_content();
          ?>
          <article id="post-<?php the_ID(); ?>" <?php post_class('entry-location-page'); ?>>
            <div class="entry-content">
              <?php 
              if (!empty(trim($content))) {
                  the_content();
              } elseif (function_exists('online_mmj_get_city_fallback_html')) {
                  echo online_mmj_get_city_fallback_html(get_the_ID());
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
