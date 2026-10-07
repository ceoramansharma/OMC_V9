import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateSitemapXml, getSitemapStats } from '../src/utils/sitemapGenerator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const sitemapPath = path.join(publicDir, 'sitemap.xml');

console.log('Generating dynamic XML sitemap with primary keyword priority...');
const xml = generateSitemapXml('https://onlinemmjcard.com');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(sitemapPath, xml, 'utf8');

const stats = getSitemapStats('https://onlinemmjcard.com');
console.log(`Successfully generated dynamic sitemap at ${sitemapPath}`);
console.log(`Total URLs indexed: ${stats.totalUrls}`);
console.log('Breakdown by category:', stats.byCategory);
