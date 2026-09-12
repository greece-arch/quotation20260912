/**
 * ============================================================================
 * 報價單管理系統 (Quotation Management System) - Node.js 本地端伺服器
 * 
 * 特色：
 * 1. 使用 Node.js 內建原生模組 (http, fs, path, url)，無須強制依賴第三方套件即可啟動。
 * 2. 完整支援 HTML, CSS, JavaScript, 字型與圖檔 MIME 類型解析。
 * 3. 具備目錄遍歷防護 (Path Traversal Protection)。
 * 4. 支援自訂連接埠 (預設 3000)。
 * 
 * 啟動方式：
 *   node server.js
 * ============================================================================
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// 常見檔案類型 MIME 對應表
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.mjs': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf'
};

// 尋找檔案輔助函式 (依序檢查：根目錄、public 目錄、dist 目錄)
function resolveFilePath(reqUrl) {
  let cleanUrl = reqUrl.split('?')[0].split('#')[0];
  if (cleanUrl === '/' || cleanUrl === '') {
    cleanUrl = '/index.html';
  }

  // 解碼 URL 特殊字元並清理路徑
  const decodedPath = decodeURIComponent(cleanUrl);
  const safePath = path.normalize(decodedPath).replace(/^(\.\.[\/\\])+/, '');

  // 優先查找順序：根目錄 -> public 目錄 -> dist 目錄
  const candidatePaths = [
    path.join(__dirname, safePath),
    path.join(__dirname, 'public', safePath),
    path.join(__dirname, 'dist', safePath)
  ];

  for (const candidate of candidatePaths) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }

  // 若為 SPA 路由或找不到，回傳 index.html
  const fallbackIndex = path.join(__dirname, 'index.html');
  if (fs.existsSync(fallbackIndex)) {
    return fallbackIndex;
  }

  return null;
}

// 建立 HTTP 伺服器
const server = http.createServer((req, res) => {
  // 僅允許 GET 與 HEAD 請求
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain; charset=UTF-8' });
    res.end('405 Method Not Allowed');
    return;
  }

  const filePath = resolveFilePath(req.url);

  if (!filePath) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
    res.end(`
      <!DOCTYPE html>
      <html lang="zh-TW">
      <head><meta charset="UTF-8"><title>404 找不到檔案</title></head>
      <body style="font-family: sans-serif; text-align: center; padding: 50px;">
        <h2>404 - 找不到請求的頁面或資源</h2>
        <p>請確認請求路徑是否正確，或返回 <a href="/">系統首頁</a>。</p>
      </body>
      </html>
    `);
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end(`500 內部伺服器讀取錯誤: ${err.message}`);
      return;
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff'
    });

    if (req.method === 'HEAD') {
      res.end();
    } else {
      res.end(data);
    }
  });
});

// 啟動監聽
server.listen(PORT, HOST, () => {
  console.log('\n==================================================');
  console.log('  🏢 鼎盛智慧科技 - 報價單管理系統 (Node.js 伺服器)');
  console.log('==================================================');
  console.log(`  狀態：伺服器已成功啟動！`);
  console.log(`  本機訪問網址：http://localhost:${PORT}/`);
  console.log(`  區域網路網址：http://127.0.0.1:${PORT}/`);
  console.log('  關閉伺服器：請於終端機按下 Ctrl + C');
  console.log('==================================================\n');
});
