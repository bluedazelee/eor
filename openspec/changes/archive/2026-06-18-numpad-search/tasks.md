## 1. HTML 結構

- [x] 1.1 移除 `<div class="table-search-bar">` 區塊（含 `#table-search-input` 與 `#table-search-msg`）
- [x] 1.2 新增 `search-numpad-popup` 彈窗 HTML：包含遮罩層、顯示區（`#search-numpad-display`）、錯誤訊息區（`#search-numpad-msg`）、數字按鈕格（1–9、⌫、0、關閉）

## 2. CSS 樣式

- [x] 2.1 移除 `.table-search-bar`、`#table-search-input`、`#table-search-input:focus`、`#table-search-input::placeholder`、`#table-search-input.search-error`、`.table-search-msg` 相關樣式
- [x] 2.2 新增 `.search-numpad-overlay`：全螢幕遮罩（`position: fixed; inset: 0`），點擊觸發關閉
- [x] 2.3 新增 `.search-numpad-popup`：置中固定彈窗，樣式與加時彈窗一致（`position: fixed; top/left: 50%; transform: translate(-50%, -50%)`）
- [x] 2.4 新增 `.search-numpad-display`：輸入顯示區樣式（背景、字體、圓角）
- [x] 2.5 新增 `.numpad-grid`：3 欄 grid 佈局
- [x] 2.6 新增 `.numpad-btn`：數字按鈕基礎樣式；`.numpad-btn.action`：退格/關閉按鈕的區別樣式；`@media (hover: hover)` 包裹 hover 樣式

## 3. JS 邏輯

- [x] 3.1 移除 `tableSearchInput`、`tableSearchMsg`、`tableSearchBar` DOM reference
- [x] 3.2 新增 `searchNumpadPopup`、`searchNumpadOverlay`、`searchNumpadDisplay`、`searchNumpadMsg` DOM reference
- [x] 3.3 新增 `searchBuffer = ''` 與 `isSearchNumpadOpen = false` 頂層狀態變數
- [x] 3.4 重構 `openSearchBar()` → `openSearchNumpad()`：顯示彈窗、重設 buffer、清除訊息、設 `isSearchNumpadOpen = true`
- [x] 3.5 重構 `closeSearchBar()` → `closeSearchNumpad()`：隱藏彈窗、清空 buffer、清除高亮、設 `isSearchNumpadOpen = false`
- [x] 3.6 更新 `handleTableSearch()` 改為操作 `searchNumpadDisplay`/`searchNumpadMsg` 而非 `tableSearchInput`
- [x] 3.7 新增數字按鈕 click handler：更新 buffer（最多 3 位）→ 呼叫 `handleTableSearch(searchBuffer)`
- [x] 3.8 新增 ⌫ 退格 handler：`searchBuffer = searchBuffer.slice(0,-1)` → 呼叫 `handleTableSearch(searchBuffer)` 或清除
- [x] 3.9 新增關閉按鈕與遮罩層 click handler → 呼叫 `closeSearchNumpad()`
- [x] 3.10 更新 `btnSearchToggle` click handler 呼叫新函式
- [x] 3.11 更新 `enterSelectionMode()` 改呼叫 `closeSearchNumpad()`
- [x] 3.12 更新 `renderTracker()` 末尾的重新高亮邏輯：改為 `if (isSearchNumpadOpen && searchBuffer) handleTableSearch(searchBuffer)`
- [x] 3.13 移除 `tableSearchInput.addEventListener('input', ...)` 事件綁定
