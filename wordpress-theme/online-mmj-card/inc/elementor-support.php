<?php
/**
 * Online MMJ Card - Elementor & Divi Pro Full Compatibility & Shortcodes
 *
 * Makes every block and section completely editable in Elementor, Divi Pro, Beaver Builder,
 * and the Gutenberg Block Editor.
 *
 * @package Online_MMJ_Card
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * 1. Declare Theme Support for Elementor, Divi, and Block Editor
 */
function online_mmj_register_builder_support() {
    // Gutenberg Wide & Full Alignments
    add_theme_support('align-wide');

    // Editor Styles
    add_theme_support('editor-styles');

    // Block Styles
    add_theme_support('wp-block-styles');

    // Elementor Theme Locations (Header, Footer, Single)
    add_theme_support('elementor');

    // Register Block Pattern Category
    if (function_exists('register_block_pattern_category')) {
        register_block_pattern_category(
            'online-mmj',
            array('label' => __('Online MMJ Card Blocks', 'online-mmj-card'))
        );
    }
}
add_action('after_setup_theme', 'online_mmj_register_builder_support');

/**
 * 2. Elementor Theme Locations Registration
 */
function online_mmj_register_elementor_locations($elementor_theme_manager) {
    $elementor_theme_manager->register_location('header');
    $elementor_theme_manager->register_location('footer');
    $elementor_theme_manager->register_location('single');
    $elementor_theme_manager->register_location('archive');
}
add_action('elementor/theme/register_locations', 'online_mmj_register_elementor_locations');

/**
 * 3. Shortcode: [mmj_hero]
 * Embeds Hero Banner with headline, subhead, guarantee, and evaluation form.
 */
function online_mmj_hero_shortcode($atts) {
    $a = shortcode_atts(array(
        'headline' => 'Get Your Medical Marijuana Card Online Fast',
        'subhead'  => 'Connect with state-licensed 420 physicians from home. 100% online evaluations with same-day digital recommendation.',
        'show_form'=> 'yes',
    ), $atts);

    ob_start();
    ?>
    <section class="mmj-hero-section py-12 lg:py-16 bg-gradient-to-b from-emerald-50/50 via-white to-white" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div class="lg:col-span-6 space-y-5">
                <div style="display:inline-flex; align-items:center; gap:6px; background:#dcfce7; color:#15803d; font-size:12px; font-weight:800; padding:6px 14px; border-radius:9999px; text-transform:uppercase; letter-spacing:0.5px;">
                    <span>&starf; Certified Telehealth Doctors</span>
                </div>
                <h1 style="font-size:36px; font-weight:900; line-height:1.15; color:#0f172a; margin:0; letter-spacing:-0.5px;">
                    <?php echo esc_html($a['headline']); ?>
                </h1>
                <p style="font-size:16px; color:#475569; line-height:1.6; margin:0;">
                    <?php echo esc_html($a['subhead']); ?>
                </p>
                <div style="display:flex; flex-wrap:wrap; gap:16px; font-size:13px; font-weight:700; color:#1e293b; padding-top:8px;">
                    <div style="display:flex; align-items:center; gap:6px;">
                        <span style="color:#008f58; font-size:16px;">&check;</span> 100% Online Consultations
                    </div>
                    <div style="display:flex; align-items:center; gap:6px;">
                        <span style="color:#008f58; font-size:16px;">&check;</span> 100% Money-Back Guarantee
                    </div>
                    <div style="display:flex; align-items:center; gap:6px;">
                        <span style="color:#008f58; font-size:16px;">&check;</span> HIPAA Compliant & Confidential
                    </div>
                </div>
            </div>

            <?php if ($a['show_form'] === 'yes') : ?>
                <div class="lg:col-span-6 flex justify-center">
                    <?php echo do_shortcode('[mmj_evaluation_form]'); ?>
                </div>
            <?php endif; ?>
        </div>
    </section>
    <?php
    return ob_get_clean();
}
add_shortcode('mmj_hero', 'online_mmj_hero_shortcode');

/**
 * 4. Shortcode: [mmj_stats_bar]
 * Embeds Stats & Trust Proof Bar
 */
