## 1. HTML 結構與說明更新 (`index.html`)

- [x] 1.1 在 `index.html` 的控制列右側 `.btn-group` 中，於 `#btn-copy-remaining`（`📋`）左側新增 `#btn-show-info`（`ℹ️`）按鈕
- [x] 1.2 在 `index.html` 底部新增詳細資訊深色彈窗結構（`#info-detail-overlay`、`#info-detail-popup`、`#btn-info-detail-x`、`#info-detail-content`、`#btn-info-detail-close`）
- [x] 1.3 更新 `index.html` 的 `#help-view` 第九節說明，新增點擊 `ℹ️` 快速查看詳細資訊以及詳細資訊中直播桌獨立顯示之說明
- [x] 1.4 將 `index.html` 引入的 `style.css` 與 `app.js` 版本參數更新為 `?v=26`

## 2. CSS 樣式擴充 (`style.css`)

- [x] 2.1 在 `style.css` 新增 `.btn-filter-info` 按鈕 hover 樣式（青藍色/資訊風格）
- [x] 2.2 在 `style.css` 新增詳細資訊彈窗樣式（`.info-detail-overlay`、`.info-detail-popup`、`.info-detail-title`、`.info-detail-content`、`.btn-info-detail-close`），支援可視高度內自動捲動（`max-height: 80vh` 與 `overflow-y: auto`）

## 3. JavaScript 邏輯更新 (`app.js`)

- [x] 3.1 修改 `app.js` 的 `buildRemainingInfo()` 函式，將未完成桌次拆為直播桌、加時桌、一般桌三組互斥資料；當存在未完成直播桌時於「剩餘加時桌：」上方插入「剩餘直播桌：」區塊
- [x] 3.2 在 `app.js` 綁定 `#btn-show-info` 按鈕點擊事件，呼叫 `buildRemainingInfo()` 並開啟 `#info-detail-popup` 彈窗
- [x] 3.3 在 `app.js` 實作詳細資訊彈窗關閉邏輯（支援點擊 `#btn-info-detail-x`、`#btn-info-detail-close` 與 `#info-detail-overlay` 遮罩關閉）

## 4. Service Worker 與專案文件同步 (`sw.js`, `README.md`)

- [x] 4.1 在 `sw.js` 將快取名稱更新為 `CACHE_NAME = 'ptcg-eor-v26'`
- [x] 4.2 更新 `README.md` 中的「複製與顯示資訊」章節，記錄 `ℹ️` 按鈕與直播桌獨立分組規則
