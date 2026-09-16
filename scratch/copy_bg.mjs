import fs from 'fs';
import path from 'path';

const src = 'C:\\Users\\dell\\.gemini\\antigravity-ide\\brain\\d9b9eff5-4538-4cd5-aa20-1bea308758b3\\hedge_front_bg_1789548990699.jpg';
const destDir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}
const dest = path.join(destDir, 'parchment-bg.jpg');
fs.copyFileSync(src, dest);
console.log('Background copied successfully to', dest);
