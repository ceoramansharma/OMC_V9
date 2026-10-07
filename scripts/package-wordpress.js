import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const distDir = path.join(rootDir, 'dist');
const wpPluginPhp = path.join(rootDir, 'wordpress', 'online-mmj-card.php');
const targetPluginDir = path.join(rootDir, 'wordpress-release', 'online-mmj-card');

console.log('Packaging Online MMJ Card for WordPress...');

if (!fs.existsSync(distDir)) {
  console.error('Error: dist directory not found. Please run "npm run build" first.');
  process.exit(1);
}

// Ensure target directory exists
fs.rmSync(path.join(rootDir, 'wordpress-release'), { recursive: true, force: true });
fs.mkdirSync(path.join(targetPluginDir, 'dist'), { recursive: true });

// Copy PHP plugin file
fs.copyFileSync(wpPluginPhp, path.join(targetPluginDir, 'online-mmj-card.php'));

// Copy dist folder recursively
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir(distDir, path.join(targetPluginDir, 'dist'));

console.log('Successfully created WordPress Plugin package at: /wordpress-release/online-mmj-card');
console.log('You can now:');
console.log('1. Zip the "online-mmj-card" folder into "online-mmj-card.zip"');
console.log('2. In WordPress Admin -> Plugins -> Add New -> Upload Plugin -> Upload the zip file');
console.log('3. Activate the plugin and add shortcode [online_mmj_card] to any page!');
