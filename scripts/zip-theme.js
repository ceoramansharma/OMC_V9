import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const sourceDir = path.join(rootDir, 'wordpress-theme', 'online-mmj-card');
const outputZipRoot = path.join(rootDir, 'online-mmj-card-theme.zip');
const outputZipEditable = path.join(rootDir, 'theme-editable.zip');
const publicDir = path.join(rootDir, 'public');
const outputZipPublic = path.join(publicDir, 'online-mmj-card-theme.zip');
const outputZipEditablePublic = path.join(publicDir, 'theme-editable.zip');

if (!fs.existsSync(sourceDir)) {
  console.error(`Source directory ${sourceDir} does not exist. Run "npm run build:theme" first.`);
  process.exit(1);
}

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

function collectFiles(dir, base = '') {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    const fullPath = path.join(dir, item.name);
    const relPath = base ? `${base}/${item.name}` : item.name;
    if (item.isDirectory()) {
      results = results.concat(collectFiles(fullPath, relPath));
    } else {
      results.push({ fullPath, relPath: `online-mmj-card/${relPath}` });
    }
  }
  return results;
}

function createZip(files, outputPath) {
  const localHeaders = [];
  const centralHeaders = [];
  let currentOffset = 0;

  for (const file of files) {
    const uncompressedData = fs.readFileSync(file.fullPath);
    const compressedData = zlib.deflateRawSync(uncompressedData);
    const crc = zlib.crc32(uncompressedData);
    const nameBuf = Buffer.from(file.relPath, 'utf8');

    // Local file header (30 bytes + name)
    const localHeader = Buffer.alloc(30 + nameBuf.length);
    localHeader.writeUInt32LE(0x04034b50, 0); // Local header signature
    localHeader.writeUInt16LE(20, 4);         // Version needed: 2.0
    localHeader.writeUInt16LE(0, 6);          // Flags: 0
    localHeader.writeUInt16LE(8, 8);          // Compression: Deflate (8)
    localHeader.writeUInt16LE(0, 10);         // Mod time
    localHeader.writeUInt16LE(0, 12);         // Mod date
    localHeader.writeUInt32LE(crc, 14);       // CRC32
    localHeader.writeUInt32LE(compressedData.length, 18); // Compressed size
    localHeader.writeUInt32LE(uncompressedData.length, 22); // Uncompressed size
    localHeader.writeUInt16LE(nameBuf.length, 26); // Name length
    localHeader.writeUInt16LE(0, 28);         // Extra field length
    nameBuf.copy(localHeader, 30);

    // Central directory header (46 bytes + name)
    const centralHeader = Buffer.alloc(46 + nameBuf.length);
    centralHeader.writeUInt32LE(0x02014b50, 0); // Central header signature
    centralHeader.writeUInt16LE(20, 4);          // Version made by
    centralHeader.writeUInt16LE(20, 6);          // Version needed
    centralHeader.writeUInt16LE(0, 8);           // Flags
    centralHeader.writeUInt16LE(8, 10);          // Compression
    centralHeader.writeUInt16LE(0, 12);          // Mod time
    centralHeader.writeUInt16LE(0, 14);          // Mod date
    centralHeader.writeUInt32LE(crc, 16);        // CRC32
    centralHeader.writeUInt32LE(compressedData.length, 20); // Compressed size
    centralHeader.writeUInt32LE(uncompressedData.length, 24); // Uncompressed size
    centralHeader.writeUInt16LE(nameBuf.length, 28); // Name length
    centralHeader.writeUInt16LE(0, 30);          // Extra field len
    centralHeader.writeUInt16LE(0, 32);          // Comment len
    centralHeader.writeUInt16LE(0, 34);          // Disk start
    centralHeader.writeUInt16LE(0, 36);          // Internal attrs
    centralHeader.writeUInt32LE(0, 38);          // External attrs
    centralHeader.writeUInt32LE(currentOffset, 42); // Relative offset of local header
    nameBuf.copy(centralHeader, 46);

    localHeaders.push(localHeader, compressedData);
    centralHeaders.push(centralHeader);

    currentOffset += localHeader.length + compressedData.length;
  }

  const centralDirOffset = currentOffset;
  const centralDirSize = centralHeaders.reduce((acc, b) => acc + b.length, 0);

  // End of Central Directory record (22 bytes)
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0); // EOCD signature
  eocd.writeUInt16LE(0, 4);          // Disk number
  eocd.writeUInt16LE(0, 6);          // Start disk
  eocd.writeUInt16LE(files.length, 8); // Entries on this disk
  eocd.writeUInt16LE(files.length, 10); // Total entries
  eocd.writeUInt32LE(centralDirSize, 12); // Central dir size
  eocd.writeUInt32LE(centralDirOffset, 16); // Central dir offset
  eocd.writeUInt16LE(0, 20);         // Comment length

  const allBuffers = Buffer.concat([...localHeaders, ...centralHeaders, eocd]);
  fs.writeFileSync(outputPath, allBuffers);
  return allBuffers.length;
}

console.log('Collecting theme files from:', sourceDir);
const files = collectFiles(sourceDir);
console.log(`Found ${files.length} theme files to zip:`);
files.forEach((f) => console.log(' - ' + f.relPath));

const totalBytes = createZip(files, outputZipRoot);
const sizeInMB = (totalBytes / 1024 / 1024).toFixed(2);

// Also create theme-editable.zip
fs.copyFileSync(outputZipRoot, outputZipEditable);
fs.copyFileSync(outputZipRoot, outputZipPublic);
fs.copyFileSync(outputZipRoot, outputZipEditablePublic);

console.log(`\n========================================================================`);
console.log(`SUCCESS: Page Builder & SEO Editable WordPress Theme ZIP created!`);
console.log(`Output Files:`);
console.log(` 1. ${outputZipRoot} (${sizeInMB} MB) -> URL: /online-mmj-card-theme.zip`);
console.log(` 2. ${outputZipEditable} (${sizeInMB} MB) -> URL: /theme-editable.zip`);
console.log(`========================================================================\n`);
