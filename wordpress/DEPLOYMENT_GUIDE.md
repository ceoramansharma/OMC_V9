# How to Deploy "Online MMJ Card" on WordPress

This guide explains the 3 best ways to deploy your **Online MMJ Card** React application onto your WordPress website.

---

## Method 1: As a Custom WordPress Plugin (Recommended)

This method packages the application into a standard WordPress plugin and lets you embed it on any page using the `[online_mmj_card]` shortcode.

### Step 1: Build the WordPress Package
Run the automated packaging script:
```bash
npm run build:wordpress
```
This generates the ready-to-upload plugin directory at:
`/wordpress-release/online-mmj-card/`

### Step 2: Zip the Plugin
Zip the `online-mmj-card` folder into `online-mmj-card.zip`.

### Step 3: Upload & Activate in WordPress
1. Log in to your WordPress Admin dashboard (`yourdomain.com/wp-admin`).
2. Go to **Plugins > Add New Plugin**.
3. Click **Upload Plugin** at the top.
4. Select `online-mmj-card.zip` and click **Install Now**.
5. Click **Activate Plugin**.

### Step 4: Display on Any Page
1. Go to **Pages > Add New** (e.g. title: "Get Your Card" or "Apply").
2. Set the page template to **Full Width / Canvas** (optional, recommended if you want the app to span edge-to-edge).
3. Insert a **Shortcode Block** (or Elementor Shortcode widget) and enter:
   ```text
   [online_mmj_card]
   ```
4. Click **Publish**! The full application with interactive state selection, intake form, live chat, and patient portal is now live on your WordPress site.

---

## Method 2: Direct Subdirectory on WordPress Hosting (cPanel / FTP)

If you use cPanel, Hostinger, SiteGround, Bluehost, GoDaddy, or standard Apache/Nginx hosting:

### Step 1: Build the Static Files
Run:
```bash
npm run build
```
This creates the production files inside the `dist/` folder.

### Step 2: Upload via File Manager or FTP
1. Log in to your hosting **cPanel** or connect via **FTP / SFTP** (FileZilla).
2. Open your WordPress web root directory:
   `public_html/`
3. Create a new folder named `get-card` or `app` (e.g., `public_html/get-card/`).
4. Upload all contents of the `dist/` folder directly into `public_html/get-card/`.

### Step 3: Add Apache Rewrite Rules for Clean Routing (Optional)
In `public_html/get-card/`, create or edit `.htaccess`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /get-card/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /get-card/index.html [L]
</IfModule>
```

### Step 4: Link From WordPress Menu
In your WordPress Admin, go to **Appearance > Menus**, add a Custom Link:
- URL: `https://yourdomain.com/get-card/`
- Link Text: `Get Your MMJ Card`

---

## Method 3: Cloud Hosting + WordPress Menu or iFrame Embed

If you prefer hosting the React app on a fast CDN (like Cloudflare Pages, Vercel, or Netlify):

1. **Deploy to Subdomain**:
   - Connect your GitHub repo to Vercel/Cloudflare Pages/Netlify.
   - Point your DNS subdomain: `app.yourdomain.com` or `apply.yourdomain.com`.
   - Add a high-converting button in your WordPress header menu: "Get Your Card Now" pointing to `https://app.yourdomain.com`.

2. **Or Embed via WordPress iFrame Block**:
   Add a Custom HTML block in Gutenberg:
   ```html
   <iframe 
     src="https://app.yourdomain.com" 
     style="width: 100%; height: 100vh; border: none;"
     allow="camera; microphone"
     loading="lazy">
   </iframe>
   ```

---

## Key Verification Checklist
- ✅ **Camera / Photo ID Permissions**: If your users take photos of their government IDs, ensure your WordPress site is running on **HTTPS / SSL**.
- ✅ **HIPAA Compliance**: No patient health data is stored in standard WordPress MySQL tables, maintaining compliance.
- ✅ **Mobile Responsive**: The application is 100% responsive and tested on iPhone, Android, tablets, and desktops.
