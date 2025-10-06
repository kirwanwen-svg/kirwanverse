import { promises as fs } from 'fs';
import path from 'path';

const SOURCE_ROOT = "/Users/kirwan/Desktop/NONETONE(kk)/26SS";
const DEST_ROOT = "/Users/kirwan/Desktop/coding/public/assets/26SS";
const DATA_FILE = "/Users/kirwan/Desktop/coding/src/data/localData.ts";

const validExts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function copyFolder(srcDir, destDir, categoryName) {
  const entries = await fs.readdir(srcDir, { withFileTypes: true });
  const items = [];

  await ensureDir(destDir);

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue; // skip hidden
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      const sub = await copyFolder(srcPath, destPath, categoryName);
      items.push(...sub);
    } else if (validExts.has(path.extname(entry.name).toLowerCase())) {
      await fs.copyFile(srcPath, destPath);
      items.push({
        id: path.relative(DEST_ROOT, destPath).replace(/\W+/g, '_'),
        title: path.parse(entry.name).name,
        description: `${categoryName} | Imported asset`,
        imageUrl: `/assets/26SS/${path.relative(DEST_ROOT, destPath).split(path.sep).join('/')}`,
        category: categoryName,
        tags: [categoryName, '26SS'],
        colorPalette: ['#000000', '#FFFFFF'],
        style: 'look',
        season: 'all-season',
        createdAt: new Date(),
        likes: 0,
        downloads: 0,
      });
    }
  }

  return items;
}

async function main() {
  const topFolders = await fs.readdir(SOURCE_ROOT, { withFileTypes: true });
  const allItems = [];

  for (const folder of topFolders) {
    if (!folder.isDirectory()) continue;
    if (folder.name.startsWith('.')) continue;

    const category = folder.name; // e.g., 1fashion
    const src = path.join(SOURCE_ROOT, folder.name);
    const dest = path.join(DEST_ROOT, folder.name);

    const items = await copyFolder(src, dest, 'streetwear');
    allItems.push(...items);
  }

  const ts = `import { FashionItem } from '../types';\n\nexport const localFashionItems: FashionItem[] = [\n${allItems.map(it => `  {\n    id: ${JSON.stringify(it.id)},\n    title: ${JSON.stringify(it.title)},\n    description: ${JSON.stringify(it.description)},\n    imageUrl: ${JSON.stringify(it.imageUrl)},\n    category: 'streetwear',\n    tags: ${JSON.stringify(it.tags)},\n    colorPalette: ${JSON.stringify(it.colorPalette)},\n    style: ${JSON.stringify(it.style)},\n    season: ${JSON.stringify(it.season)},\n    createdAt: new Date(${JSON.stringify(new Date().toISOString())}),\n    likes: 0,\n    downloads: 0\n  }`).join(',\n')}\n];\n`;

  await fs.writeFile(DATA_FILE, ts, 'utf8');
  console.log(`Imported ${allItems.length} assets.`);
  console.log(`Data written to ${DATA_FILE}`);
}

main().catch(err => { console.error(err); process.exit(1); });
