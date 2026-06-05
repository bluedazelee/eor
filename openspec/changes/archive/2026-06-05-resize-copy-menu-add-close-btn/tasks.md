## 1. HTML 結構

- [x] 1.1 在 `index.html` 的 `#copy-menu-popup` 內，三個按鈕之後新增 `<button id="btn-copy-close" class="copy-menu-item copy-menu-close">關閉</button>`

## 2. CSS 樣式

- [x] 2.1 在 `style.css` 修改 `.copy-menu-popup`：`padding` 改為 `14px 16px`、`min-width` 改為 `200px`、`gap` 改為 `10px`、新增 `max-width: calc(100vw - 16px)`
- [x] 2.2 在 `style.css` 修改 `.copy-menu-item`：`font-size` 改為 `0.9rem`
- [x] 2.3 在 `style.css` 新增 `.copy-menu-close` 樣式：`border-top: 1px solid rgba(255,255,255,0.1)`、`margin-top: 2px`、`padding-top` 適當加大、`color` 使用 `var(--text-sub)` 並加 `opacity: 0.6`；hover 時 `opacity: 1`、背景微亮但不使用藍色強調色

## 3. JS 邏輯

- [x] 3.1 在 `app.js` 頂部 DOM reference 區段新增 `const btnCopyClose = document.getElementById('btn-copy-close');`
- [x] 3.2 在 `app.js` 新增 `btnCopyClose` 的 click 事件監聽器：`e.stopPropagation()` 後呼叫 `hideCopyMenu()`

## 4. PWA 快取更新

- [x] 4.1 在 `sw.js` 更新 `CACHE_NAME` 版本號（遞增），確保已安裝的 PWA 使用者取得最新樣式