function online_mmj_stats_bar_shortcode() {
    ob_start();
    ?>
    <section class="mmj-stats-bar" style="background:#0f172a; color:#fff; padding:24px 16px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
        <div style="max-w:1200px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:20px; text-align:center;">
            <div>
                <div style="font-size:26px; font-weight:900; color:#34d399;">250,000+</div>
                <div style="font-size:12px; color:#94a3b8; font-weight:600; text-transform:uppercase; margin-top:2px;">Patients Evaluated</div>
            </div>
            <div>
                <div style="font-size:26px; font-weight:900; color:#34d399;">99.4%</div>
                <div style="font-size:12px; color:#94a3b8; font-weight:600; text-transform:uppercase; margin-top:2px;">Doctor Approval Rate</div>
            </div>
            <div>
                <div style="font-size:26px; font-weight:900; color:#34d399;">15 Minutes</div>
                <div style="font-size:12px; color:#94a3b8; font-weight:600; text-transform:uppercase; margin-top:2px;">Average Consultation Time</div>
            </div>
            <div>
                <div style="font-size:26px; font-weight:900; color:#34d399;">100% Free</div>
                <div style="font-size:12px; color:#94a3b8; font-weight:600; text-transform:uppercase; margin-top:2px;">If Not Approved Guarantee</div>
            </div>
        </div>
    </section>
    <?php
    return ob_get_clean();
}
add_shortcode('mmj_stats_bar', 'online_mmj_stats_bar_shortcode');

/**
 * 5. Shortcode: [mmj_how_it_works]
 * 3-Step Telemedicine Process
 */
function online_mmj_how_it_works_shortcode() {
    ob_start();
    ?>
    <section class="mmj-how-it-works" style="padding:48px 16px; background:#fff; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
        <div style="max-width:1100px; margin:0 auto;">
            <div style="text-align:center; margin-bottom:36px;">
                <h2 style="font-size:28px; font-weight:900; color:#0f172a; margin:0;">How to Get Your MMJ Card in 3 Easy Steps</h2>
                <p style="font-size:15px; color:#64748b; margin:6px 0 0;">Simple, 100% HIPAA-compliant online telehealth consultations</p>
            </div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:24px;">
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:16px; padding:24px; text-align:center;">
                    <div style="width:48px; height:48px; background:#dcfce7; color:#15803d; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:20px; font-weight:900; margin:0 auto 16px;">1</div>
                    <h3 style="font-size:18px; font-weight:800; color:#0f172a; margin:0 0 8px;">Fill Out Intake Form</h3>
                    <p style="font-size:13px; color:#64748b; line-height:1.5; margin:0;">Complete our secure 60-second medical questionnaire from any computer, tablet, or smartphone.</p>
                </div>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:16px; padding:24px; text-align:center;">
                    <div style="width:48px; height:48px; background:#dcfce7; color:#15803d; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:20px; font-weight:900; margin:0 auto 16px;">2</div>
                    <h3 style="font-size:18px; font-weight:800; color:#0f172a; margin:0 0 8px;">Consult with a Doctor</h3>
                    <p style="font-size:13px; color:#64748b; line-height:1.5; margin:0;">Have a friendly 10-15 minute video appointment with a state-licensed medical marijuana doctor.</p>
                </div>
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:16px; padding:24px; text-align:center;">
                    <div style="width:48px; height:48px; background:#dcfce7; color:#15803d; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:20px; font-weight:900; margin:0 auto 16px;">3</div>
                    <h3 style="font-size:18px; font-weight:800; color:#0f172a; margin:0 0 8px;">Get Your Recommendation</h3>
                    <p style="font-size:13px; color:#64748b; line-height:1.5; margin:0;">Receive your official digital recommendation letter immediately via email to visit licensed dispensaries.</p>
                </div>
            </div>
        </div>
    </section>
    <?php
    return ob_get_clean();
}
add_shortcode('mmj_how_it_works', 'online_mmj_how_it_works_shortcode');

/**
 * 6. Shortcode: [mmj_services_pricing]
 * Pricing Cards Grid
 */
