## 1. HTML 結構

- [x] 1.1 在 `index.html` 將 `<div id="overtime-popup-title" class="overtime-popup-title">設定加時（分鐘）</div>` 改為 flex row 結構：標題文字以 `<span>` 包裝，並在同層新增 `<button id="btn-overtime-close" class="btn-overtime-close">✕</button>`

## 2. CSS 樣式

- [x] 2.1 在 `style.css` 修改 `.overtime-popup-title`：新增 `display: flex`、`justify-content: space-between`、`align-items: center`
- [x] 2.2 在 `style.css` 新增 `.btn-overtime-close` 樣式：無背景、無邊框、`color: var(--text-sub)`、`opacity: 0.6`、`cursor: pointer`、`font-size: 1rem`、`padding: 0`、`line-height: 1`；hover 時 `opacity: 1`

## 3. JS 邏輯

- [x] 3.1 在 `app.js` 頂部 DOM reference 區段新增 `const btnOvertimeClose = document.getElementById('btn-overtime-close');`
- [x] 3.2 在 `app.js` 新增 `btnOvertimeClose` 的 click 事件監聽器：`e.stopPropagation()` 後呼叫 `closeOvertimePopup()`

## 4. PWA 快取更新

- [x] 4.1 在 `sw.js` 更新 `CACHE_NAME` 版本號（遞增）
