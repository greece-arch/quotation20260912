# 報價單管理系統 (Quotation Management System) - 本地端 Node.js / Vite 單機測試指南

本專案為鼎盛智慧科技純前端無框架（HTML5 / CSS3 / JavaScript / Bootstrap 5 / Font Awesome 6）之專業報價單管理系統，具備完整 RWD 響應式佈局、離線 LocalStorage 資料保存與紙本/A4 列印功能。

本專案支援兩種單機執行模式：
1. **Node.js 原生模式**：直接執行 `node server.js`，完全零額外套件依賴，下載即可秒速啟動！
2. **Vite 開發模式**：使用 `npm run dev` 進行現代化熱更新開發除錯。

---

## 快速開始：Node.js 原生單機測試（最推薦、最簡單）

### 步驟 1：確認電腦已安裝 Node.js
只要您的電腦有安裝 Node.js（v16、v18、v20、v22 皆可）：
```bash
node -v
```

### 步驟 2：直接啟動 Node.js 伺服器
**完全不需要執行 `npm install`！** 在專案根目錄開啟終端機（Terminal、CMD 或 PowerShell），直接執行：
```bash
node server.js
```
或使用 npm 指令：
```bash
npm run serve
```

### 步驟 3：開始測試
終端機會顯示：
```text
==================================================
  🏢 鼎盛智慧科技 - 報價單管理系統 (Node.js 伺服器)
==================================================
  狀態：伺服器已成功啟動！
  本機訪問網址：http://localhost:3000/
  區域網路網址：http://127.0.0.1:${PORT}/
  關閉伺服器：請於終端機按下 Ctrl + C
==================================================
```
此時開啟瀏覽器前往：**`http://localhost:3000/`** 即可立即開始單機測試！

---

## 模式二：使用 Vite 開發伺服器

若您需要使用 Vite 工具鏈進行前端模組化開發或熱重載：

```bash
# 1. 安裝相依套件
npm install

# 2. 啟動 Vite 開發伺服器
npm run dev

# 3. 生產環境打包 (編譯至 dist 目錄)
npm run build
```

---

## 常用指令列表 (NPM Scripts)

| 指令 | 說明 |
| :--- | :--- |
| `node server.js` | **Node.js 直接啟動伺服器（免裝相依套件，最推薦）** |
| `npm run serve` | 透過 npm 呼叫 Node.js 伺服器 (`node server.js`) |
| `npm run dev` | 啟動 Vite 開發伺服器（支援熱更新） |
| `npm run build` | 執行正式生產打包，輸出至 `dist/` 資料夾 |
| `npm run preview` | 本地預覽生產打包後（`dist/`）的成果 |
| `npm run lint` | 執行程式碼檢查 |

---

## 檔案結構說明

```text
├── server.js            # Node.js 原生 HTTP 靜態伺服器 (免套件、支援所有 MIME 與路徑防呆)
├── index.html           # 系統主入口頁面 (包含客戶、廠商、產品、報價單與總覽儀表板結構)
├── css/
│   ├── bootstrap.min.css # Bootstrap 5 本地核心樣式庫 (無須外網 CDN)
│   ├── all.min.css       # Font Awesome 6 本地圖示字型庫
│   └── style.css         # 專案自訂樣式、RWD 響應式微調與列印排版樣式
├── js/
│   ├── bootstrap.bundle.min.js # Bootstrap 5 互動元件函式庫
│   └── script.js         # 純原生 JavaScript 系統核心業務邏輯與 LocalStorage 資料倉儲
├── public/              # 靜態資源公開目錄
├── package.json         # 專案設定檔與啟動腳本
├── vite.config.ts       # Vite 組態設定檔
└── README.md            # 本機測試與操作手冊
```

---

## 單機測試特點與功能驗證項目

1. **零網路依賴（完全本地端資源）**：
   - CSS 與 JS、Font Awesome 字型圖示皆放置於本地端目錄引入，即使完全斷網（離線狀態）依然可順暢運作。
2. **免資料庫安裝**：
   - 資料自動持久化於瀏覽器的 `localStorage` 中，重新整理網頁資料依然留存。
   - 若要重新體驗初始示範資料，可隨時點擊右上角「**重設示範資料**」按鈕一鍵還原。
3. **列印功能測試**：
   - 點擊任一報價單的「**列印**」按鈕，即可開啟正式 A4 規格報價單預覽，並可直接呼叫印表機或另存為 PDF。
4. **RWD 行動版測試**：
   - 按 `F12` 開啟瀏覽器開發者工具，切換至手機（如 iPhone、Pixel）或平板視角，測試卡片式響應設計。
