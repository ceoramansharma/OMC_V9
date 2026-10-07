<?php
/**
 * The template for displaying archive pages
 *
 * Fully compatible with WordPress archives, categories, tags, and custom taxonomies.
 *
 * @package Online_MMJ_Card
 */

get_header();

$is_builder = function_exists('online_mmj_is_builder_active') ? online_mmj_is_builder_active() : false;

if ($is_builder) : ?>
<main id="main-content" class="site-main py-10 sm:py-14">
  <div class="mmj-container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <header class="page-header mb-10 pb-4 border-b border-slate-200">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
        <?php the_archive_title(); ?>
      </h1>
      <?php the_archive_description('<div class="archive-description text-sm text-slate-600 mt-2">', '</div>'); ?>
    </header>

    <?php if (have_posts()) : ?>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <?php
        while (have_posts()) :
          the_post();
          ?>
          <article id="post-<?php the_ID(); ?>" <?php post_class('p-6 bg-white border border-slate-200 rounded-3xl shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between'); ?>>
            <div>
              <?php if (has_post_thumbnail()) : ?>
                <div class="post-thumbnail mb-4 rounded-2xl overflow-hidden aspect-video">
                  <a href="<?php the_permalink(); ?>">
                    <?php the_post_thumbnail('medium', array(
                      'class' => 'w-full h-full object-cover hover:scale-105 transition-transform duration-300',
                      'alt'   => get_post_meta(get_post_thumbnail_id(), '_wp_attachment_image_alt', true) ?: get_the_title()
                    )); ?>
                  </a>
                </div>
              <?php endif; ?>

              <div class="text-xs text-slate-400 mb-2 font-semibold"><?php echo get_the_date(); ?></div>
              
              <h2 class="text-lg font-bold text-slate-900 mb-2 hover:text-[#16a34a] transition-colors">
                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
              </h2>
              
              <div class="text-xs text-slate-600 line-clamp-3 mb-4">
                <?php the_excerpt(); ?>
              </div>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <a href="<?php the_permalink(); ?>" class="font-bold text-[#16a34a] hover:underline inline-flex items-center gap-1">
                <span>Read Article</span>
                <span>&rarr;</span>
              </a>
            </div>
          </article>
          <?php
        endwhile;
        ?>
      </div>

      <div class="pagination-wrapper mt-12 flex justify-center">
        <?php
        the_posts_pagination(array(
          'mid_size'  => 2,
          'prev_text' => esc_html__('&larr; Previous', 'online-mmj-card'),
          'next_text' => esc_html__('Next &rarr;', 'online-mmj-card'),
        ));
        ?>
      </div>
    <?php else : ?>
      <div class="no-posts p-8 bg-slate-50 rounded-2xl border border-slate-200 text-center">
        <p class="text-sm font-semibold text-slate-600"><?php esc_html_e('No articles found in this archive.', 'online-mmj-card'); ?></p>
      </div>
    <?php endif; ?>
  </div>
</main>
<?php else : ?>
  <!-- Interactive Telehealth Mount for Full Responsive React SPA -->
  <div id="online-mmj-card-root">
    <noscript>
      <main id="main-content" class="site-main py-10 sm:py-14">
        <div class="mmj-container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <header class="page-header mb-10 pb-4 border-b border-slate-200">
            <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              <?php the_archive_title(); ?>
            </h1>
          </header>
          <?php if (have_posts()) : ?>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <?php
              while (have_posts()) :
                the_post();
                ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class('p-6 bg-white border border-slate-200 rounded-3xl shadow-xs'); ?>>
                  <h2 class="text-lg font-bold text-slate-900 mb-2">
                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                  </h2>
                  <div class="text-xs text-slate-600 line-clamp-3 mb-4">
                    <?php the_excerpt(); ?>
                  </div>
                </article>
                <?php
              endwhile;
              ?>
            </div>
          <?php endif; ?>
        </div>
      </main>
    </noscript>
  </div>
<?php endif; ?>

<?php
get_footer();
