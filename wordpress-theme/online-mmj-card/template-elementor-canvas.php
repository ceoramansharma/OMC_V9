<?php
/**
 * Template Name: Elementor / Divi Canvas (Blank Canvas)
 * Template Post Type: page, post
 *
 * 100% blank template without header or footer for complete custom landing page design.
 * Features standard wp_head() and wp_footer() hooks for SEO plugin and script compatibility.
 *
 * @package Online_MMJ_Card
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>
<body <?php body_class('elementor-canvas'); ?>>
<?php wp_body_open(); ?>

<main id="main-content" class="elementor-canvas-wrapper" style="width:100%; min-height:100vh; margin:0; padding:0;">
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

<?php wp_footer(); ?>
</body>
</html>
