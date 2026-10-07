<?php
/**
 * The header for Online MMJ Card theme
 *
 * Fully optimized for SEO plugins (Rank Math, Yoast SEO, AIOSEO) with standard wp_head() hook,
 * dynamic WordPress navigation menus (wp_nav_menu), and Page Builder compatibility.
 *
 * @package Online_MMJ_Card
 */
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="profile" href="https://gmpg.org/xfn/11">

  <?php
  // Check if an SEO plugin (Yoast SEO, Rank Math, All In One SEO) is active
  $has_seo_plugin = defined('WPSEO_VERSION') || class_exists('RankMath') || defined('AIOSEO_VERSION') || defined('SEOPRESS_VERSION');

  // If no SEO plugin is installed, provide a high-performing fallback for meta description and canonical
  if (!$has_seo_plugin) {
      $canonical_url = esc_url(get_permalink());
      if (is_front_page()) {
          $meta_desc = 'Get your legal medical marijuana card online in 15 mins with board-certified MMJ doctors. Fast 420 evaluations, medical cannabis card renewals & 99% approval guaranteed.';
      } elseif (is_page_template('template-state.php')) {
          $st_name = get_post_meta(get_the_ID(), '_mmj_state_name', true) ?: get_the_title();
          $meta_desc = 'Get your official ' . esc_attr($st_name) . ' medical marijuana card online starting at $39. Same-day approval with licensed cannabis doctors or 100% money back.';
      } elseif (is_page_template('template-location.php')) {
          $c_name = get_post_meta(get_the_ID(), '_mmj_city_name', true) ?: get_the_title();
          $s_code = get_post_meta(get_the_ID(), '_mmj_state_code', true) ?: '';
          $meta_desc = 'Get your official medical marijuana card in ' . esc_attr($c_name) . ($s_code ? ', ' . esc_attr($s_code) : '') . ' online in 15 minutes. Certified local telehealth doctors, 99% approval guarantee.';
      } elseif (is_page_template('template-service.php')) {
          $meta_desc = 'Book your ' . esc_attr(get_the_title()) . ' online with licensed telehealth MMJ physicians. 15-minute video evaluation, instant digital recommendation or 100% refund.';
      } elseif (is_single()) {
          $meta_desc = wp_strip_all_tags(get_the_excerpt()) ?: 'Physician-reviewed medical marijuana research, clinical dosing guides, and legal patient rights.';
      } else {
          $meta_desc = 'Board-certified medical marijuana telehealth evaluations, 420 recommendations, and renewals in 15 minutes with 99% approval guarantee.';
      }
      ?>
      <meta name="description" content="<?php echo esc_attr($meta_desc); ?>">
      <link rel="canonical" href="<?php echo $canonical_url; ?>">
      <meta property="og:description" content="<?php echo esc_attr($meta_desc); ?>">
      <meta property="og:url" content="<?php echo $canonical_url; ?>">
      <meta name="twitter:description" content="<?php echo esc_attr($meta_desc); ?>">
      <?php
  }
  ?>

  <?php
  // Dynamic Schema.org JSON-LD for Local & Medical SEO
  $is_location_page = is_page_template('template-location.php');
  $city_name        = get_post_meta(get_the_ID(), '_mmj_city_name', true) ?: 'National';
  $state_name       = get_post_meta(get_the_ID(), '_mmj_state_name', true) ?: 'United States';
  $state_code       = get_post_meta(get_the_ID(), '_mmj_state_code', true) ?: 'US';
  $phone            = get_post_meta(get_the_ID(), '_mmj_local_phone', true) ?: '+1-888-420-6789';
  $street           = get_post_meta(get_the_ID(), '_mmj_street_address', true) ?: '700 S Flower St, Suite 1000';
  $zip              = get_post_meta(get_the_ID(), '_mmj_zip_code', true) ?: '90017';
  $lat              = get_post_meta(get_the_ID(), '_mmj_geo_lat', true) ?: '34.0522';
  $lng              = get_post_meta(get_the_ID(), '_mmj_geo_lng', true) ?: '-118.2437';
  ?>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "MedicalClinic", "LocalBusiness"],
    "name": "<?php echo esc_js($is_location_page ? 'Online MMJ Card - ' . $city_name . ' Telehealth Clinic' : 'Online MMJ Card Telehealth Clinic'); ?>",
    "alternateName": "Online MMJ Card",
    "legalName": "Online MMJ Card Health Services Inc.",
    "url": "<?php echo esc_url(home_url('/')); ?>",
    "telephone": "<?php echo esc_js($phone); ?>",
    "priceRange": "$$",
    "medicalSpecialty": [
      "Cannabis Medicine",
      "Alternative Medicine",
      "Primary Care"
    ],
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
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "22:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "14250"
    }
  }
  </script>

  <?php
  /**
   * Critical SEO Plugin Hook:
   * wp_head() is positioned right before the closing </head> tag so that SEO plugins
   * (Rank Math, Yoast SEO, AIOSEO) can output canonicals, OpenGraph, Twitter Cards,
   * schema markup, and scripts with maximum priority and standard compliance.
   */
  wp_head();
  ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- Slim Progress Bar Scroll Indicator -->
