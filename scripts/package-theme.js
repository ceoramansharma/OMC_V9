import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const distAssetsDir = path.join(rootDir, 'dist', 'assets');
const themeDir = path.join(rootDir, 'wordpress-theme', 'online-mmj-card');
const themeAssetsDir = path.join(themeDir, 'assets');

console.log('Packaging Online MMJ Card WordPress Theme...');

if (!fs.existsSync(distAssetsDir)) {
  console.error('Error: dist/assets directory not found. Please run "npm run build" first.');
  process.exit(1);
}

// Ensure theme assets directory exists and is clean
fs.rmSync(themeAssetsDir, { recursive: true, force: true });
fs.mkdirSync(themeAssetsDir, { recursive: true });

// Copy all assets (JS, CSS) from dist/assets into theme/assets
const assetFiles = fs.readdirSync(distAssetsDir);
let jsCount = 0;
let cssCount = 0;

for (const file of assetFiles) {
  const src = path.join(distAssetsDir, file);
  const dest = path.join(themeAssetsDir, file);
  fs.copyFileSync(src, dest);
  if (file.endsWith('.js')) jsCount++;
  if (file.endsWith('.css')) cssCount++;
}

console.log(`Copied ${jsCount} JS bundle(s) and ${cssCount} CSS bundle(s) to theme assets.`);

// Copy sitemap.xml and robots.txt to theme root
const publicDir = path.join(rootDir, 'public');
if (fs.existsSync(path.join(publicDir, 'sitemap.xml'))) {
  fs.copyFileSync(path.join(publicDir, 'sitemap.xml'), path.join(themeDir, 'sitemap.xml'));
  console.log('Copied dynamic sitemap.xml to theme root.');
}
if (fs.existsSync(path.join(publicDir, 'robots.txt'))) {
  fs.copyFileSync(path.join(publicDir, 'robots.txt'), path.join(themeDir, 'robots.txt'));
  console.log('Copied robots.txt to theme root.');
}

// Check required theme files
const requiredFiles = ['style.css', 'index.php', 'front-page.php', 'header.php', 'footer.php', 'page.php', 'functions.php', 'screenshot.png'];
let allPresent = true;

for (const req of requiredFiles) {
  if (!fs.existsSync(path.join(themeDir, req))) {
    console.warn(`Warning: Missing file ${req} in theme directory`);
    allPresent = false;
  }
}

if (allPresent) {
  console.log('========================================================================');
  console.log('SUCCESS: Online MMJ Card WordPress Theme is fully packaged and ready!');
  console.log(`Location: ${themeDir}`);
  console.log('========================================================================');
  console.log('Installation Steps:');
  console.log('1. Copy or zip the "online-mmj-card" folder inside "/wordpress-theme/"');
  console.log('2. In your WordPress site:');
  console.log('   - Upload the folder to: wp-content/themes/online-mmj-card/');
  console.log('   - OR in WP Admin: Appearance > Themes > Add New > Upload Theme > upload online-mmj-card.zip');
  console.log('3. Click "Activate"');
  console.log('4. Your entire Online MMJ Card telemedicine platform is now live on WordPress!');
  console.log('========================================================================');
}