function online_mmj_services_pricing_shortcode() {
    ob_start();
    ?>
    <section class="mmj-pricing" style="padding:48px 16px; background:#f8fafc; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
        <div style="max-width:1100px; margin:0 auto;">
            <div style="text-align:center; margin-bottom:36px;">
                <h2 style="font-size:28px; font-weight:900; color:#0f172a; margin:0;">Certified Telemedicine Services & Pricing</h2>
                <p style="font-size:15px; color:#64748b; margin:6px 0 0;">Transparent pricing with no hidden clinic or processing fees</p>
            </div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:20px;">
                <!-- Card 1 -->
                <div style="background:#fff; border:2px solid #e2e8f0; border-radius:16px; padding:24px; text-align:center;">
                    <div style="font-size:13px; font-weight:800; color:#64748b; text-transform:uppercase;">New Patient</div>
                    <div style="font-size:32px; font-weight:900; color:#0f172a; margin:8px 0;">$39.99</div>
                    <p style="font-size:12px; color:#64748b; margin-bottom:16px;">Full 1-year doctor recommendation and digital verification.</p>
                    <a href="<?php echo esc_url(home_url('/book-evaluation/')); ?>" style="display:block; background:#008f58; color:#fff; padding:10px 16px; border-radius:10px; font-weight:800; text-decoration:none; font-size:13px;">Book Evaluation &rarr;</a>
                </div>
                <!-- Card 2 -->
                <div style="background:#fff; border:2px solid #008f58; border-radius:16px; padding:24px; text-align:center; position:relative;">
                    <div style="position:absolute; top:-12px; left:50%; transform:translateX(-50%); background:#008f58; color:#fff; font-size:10px; font-weight:800; padding:2px 10px; border-radius:9999px; text-transform:uppercase;">Most Popular</div>
                    <div style="font-size:13px; font-weight:800; color:#008f58; text-transform:uppercase;">Card Renewal</div>
                    <div style="font-size:32px; font-weight:900; color:#0f172a; margin:8px 0;">$39.99</div>
                    <p style="font-size:12px; color:#64748b; margin-bottom:16px;">Renew from any doctor or clinic across eligible states.</p>
                    <a href="<?php echo esc_url(home_url('/book-evaluation/')); ?>" style="display:block; background:#008f58; color:#fff; padding:10px 16px; border-radius:10px; font-weight:800; text-decoration:none; font-size:13px;">Renew Online &rarr;</a>
                </div>
                <!-- Card 3 -->
                <div style="background:#fff; border:2px solid #e2e8f0; border-radius:16px; padding:24px; text-align:center;">
                    <div style="font-size:13px; font-weight:800; color:#64748b; text-transform:uppercase;">99-Plant Cultivation</div>
                    <div style="font-size:32px; font-weight:900; color:#0f172a; margin:8px 0;">$149.00</div>
                    <p style="font-size:12px; color:#64748b; margin-bottom:16px;">Grow up to 99 plants legally with doctor-certified medical rec.</p>
                    <a href="<?php echo esc_url(home_url('/book-evaluation/')); ?>" style="display:block; background:#0f172a; color:#fff; padding:10px 16px; border-radius:10px; font-weight:800; text-decoration:none; font-size:13px;">Apply Now &rarr;</a>
                </div>
                <!-- Card 4 -->
                <div style="background:#fff; border:2px solid #e2e8f0; border-radius:16px; padding:24px; text-align:center;">
                    <div style="font-size:13px; font-weight:800; color:#64748b; text-transform:uppercase;">ESA Pet Letter</div>
                    <div style="font-size:32px; font-weight:900; color:#0f172a; margin:8px 0;">$129.00</div>
                    <p style="font-size:12px; color:#64748b; margin-bottom:16px;">Housing rights & pet fee exemption with licensed mental health rec.</p>
                    <a href="<?php echo esc_url(home_url('/book-evaluation/')); ?>" style="display:block; background:#0f172a; color:#fff; padding:10px 16px; border-radius:10px; font-weight:800; text-decoration:none; font-size:13px;">Apply Now &rarr;</a>
                </div>
            </div>
        </div>
    </section>
    <?php
    return ob_get_clean();
}
add_shortcode('mmj_services_pricing', 'online_mmj_services_pricing_shortcode');

