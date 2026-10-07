<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package Online_MMJ_Card
 */

get_header();
?>

<div id="online-mmj-card-root">
  <main id="main-content" class="site-main py-20 text-center">
    <div class="mmj-container max-w-2xl mx-auto space-y-6">
      <div class="text-6xl font-extrabold text-[#16a34a]">404</div>
      <h1 class="text-3xl font-extrabold text-slate-900">Page Not Found</h1>
      <p class="text-sm text-slate-600 leading-relaxed">
        The page you are looking for might have been moved or does not exist. Explore our top medical marijuana services and state locations below.
      </p>

      <div class="pt-4 flex flex-wrap justify-center gap-3">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="mmj-btn-primary">Return to Home</a>
        <a href="<?php echo esc_url(home_url('/new-patient-medical-marijuana-card/')); ?>" class="mmj-btn-secondary">Book Evaluation</a>
        <a href="<?php echo esc_url(home_url('/#local-cities')); ?>" class="mmj-btn-secondary">Local Cities</a>
      </div>
    </div>
  </main>
</div>

<?php
get_footer();