<div id="mmj-scroll-progress" class="online-mmj-static-progress w-full h-[3.5px] bg-[#0f5132] overflow-hidden sticky top-0 z-50 pointer-events-none" role="progressbar" aria-label="Page reading progress">
  <div id="mmj-scroll-bar" class="h-full bg-gradient-to-r from-emerald-300 via-lime-300 to-white transition-[width] duration-150 ease-out shadow-[0_0_8px_rgba(110,231,183,0.9)]" style="width: 0%;"></div>
</div>

<script>
// Lightweight vanilla JS reading scroll indicator for all standard pages & Page Builder canvases
(function() {
  function updateScrollProgress() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var bar = document.getElementById('mmj-scroll-bar');
    if (bar) {
      if (height > 0) {
        var scrolled = (winScroll / height) * 100;
        bar.style.width = Math.min(100, Math.max(0, scrolled)) + '%';
      } else {
        bar.style.width = '0%';
      }
    }
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  window.addEventListener('resize', updateScrollProgress);
  updateScrollProgress();
})();
</script>

<?php
// Semantic Header & Dynamic Menus
?>
<header class="online-mmj-header online-mmj-static-header site-header sticky top-0 z-40 bg-white shadow-xs border-b border-slate-100">
  
  <!-- Top Announcement Bar -->
  <div class="online-mmj-static-banner bg-[#15803d] text-white text-xs py-2 px-4 font-medium tracking-wide">
    <div class="max-w-7xl mx-auto flex items-center justify-between text-center sm:text-left">
      <div class="flex items-center gap-2 mx-auto sm:mx-0">
        <span class="inline-block w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
        <span>Elevate with peace: <strong>10% off</strong> with your medical card!</span>
      </div>
      <div class="hidden sm:flex items-center gap-3">
        <a href="tel:8884206789" class="flex items-center gap-1.5 font-bold hover:underline text-emerald-100">
          <span>(888) 420-6789</span>
        </a>
      </div>
    </div>
  </div>

  <!-- Main Navigation Bar -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-20">
      
      <!-- Brand Logo -->
      <a href="<?php echo esc_url(home_url('/')); ?>" class="flex items-center gap-2.5 group focus:outline-none">
        <div class="w-10 h-10 rounded-xl bg-[#16a34a] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
          <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C12 2 10 7 8 9C6 11 3 12 3 12C3 12 7 14 9 16C11 18 12 22 12 22C12 22 13 18 15 16C17 14 21 12 21 12C21 12 18 11 16 9C14 7 12 2 12 2Z" fill="white" />
          </svg>
        </div>
        <div class="flex flex-col">
          <span class="text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-none">
            ONLINE MMJ <span class="text-[#16a34a]">CARD</span>
          </span>
          <span class="text-[9px] uppercase tracking-widest text-slate-400 font-bold mt-1">
            Certified Telemedicine Clinic
          </span>
        </div>
      </a>

      <!-- Dynamic Primary Navigation Menu (Editable via WP Admin > Appearance > Menus) -->
      <nav class="hidden md:flex items-center gap-6" aria-label="<?php esc_attr_e('Primary Navigation', 'online-mmj-card'); ?>">
        <?php
        if (has_nav_menu('primary')) {
            wp_nav_menu(array(
                'theme_location' => 'primary',
                'container'      => false,
                'menu_class'     => 'flex items-center gap-6 text-xs font-bold text-slate-700',
                'fallback_cb'    => false,
                'depth'          => 2,
            ));
        } else {
            ?>
            <ul class="flex items-center gap-6 text-xs font-bold text-slate-700">
              <li><a href="<?php echo esc_url(home_url('/#locations-we-serve')); ?>" class="hover:text-[#16a34a] transition-colors">MMJ States</a></li>
              <li><a href="<?php echo esc_url(home_url('/#qualifying-conditions')); ?>" class="hover:text-[#16a34a] transition-colors">Conditions</a></li>
              <li><a href="<?php echo esc_url(home_url('/medical-marijuana-card-renewal/')); ?>" class="hover:text-[#16a34a] transition-colors">Renewal</a></li>
              <li><a href="<?php echo esc_url(home_url('/blog/')); ?>" class="hover:text-[#16a34a] transition-colors">Resources</a></li>
              <li><a href="<?php echo esc_url(home_url('/#why-trust')); ?>" class="hover:text-[#16a34a] transition-colors">About</a></li>
              <li><a href="<?php echo esc_url(home_url('/contact-us/')); ?>" class="hover:text-[#16a34a] transition-colors">Contact Us</a></li>
            </ul>
            <?php
        }
        ?>
      </nav>

      <!-- Header Action Button -->
      <div class="flex items-center gap-3">
        <a href="<?php echo esc_url(home_url('/new-patient-medical-marijuana-card/')); ?>" class="mmj-btn-primary px-5 py-2.5 text-xs">
          <span>Get Recommendation</span>
          <span>&rarr;</span>
        </a>
      </div>

    </div>
  </div>
</header>