/**
 * 7. Shortcode: [mmj_trust_badges]
 */
function online_mmj_trust_badges_shortcode() {
    ob_start();
    ?>
    <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:20px; padding:20px 0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; text-align:center;">
        <div style="display:flex; align-items:center; gap:8px; background:#f1f5f9; padding:8px 16px; border-radius:9999px; font-size:12px; font-weight:700; color:#334155;">
            <span style="color:#008f58; font-size:16px;">&starf;</span> 420 Board Certified Doctors
        </div>
        <div style="display:flex; align-items:center; gap:8px; background:#f1f5f9; padding:8px 16px; border-radius:9999px; font-size:12px; font-weight:700; color:#334155;">
            <span style="color:#008f58; font-size:16px;">&check;</span> HIPAA Compliant Privacy
        </div>
        <div style="display:flex; align-items:center; gap:8px; background:#f1f5f9; padding:8px 16px; border-radius:9999px; font-size:12px; font-weight:700; color:#334155;">
            <span style="color:#008f58; font-size:16px;">&dollar;</span> 100% Refund If Not Approved
        </div>
        <div style="display:flex; align-items:center; gap:8px; background:#f1f5f9; padding:8px 16px; border-radius:9999px; font-size:12px; font-weight:700; color:#334155;">
            <span style="color:#008f58; font-size:16px;">&lock;</span> 256-Bit SSL Encrypted
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('mmj_trust_badges', 'online_mmj_trust_badges_shortcode');

/**
 * 8. Live Real-Time Page Builder Save Event Broadcaster
 * Notifies the React application and preview canvases when Elementor, Divi,
 * or the Gutenberg editor finishes saving, so live edits are reflected immediately.
 */
function online_mmj_builder_live_save_script() {
    ?>
    <script>
    (function() {
        function notifySaveCommit(source) {
            var detail = { source: source || 'wordpress-builder', timestamp: Date.now() };
            window.dispatchEvent(new CustomEvent('wp-page-builder-saved', { detail: detail }));
            try {
                if (window.parent && window.parent !== window) {
                    window.parent.postMessage({ type: 'elementor:saved', name: 'elementor:saved', action: 'builder_saved', detail: detail }, '*');
                }
                if (typeof BroadcastChannel !== 'undefined') {
                    var ch = new BroadcastChannel('online-mmj-builder');
                    ch.postMessage({ type: 'page-builder-saved', source: source, timestamp: Date.now() });
                }
            } catch(e) {}
        }

        // 1. Elementor Editor Save Hooks
        if (typeof window !== 'undefined' && window.elementor) {
            try {
                window.elementor.on('document:save:commit', function() { notifySaveCommit('elementor'); });
            } catch(e) {}
        }
        document.addEventListener('elementor/document/saved', function() { notifySaveCommit('elementor'); });

        // 2. Divi Visual Builder Save Hooks
        window.addEventListener('et_builder_saved', function() { notifySaveCommit('divi'); });
        window.addEventListener('message', function(e) {
            if (e.data && (e.data.action === 'et_pb_saved' || e.data.action === 'et_fb_saved' || e.data === 'et_builder_saved')) {
                notifySaveCommit('divi');
            }
        });

        // 3. Gutenberg Block Editor Save Hooks
        if (typeof window !== 'undefined' && window.wp && window.wp.data && window.wp.data.subscribe) {
            var isSaving = false;
            try {
                window.wp.data.subscribe(function() {
                    var editor = window.wp.data.select('core/editor');
                    if (editor && editor.isSavingPost) {
                        var currentlySaving = editor.isSavingPost();
                        if (isSaving && !currentlySaving) {
                            notifySaveCommit('gutenberg');
                        }
                        isSaving = currentlySaving;
                    }
                });
            } catch(e) {}
        }
    })();
    </script>
    <?php
}
add_action('wp_footer', 'online_mmj_builder_live_save_script', 99);
add_action('admin_footer', 'online_mmj_builder_live_save_script', 99);
if (did_action('elementor/loaded')) {
    add_action('elementor/editor/footer', 'online_mmj_builder_live_save_script', 99);
}
