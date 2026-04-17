const fs = require('fs');
const path = require('path');

const pages = [
  'app/vagas/page.tsx',
  'app/bouche-news/page.tsx',
  'app/ouvidoria/page.tsx',
  'app/instagram/page.tsx',
  'app/creditos/page.tsx',
  'app/franquia/page.tsx',
  'app/cadastro/page.tsx',
  'app/login/page.tsx'
];

pages.forEach(pagePath => {
  const fullPath = path.join(__dirname, pagePath);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');

  // Strip use client
  content = content.replace(/"use client";\s*/gi, '');
  content = content.replace(/'use client';\s*/gi, '');

  content = content.replace(/import DrawerMenu.*?;?\n/g, '');
  content = content.replace(/import LoginButton.*?;?\n/g, '');

  // Strip useState if not used elsewhere, but regex might be tricky. Let's try to remove standard NavBar state
  content = content.replace(/const \[isMenuOpen, setIsMenuOpen\] = useState\(false\);\n?/, '');

  // Regex to strip Floating Action Button chunk
  content = content.replace(/\{\/\* Floating Action Button \*\/\}.*?<\/button>\s*/gs, '');

  // Regex to strip DrawerMenu chunk
  content = content.replace(/\{\/\* Side Menu Drawer \*\/\}.*?<\/DrawerMenu>\s*/gs, '');
  content = content.replace(/<DrawerMenu.*?isOpen=\{isMenuOpen\}.*?onClose=\{.*?\}\s*\/?>(<\/DrawerMenu>)?\s*/gs, '');

  // Regex to strip Navbar chunk
  content = content.replace(/\{\/\* Navbar \*\/\}.*?<\/nav>\s*/gs, '');

  // Regex to strip Footer chunk
  content = content.replace(/\{\/\* Footer \*\/\}.*?<\/footer>\s*/gs, '');

  fs.writeFileSync(fullPath, content);
  console.log(`Processed ${pagePath}`);
});
