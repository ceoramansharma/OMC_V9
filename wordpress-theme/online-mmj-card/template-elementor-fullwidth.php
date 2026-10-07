<?php
/**
 * Template Name: Elementor / Divi Full Width
 * Template Post Type: page, post
 *
 * Full-width page builder template retaining the theme header and footer.
 * Perfect for Elementor, Divi Pro, Beaver Builder, and Gutenberg.
 *
 * @package Online_MMJ_Card
 */

get_header();
?>

<main id="main-content" class="site-main builder-fullwidth" style="width:100%; min-height:60vh; padding:0; margin:0;">
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

<?php
get_footer();
