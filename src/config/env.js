const fs = require('fs');
const path = require('path');

function loadEnv(filePath = '.env') {
  const fullPath = path.resolve(process.cwd(), filePath);

  if (!fs.existsSync(fullPath)) {
    console.warn(`Arquivo ${filePath} não encontrado, seguindo apenas com process.env`);
    return;
  }

  const content = fs.readFileSync(fullPath, 'utf-8');

  content.split(/\r?\n/).forEach(line => {
    if (!line || line.trim().startsWith('#')) return;

    const [key, ...rest] = line.split('=');
    const value = rest.join('=')?.trim();

    if (key && value && !process.env[key]) {
      const cleanedValue = value.replace(/^['"]|['"]$/g, '');
      process.env[key.trim()] = cleanedValue;
    }
  });
}

module.exports = loadEnv;