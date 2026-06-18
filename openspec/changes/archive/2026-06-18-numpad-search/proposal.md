## Why

現有桌號搜尋功能使用 `<input type="number">`，在行動裝置上點擊後會喚起系統鍵盤，導致視口縮小、畫面跳動，中斷操作連續性。以自製數字鍵盤彈窗取代，完全避免系統鍵盤的介入，提供更流暢的行動端操作體驗。

## What Changes

- **移除** `table-search-bar` 區塊（含 `<input type="number">` 與錯誤訊息 `<div>`）
- **新增** 數字鍵盤彈窗（`search-numpad-popup`）：置中固定於畫面（`position: fixed`），風格與加時彈窗一致
  - 輸入顯示區：顯示目前輸入的數字（空時顯示佔位提示「桌號…」）
  - 錯誤訊息區：顯示找不到或被篩選隱藏的提示
  - 3×4 按鈕格：1–9、⌫（退格）、0、關閉
  - 每次按鍵即時更新 `searchBuffer` 並執行搜尋跳轉高亮
  - 關閉按鈕或點彈窗外均可關閉，關閉時清除高亮與 buffer
- **更新** `handleTableSearch()` 改為操作彈窗內的顯示區而非 `input` 元素
- **移除** `renderTracker()` 中重新套用搜尋高亮的邏輯（因改為即時搜尋，re-render 後高亮消失為預期行為）

## Capabilities

### New Capabilities

- `numpad-search`：數字鍵盤彈窗式桌號搜尋

### Modified Capabilities

- `table-search`：搜尋輸入方式從系統 input 改為自製數字鍵盤，行為調整為即時跳轉

## Impact

- `index.html`：移除 `.table-search-bar` 區塊；新增 `search-numpad-popup` 彈窗 HTML
- `style.css`：移除 `.table-search-bar`、`#table-search-input` 等相關樣式；新增彈窗與按鈕樣式
- `app.js`：移除 `tableSearchInput`、`tableSearchMsg`、`tableSearchBar` DOM reference；新增 `searchNumpadPopup`、`searchBuffer`；重構 `openSearchBar`/`closeSearchBar` 為 `openSearchNumpad`/`closeSearchNumpad`；更新 `handleTableSearch()` 與 `enterSelectionMode()` 呼叫點
- `sw.js`：不涉及快取資源變更，無需更新版本號
