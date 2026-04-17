import fs from 'fs';
import path from 'path';

const dirs = [path.join(process.cwd(), 'app'), path.join(process.cwd(), 'components')];

function updateRefs(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      updateRefs(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // We only want to replace image extensions that are in strings or prop values
      // We'll replace .png, .jpg, .jpeg with .webp
      const newContent = content
        .replace(/\.png/g, '.webp')
        .replace(/\.jpg/g, '.webp')
        .replace(/\.jpeg/g, '.webp');

      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Updated refs in ${fullPath}`);
      }
    }
  }
}

dirs.forEach(updateRefs);
console.log("Refs updated!");
