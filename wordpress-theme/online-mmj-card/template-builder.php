<?php
/**
 * Template Name: Page Builder with Evaluation Form
 * Template Post Type: page
 *
 * Dedicated landing page template combining custom Page Builder / Gutenberg content
 * with the interactive online MMJ doctor evaluation form.
 * Fully unconstrained layout with standard the_content() loop.
 *
 * @package Online_MMJ_Card
 */

get_header();

$is_builder = function_exists('online_mmj_is_builder_active') ? online_mmj_is_builder_active(get_the_ID()) : false;

if ($is_builder) : ?>
<main id="main-content" class="site-main builder-evaluation-template" style="width:100%; min-height:60vh; padding:0; margin:0;">
    <?php
    while (have_posts()) :
        the_post();
        ?>
        <div class="builder-custom-content">
            <?php the_content(); ?>
        </div>
        <?php
        wp_link_pages(array(
            'before' => '<div class="page-links text-center py-4">' . esc_html__('Pages:', 'online-mmj-card'),
            'after'  => '</div>',
        ));
    endwhile;
    ?>

    <!-- Embedded Interactive Evaluation Form (Optional dynamic shortcode hook) -->
    <div class="max-w-4xl mx-auto px-4 py-8">
        <?php echo do_shortcode('[mmj_evaluation_form]'); ?>
    </div>
</main>
<?php else : ?>
  <!-- Interactive Telehealth Mount for Full Responsive React SPA -->
  <div id="online-mmj-card-root">
    <noscript>
      <main id="main-content" class="site-main builder-evaluation-template" style="width:100%; min-height:60vh; padding:0; margin:0;">
        <?php
        while (have_posts()) :
          the_post();
          the_content();
        endwhile;
        ?>
      </main>
    </noscript>
  </div>
<?php endif; ?>

<?php
get_footer();
