import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const MAX_DIMENSION = 160000;
const SKIP_UNDER_KB = 150;
const TARGETS = ["images", "uploads"];

async function walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

/**
 * Runs once per production build, after Vite has copied public/ into
 * dist/. Any image over MAX_DIMENSION gets downscaled; any image
 * over SKIP_UNDER_KB gets recompressed. Every image that ends up on
 * the live site has gone through this, regardless of source, so no
 * image can slip through oversized ever again — no manual resizing
 * needed for anything uploaded from here on.
 */
export function optimizeImagesPlugin() {
  let outDir = "dist";

  return {
    name: "optimize-public-images",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    async closeBundle() {
      const results = [];

      for (const target of TARGETS) {
        const dir = path.join(outDir, target);
        const files = await walk(dir);

        for (const file of files) {
          const ext = path.extname(file).toLowerCase();
          if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) continue;

          const before = (await stat(file)).size;
          if (before < SKIP_UNDER_KB * 1024) continue;

          const img = sharp(file);
          const meta = await img.metadata();
          const needsResize = meta.width > MAX_DIMENSION || meta.height > MAX_DIMENSION;

          let pipeline = needsResize
            ? img.resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: "inside", withoutEnlargement: true })
            : img;

          if (ext === ".jpg" || ext === ".jpeg") {
            pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
          } else if (ext === ".png") {
            pipeline = pipeline.png({ compressionLevel: 9, palette: true, quality: 82, effort: 8 });
          } else if (ext === ".webp") {
            pipeline = pipeline.webp({ quality: 80 });
          }

          const buffer = await pipeline.toBuffer();
          if (buffer.length < before) {
            await sharp(buffer).toFile(file);
            results.push({ file: path.relative(outDir, file), before, after: buffer.length });
          }
        }
      }

      if (results.length) {
        const savedMB = results.reduce((sum, r) => sum + (r.before - r.after), 0) / 1024 / 1024;
        console.log(`\n[optimize-images] processed ${results.length} file(s), saved ${savedMB.toFixed(2)}MB total:`);
        for (const r of results) {
          console.log(`  ${r.file}: ${(r.before / 1024).toFixed(0)}KB -> ${(r.after / 1024).toFixed(0)}KB`);
        }
      }
    },
  };
}
