## 1. 建立圖示生成工具

- [x] 1.1 新增 `tools/generate-icons.html`：建立 Canvas 生成腳本骨架（HTML 結構、頁面樣式、下載按鈕）
- [x] 1.2 實作六邊形繪製函式：以水平六邊形路徑、主色 `#4f46e5`、邊框 `#7c3aed` 在 32×32 Canvas 繪製外形
- [x] 1.3 實作格線紋理繪製：每 4px 繪製橫向與縱向格線（色值 `#6366f1`，透明度 60%），限制在六邊形內
- [x] 1.4 定義像素字型矩陣（E、o、R 三個字元的 5×7 布林陣列）並實作像素文字繪製函式
- [x] 1.5 實作整數倍 nearest-neighbor 縮放函式，支援輸出 32×32、192×192、512×512
- [x] 1.6 實作下載功能：Canvas 轉 PNG Blob，觸發三個尺寸的下載

## 2. 生成並提交圖示資產

- [x] 2.1 在瀏覽器開啟 `tools/generate-icons.html`，驗證預覽效果（六邊形、格線、EoR 文字均正確顯示）
- [x] 2.2 下載三個 PNG，覆蓋 `icons/icon-192.png`、`icons/icon-512.png`，新增 `icons/icon-32.png`

## 3. 更新 HTML 與 Manifest

- [x] 3.1 更新 `index.html`：將 `<link rel="icon">` 的 href 改為 `icons/icon-32.png`（尺寸 32×32）
- [x] 3.2 更新 `manifest.json`：新增 32×32 icon entry（`src: "icons/icon-32.png"`, `sizes: "32x32"`, `purpose: "any"`）

## 4. 更新 Service Worker 快取版本

- [x] 4.1 更新 `sw.js` 中的 `CACHE_NAME` 常數（版本號 bump），確保使用者下次開啟時取得新圖示
