<?php
/**
 * The footer for Online MMJ Card theme
 *
 * Fully modular with dynamic sidebars/widgets, wp_nav_menu support,
 * and standard wp_footer() hook right before </body> for SEO & analytics scripts.
 *
 * @package Online_MMJ_Card
 */

$all_states_list = array(
  'Arizona', 'Arkansas', 'California', 'Connecticut', 'Delaware', 'Florida',
  'Georgia', 'Illinois', 'Iowa', 'Louisiana', 'Maine', 'Maryland',
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
  'Montana', 'Nevada', 'New Jersey', 'New Mexico', 'New York',
  'North Dakota', 'Ohio', 'Oklahoma', 'Pennsylvania', 'Texas',
  'Vermont', 'Virginia', 'Washington DC', 'West Virginia'
);
?>

<footer id="colophon" class="site-footer online-mmj-static-footer bg-[#0f172a] text-slate-300 pt-16 pb-12 border-t border-slate-800 text-xs">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <!-- 4-Column Dynamic Widgets Grid (Editable via WP Admin > Appearance > Widgets) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
      
      <!-- Column 1: Brand & Bio -->
      <div class="lg:col-span-2 space-y-4">
        <?php if (is_active_sidebar('footer-1')) : ?>
          <?php dynamic_sidebar('footer-1'); ?>
        <?php else : ?>
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-xl bg-[#16a34a] flex items-center justify-center text-white shadow-sm">
              <svg viewBox="0 0 24 24" class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C12 2 10 7 8 9C6 11 3 12 3 12C3 12 7 14 9 16C11 18 12 22 12 22C12 22 13 18 15 16C17 14 21 12 21 12C21 12 18 11 16 9C14 7 12 2 12 2Z" fill="white" />
              </svg>
            </div>
            <span class="text-xl font-black text-white tracking-tight">
              ONLINE MMJ <span class="text-[#16a34a]">CARD</span>
            </span>
          </div>

          <p class="text-xs text-slate-400 max-w-sm leading-relaxed">
            United States' most trusted medical marijuana card service. 100% online HIPAA-compliant doctor evaluations with same-day digital certification.
          </p>

          <div class="pt-2 text-xs text-slate-500">
            &copy; <?php echo date('Y'); ?> Online MMJ Card Health Services Inc. All rights reserved.
          </div>
        <?php endif; ?>
      </div>

      <!-- Column 2: Services Menu -->
      <div class="space-y-3">
        <?php if (is_active_sidebar('footer-2')) : ?>
          <?php dynamic_sidebar('footer-2'); ?>
        <?php else : ?>
          <h4 class="text-xs font-bold uppercase tracking-wider text-white">Services</h4>
          <?php
          if (has_nav_menu('footer_services')) {
              wp_nav_menu(array(
                  'theme_location' => 'footer_services',
                  'container'      => false,
                  'menu_class'     => 'space-y-2 text-slate-400',
                  'fallback_cb'    => false,
              ));
          } else {
              ?>
              <ul class="space-y-2 text-slate-400">
                <li><a href="<?php echo esc_url(home_url('/new-patient-medical-marijuana-card/')); ?>" class="hover:text-[#16a34a] transition-colors">Book 420 Evaluation</a></li>
                <li><a href="<?php echo esc_url(home_url('/medical-marijuana-card-renewal/')); ?>" class="hover:text-[#16a34a] transition-colors">Card Renewal</a></li>
                <li><a href="<?php echo esc_url(home_url('/99-plant-cultivation-recommendation/')); ?>" class="hover:text-[#16a34a] transition-colors">99-Plant Cultivation</a></li>
                <li><a href="<?php echo esc_url(home_url('/emotional-support-animal-letter/')); ?>" class="hover:text-[#16a34a] transition-colors">ESA Animal Letter</a></li>
              </ul>
              <?php
          }
          ?>
        <?php endif; ?>
      </div>

      <!-- Column 3: Top States Menu -->
      <div class="space-y-3">
        <?php if (is_active_sidebar('footer-3')) : ?>
          <?php dynamic_sidebar('footer-3'); ?>
        <?php else : ?>
          <h4 class="text-xs font-bold uppercase tracking-wider text-white">Top States</h4>
          <?php
          if (has_nav_menu('footer_states')) {
              wp_nav_menu(array(
                  'theme_location' => 'footer_states',
                  'container'      => false,
                  'menu_class'     => 'space-y-2 text-slate-400',
                  'fallback_cb'    => false,
              ));
          } else {
              ?>
              <ul class="space-y-2 text-slate-400">
                <li><a href="<?php echo esc_url(home_url('/medical-marijuana-card-california/')); ?>" class="hover:text-[#16a34a] transition-colors">California MMJ</a></li>
                <li><a href="<?php echo esc_url(home_url('/medical-marijuana-card-new-york/')); ?>" class="hover:text-[#16a34a] transition-colors">New York MMJ</a></li>
                <li><a href="<?php echo esc_url(home_url('/medical-marijuana-card-florida/')); ?>" class="hover:text-[#16a34a] transition-colors">Florida MMJ</a></li>
                <li><a href="<?php echo esc_url(home_url('/medical-marijuana-card-pennsylvania/')); ?>" class="hover:text-[#16a34a] transition-colors">Pennsylvania MMJ</a></li>
              </ul>
              <?php
          }
          ?>
        <?php endif; ?>
      </div>

      <!-- Column 4: Contact & Support -->
      <div class="space-y-3">
        <?php if (is_active_sidebar('footer-4')) : ?>
          <?php dynamic_sidebar('footer-4'); ?>
        <?php else : ?>
          <h4 class="text-xs font-bold uppercase tracking-wider text-white">Patient Support</h4>
          <p class="text-slate-400">Toll-Free Patient Care Desk:</p>
          <a href="tel:8884206789" class="text-base font-bold text-[#16a34a] block hover:underline">
            (888) 420-6789
          </a>
          <p class="text-slate-500 text-[11px]">Mon &ndash; Sun: 8:00 AM &ndash; 10:00 PM</p>
          <div class="pt-2">
            <span class="inline-block px-2.5 py-1 bg-slate-800 text-emerald-400 font-bold rounded-lg text-[10px]">
              &check; HIPAA Certified Clinic
            </span>
          </div>
        <?php endif; ?>
      </div>

    </div>

    <!-- State Directory Bar for SEO Interlinking -->
    <div class="py-8 border-b border-slate-800 text-[11px] text-slate-400 leading-relaxed text-center">
      <p class="font-semibold text-slate-300 mb-2">Nationwide Telehealth Medical Cannabis Coverage:</p>
      <p>
        <?php foreach ($all_states_list as $i => $st) : 
          $st_slug = sanitize_title($st);
        ?>
          <a href="<?php echo esc_url(home_url('/medical-marijuana-card-')); ?><?php echo esc_attr($st_slug); ?>/" class="hover:text-[#16a34a] transition-colors">
            <?php echo esc_html($st); ?>
          </a>
          <?php if ($i < count($all_states_list) - 1) : ?><span class="text-slate-600 mx-2">&middot;</span><?php endif; ?>
        <?php endforeach; ?>
      </p>
    </div>

    <!-- Disclaimer & Compliance -->
    <div class="pt-6 text-[11px] text-slate-400 leading-relaxed text-center sm:text-left">
      <p>
        <strong class="text-slate-300">Medical Disclaimer:</strong> Online MMJ Card connects patients with state-licensed physicians for medical cannabis evaluations in accordance with applicable state telehealth regulations. Website content is for informational purposes only and does not constitute medical advice. Recommendations are granted strictly at the evaluating physician's medical discretion.
      </p>
    </div>

  </div>
</footer>

<!-- Interactive Telehealth Evaluation Modal for Page Builders & Custom Layouts -->
<div id="mmj-booking-modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; z-index:999999; background:rgba(15,23,42,0.85); backdrop-filter:blur(4px); align-items:center; justify-content:center; padding:16px;">
  <div style="background:#ffffff; border-radius:24px; max-width:520px; width:100%; padding:32px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.35); position:relative; font-family:'Open Sans', sans-serif;">
    <button type="button" id="mmj-close-modal-btn" style="position:absolute; top:20px; right:20px; background:#f1f5f9; border:none; width:36px; height:36px; border-radius:50%; font-size:20px; line-height:1; cursor:pointer; color:#64748b; display:flex; align-items:center; justify-content:center;">&times;</button>
    
    <div style="display:inline-flex; align-items:center; gap:6px; background:#ecfdf5; border:1px solid #a7f3d0; color:#065f46; font-size:11px; font-weight:800; padding:4px 12px; border-radius:9999px; text-transform:uppercase; margin-bottom:12px;">
      &check; State Board Certified Telehealth
    </div>
    
    <h3 style="font-size:22px; font-weight:900; color:#0f172a; margin:0 0 6px;">Start Your 420 Evaluation</h3>
    <p style="font-size:13px; color:#64748b; margin:0 0 20px; line-height:1.5;">Connect with our licensed cannabis physician in 15 minutes. 100% online with money-back guarantee.</p>
    
    <form id="mmj-quick-intake-form" action="<?php echo esc_url(get_option('online_mmj_affiliate_url', home_url('/new-patient-medical-marijuana-card/'))); ?>" method="GET" style="display:flex; flex-direction:column; gap:12px;">
      <div>
        <label style="display:block; font-size:11px; font-weight:800; text-transform:uppercase; color:#475569; margin-bottom:4px;">Your Full Name</label>
        <input type="text" name="patient_name" required placeholder="John Doe" style="width:100%; padding:10px 14px; border:1px solid #cbd5e1; border-radius:10px; font-size:14px; box-sizing:border-box;">
      </div>
      <div>
        <label style="display:block; font-size:11px; font-weight:800; text-transform:uppercase; color:#475569; margin-bottom:4px;">Email Address</label>
        <input type="email" name="patient_email" required placeholder="john@example.com" style="width:100%; padding:10px 14px; border:1px solid #cbd5e1; border-radius:10px; font-size:14px; box-sizing:border-box;">
      </div>
      <div>
        <label style="display:block; font-size:11px; font-weight:800; text-transform:uppercase; color:#475569; margin-bottom:4px;">Phone Number</label>
        <input type="tel" name="patient_phone" required placeholder="(555) 000-0000" style="width:100%; padding:10px 14px; border:1px solid #cbd5e1; border-radius:10px; font-size:14px; box-sizing:border-box;">
      </div>
      <button type="submit" class="mmj-btn-primary" style="width:100%; margin-top:8px; padding:12px 20px; font-size:13px;">
        Continue to Secure Doctor Video Room &rarr;
      </button>
      <div style="font-size:11px; color:#94a3b8; text-align:center; margin-top:4px;">
        &lock; 256-Bit SSL Encrypted &middot; HIPAA Compliant
      </div>
    </form>
  </div>
</div>

<script>
(function() {
  // Modal Handlers
  var modal = document.getElementById('mmj-booking-modal');
  var closeBtn = document.getElementById('mmj-close-modal-btn');
  
  function openModal(e) {
    if (e) e.preventDefault();
    if (modal) modal.style.display = 'flex';
  }
  
  function closeModal() {
    if (modal) modal.style.display = 'none';
  }
  
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal();
    });
  }
  
  document.addEventListener('click', function(e) {
    var target = e.target.closest('a[href="#get-card"], .mmj-open-evaluation-btn, [data-open-modal="evaluation"]');
    if (target) {
      openModal(e);
    }
  });

  // Accordion Handlers for Builder FAQs
  document.addEventListener('click', function(e) {
    var qBtn = e.target.closest('.mmj-faq-question');
    if (qBtn) {
      e.preventDefault();
      var item = qBtn.closest('.mmj-faq-item');
      if (item) {
        var ans = item.querySelector('.mmj-faq-answer');
        if (ans) {
          var isHidden = ans.style.display === 'none' || window.getComputedStyle(ans).display === 'none';
          ans.style.display = isHidden ? 'block' : 'none';
          var arrow = qBtn.querySelector('.mmj-faq-arrow');
          if (arrow) arrow.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      }
    }
  });

  // Interactive Tax Calculator Slider Handler
  document.addEventListener('input', function(e) {
    if (e.target && e.target.classList.contains('mmj-tax-slider')) {
      var val = parseInt(e.target.value, 10);
      var parent = e.target.closest('.mmj-tax-calc-box');
      if (parent) {
        var spendDisplay = parent.querySelector('.mmj-calc-monthly-spend');
        var recTaxDisplay = parent.querySelector('.mmj-calc-rec-tax');
        var savingsDisplay = parent.querySelector('.mmj-calc-savings');
        var rate = parseFloat(parent.getAttribute('data-rec-rate') || '0.30');
        var yearlySpend = val * 12;
        var yearlyRecTax = Math.round(yearlySpend * rate);
        var yearlyMedTax = Math.round(yearlySpend * 0.05);
        var netSavings = Math.round(yearlyRecTax - yearlyMedTax);

        if (spendDisplay) spendDisplay.textContent = '$' + val + ' / month';
        if (recTaxDisplay) recTaxDisplay.textContent = '$' + yearlyRecTax.toLocaleString();
        if (savingsDisplay) savingsDisplay.textContent = '$' + netSavings.toLocaleString();
      }
    }
  });
})();
</script>

<?php
/**
 * Critical SEO & Theme Hook:
 * wp_footer() called right before closing </body> for proper SEO scripts,
 * tracking, caching plugins, and Page Builder scripts.
 */
wp_footer();
?>
</body>
</html>
