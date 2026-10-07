<?php
/**
 * Template Name: Contact Us & Patient Support Desk
 * Template Post Type: page
 *
 * Dedicated patient contact desk template. Seamlessly renders the interactive
 * React Contact desk with toll-free telephone, HIPAA-compliant email, and direct
 * telemedicine evaluation appointments.
 *
 * @package Online_MMJ_Card
 */

get_header();

$is_builder = function_exists('online_mmj_is_builder_active') ? online_mmj_is_builder_active(get_the_ID()) : false;

if ($is_builder) : ?>
<main id="main-content" class="site-main contact-template-container" style="width:100%; min-height:70vh; padding:0; margin:0;">
    <?php
    if (have_posts()) :
        while (have_posts()) :
            the_post();
            the_content();
        endwhile;
    endif;
    ?>
</main>
<?php else : ?>
<main id="main-content" class="site-main contact-template-container" style="width:100%; min-height:70vh; padding:0; margin:0;">
    <!-- Interactive React Mount for Contact Desk -->
    <div id="online-mmj-card-root">
        <?php
        // Standard WordPress Content Fallback for SEO / Non-JS
        if (have_posts()) :
            while (have_posts()) :
                the_post();
                ?>
                <noscript>
                    <div style="max-width: 900px; margin: 40px auto; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px;">
                        <h1 style="font-size: 28px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">Contact Patient Support Desk</h1>
                        <p style="font-size: 15px; color: #475569; line-height: 1.6; margin-bottom: 24px;">
                            Have questions regarding medical marijuana card evaluations, qualifying health conditions, or state cannabis registry renewals? Speak with our licensed telehealth intake coordinators.
                        </p>
                        
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-bottom: 24px;">
                            <div style="padding: 16px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px;">
                                <strong style="display: block; font-size: 13px; color: #166534; text-transform: uppercase;">Toll-Free Phone:</strong>
                                <a href="tel:8884206789" style="font-size: 18px; font-weight: 800; color: #15803d; text-decoration: none;">(888) 420-6789</a>
                                <p style="font-size: 12px; color: #166534; margin: 4px 0 0;">Open 7 Days · 8:00 AM - 10:00 PM EST</p>
                            </div>
                            <div style="padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px;">
                                <strong style="display: block; font-size: 13px; color: #334155; text-transform: uppercase;">Direct Patient Email:</strong>
                                <a href="mailto:support@onlinemmjcard.com" style="font-size: 16px; font-weight: 700; color: #0f172a; text-decoration: none;">support@onlinemmjcard.com</a>
                                <p style="font-size: 12px; color: #64748b; margin: 4px 0 0;">Response within 15–30 minutes</p>
                            </div>
                        </div>

                        <?php the_content(); ?>
                    </div>
                </noscript>
                <?php
            endwhile;
        endif;
        ?>
    </div>
</main>
<?php endif; ?>

<?php
get_footer();
