const fs = require('fs');
const path = require('path');

const walkDir = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(file));
    } else {
      results.push(file);
    }
  });
  return results;
};

const files = walkDir(path.join(__dirname, 'app'));

files.forEach(file => {
  if (file.endsWith('page.tsx')) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('useState') || content.includes('useEffect') || content.includes('motion/')) {
      if (!content.includes('"use client"') && !content.includes("'use client'")) {
        content = '"use client";\n\n' + content;
        fs.writeFileSync(file, content);
        console.log(`Re-added "use client" to ${file}`);
      }
    }
  }
});
