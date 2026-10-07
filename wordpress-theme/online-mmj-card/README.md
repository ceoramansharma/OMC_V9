# Online MMJ Card - Official WordPress Theme

This is a complete, fully functional WordPress theme that turns any WordPress site into the **Online MMJ Card** telemedicine platform.

---

## What Is Included in This Theme
- **Complete Single & Multi-State Telehealth Intake Flow**: 5-step registration, photo ID upload simulation, health questionnaires, physician scheduling, and simulated secure payment with promo codes.
- **State-by-State Pricing & Law Explorer**: Filterable directory with 20+ states, validities, possession limits, cultivation guidelines, and official health department links.
- **Interactive Dispensary Tax Savings Calculator**: Real-time savings simulator comparing medical vs recreational cannabis taxes.
- **30-Second Pre-Qualification Self-Check**: Interactive symptom matrix with clinical endocannabinoid explanations.
- **State Reciprocity Checker**: Dynamic tool for patients traveling across state lines.
- **Persistent Live Chat Support Assistant**: Bottom-right floating medical intake coordinator ("Sarah M.") answering common patient questions and launching evaluations.
- **Verified Patient Reviews**: Rating breakdowns with interactive review submission.
- **Patient Portal**: Instant recommendation lookup, validity tracker, and PDF download.

---

## How to Install on WordPress

### Method A: Via WordPress Admin (Fastest)
1. Zip the `online-mmj-card` folder into `online-mmj-card.zip`.
2. Log in to your WordPress Admin dashboard (`yourdomain.com/wp-admin`).
3. Navigate to **Appearance > Themes**.
4. Click **Add New Theme**, then click **Upload Theme** at the top.
5. Select `online-mmj-card.zip` and click **Install Now**.
6. Click **Activate**.

### Method B: Via FTP / cPanel File Manager
1. Connect to your hosting via FTP (e.g. FileZilla) or open cPanel File Manager.
2. Navigate to:
   ```text
   wp-content/themes/
   ```
3. Upload the `online-mmj-card` directory directly into `wp-content/themes/online-mmj-card/`.
4. In WordPress Admin, go to **Appearance > Themes** and click **Activate** on **Online MMJ Card**.

---

## File Structure of the Theme:
```text
wp-content/themes/online-mmj-card/
├── style.css           # Theme metadata and base layout rules
├── functions.php       # Enqueues React ES Module bundle and Google Fonts
├── header.php          # HTML head, wp_head(), and body open
├── footer.php          # wp_footer() and closing tags
├── index.php           # Main fallback template mounting #online-mmj-card-root
├── front-page.php      # Front page template for automatic home page rendering
├── page.php            # Inner page template
├── screenshot.png      # Theme preview badge in Appearance > Themes
└── assets/             # Compiled production JavaScript and CSS bundles
    ├── index-BYIyViHP.js
    └── index-nqlmsoZ_.css
```

---

## Re-building Assets After Code Changes
If you ever edit React components in `src/`, re-package the theme simply by running:
```bash
npm run build:theme
```
This re-compiles the React application with Vite and automatically syncs the output into `wordpress-theme/online-mmj-card/assets/`.
