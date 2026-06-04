## 1. HTML 結構

- [x] 1.1 在 `index.html` 為 `.overtime-popup-title` 元素加上 id（如 `overtime-popup-title`），以便 JS 動態更新桌號

## 2. CSS 樣式

- [x] 2.1 在 `style.css` 修改 `.overtime-popup`：移除依賴 JS 設定 `left`/`top` 的錨定方式，改為 `top: 50%; left: 50%; transform: translate(-50%, -50%);`（沿用 `.copy-menu-popup` 模式），並新增 `max-width: calc(100vw - 16px)`

## 3. JS 邏輯

- [x] 3.1 在 `app.js` 頂部 DOM 元素區塊新增 `overtimePopupTitle` 的 querySelector
- [x] 3.2 在 `showOvertimePopup()` 移除 `getBoundingClientRect()`、`popupW`、`popupH`、`margin`、`left`/`top` 計算與翻轉裁切整段，以及 `overtimePopup.style.left` / `style.top` 的寫入
- [x] 3.3 在 `showOvertimePopup()` 開啟時將標題文字設為「設定加時 · 桌 {tableNumber}」
- [x] 3.4 移除 `showOvertimePopup()` 不再使用的 `anchorElement` 參數，並更新 `attachLongPress()` 內的呼叫點
- [x] 3.5 手動驗證：於手機（或瀏覽器行動模擬）長按左緣、右緣、中央的桌號圖卡，確認彈出層皆置中且不溢出；驗證 +3/+6/+9、自訂、清除標記、點外部關閉皆正常
