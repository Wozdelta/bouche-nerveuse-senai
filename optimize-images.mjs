import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

async function optimizeImagesInDir(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await optimizeImagesInDir(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
        const newPath = path.join(dir, `${path.basename(file, ext)}.webp`);
        console.log(`Processing: ${file}...`);
        
        try {
          // Parse image via Sharp
          const image = sharp(fullPath);
          const metadata = await image.metadata();

          // Resize width if > 1920
          if (metadata.width && metadata.width > 1920) {
             image.resize(1920, null, { withoutEnlargement: true });
          }

          // Convert and output to WebP
          await image.webp({ quality: 80, effort: 6 }).toFile(newPath);
          console.log(`[SUCESSO] ${file} -> .webp convertido com tamanho reduzido!`);

          // Remove old file
          fs.unlinkSync(fullPath);
          console.log(`Arquivo estático apagado: ${file}`);
        } catch (error) {
          console.error(`Falha ao converter ${file}:`, error);
        }
      }
    }
  }
}

async function run() {
  console.log('--- Iniciando Otimização Agreciva de Imagens (png/jpg -> webp) ---');
  await optimizeImagesInDir(PUBLIC_DIR);
  console.log('--- Otimização de Assets Finalizada ---');
}

run();
