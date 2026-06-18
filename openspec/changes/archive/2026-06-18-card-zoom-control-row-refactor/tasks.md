## 1. HTML 結構重構

- [x] 1.1 移除 control-row 內的 `.left-controls` 與 `.filter-btns` 分組 div，所有按鈕改為 `.control-row` 的直接子元素
- [x] 1.2 移除 `<div class="filter-break"></div>` 元素
- [x] 1.3 依新順序排列按鈕 DOM：`[undo-redo-btns]` → `[zoom-btns]` → `[btn-batch-complete]` → `[btn-hide-completed]` → `[btn-overtime-filter]` → `[btn-copy-remaining]` → `[btn-search-toggle]`
- [x] 1.4 新增 `.zoom-btns` 容器，內含 `btn-zoom-in`（`+`）與 `btn-zoom-out`（`-`）按鈕
- [x] 1.5 移除所有按鈕的 `<span class="label-long">` / `<span class="label-short">` 結構，改為固定短標籤文字（批量完成、隱藏完成、只顯示加時）
- [x] 1.6 將複製按鈕（`btn-copy-remaining`）文字改為 📋

## 2. CSS 樣式

- [x] 2.1 重寫 `.control-row` 為 `display: flex; flex-wrap: wrap; gap: 8px; align-items: center`，移除 `justify-content: space-between`
- [x] 2.2 刪除 `.left-controls`、`.left-controls.stacked`、`.filter-btns`、`.filter-break` 及 `@media (max-width: 480px)` 中的 `.filter-break` 規則
- [x] 2.3 刪除 `.label-short { display: none }` 及 `@media (max-width: 480px)` 中的 `.label-long` / `.label-short` 規則
- [x] 2.4 新增 `.zoom-btns` 容器樣式（沿用 `.undo-redo-btns` 的 flex + gap 結構）
- [x] 2.5 新增 `#btn-zoom-in` / `#btn-zoom-out` 按鈕樣式（沿用 `.undo-redo-btns button` 圓角邊框風格）
- [x] 2.6 新增 `.card-grid.size-md` 尺寸規則：`minmax(75px, 1fr)`，`.num` 字體 1.3rem，`.status-txt` / `.time-stamp` `display: none`
- [x] 2.7 新增 `.card-grid.size-sm` 尺寸規則：`minmax(60px, 1fr)`，`.num` 字體 1.0rem，`.status-txt` / `.time-stamp` `display: none`，`.table-card` padding 縮減至 6px
- [x] 2.8 刪除 `@media (max-width: 480px)` 中的 `.card-grid { grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)) }` 覆寫規則

## 3. JS 邏輯

- [x] 3.1 新增 `CARD_SIZE_KEY = 'ptcg_eor_card_size'` 常數與 `btnZoomIn` / `btnZoomOut` DOM reference
- [x] 3.2 實作 `applyCardSize(size)` 函式：接受 `'lg'|'md'|'sm'`，切換 `cardGrid` 的 class，更新兩顆按鈕的 disabled 狀態，並寫入 localStorage
- [x] 3.3 app 啟動時讀取 localStorage 並呼叫 `applyCardSize()`（預設 `'lg'`）
- [x] 3.4 `btnZoomIn` click handler：當前 size 為 `'sm'` 升至 `'md'`，為 `'md'` 升至 `'lg'`
- [x] 3.5 `btnZoomOut` click handler：當前 size 為 `'lg'` 降至 `'md'`，為 `'md'` 降至 `'sm'`

## 4. 說明頁面

- [x] 4.1 更新 help-view 中「按鈕列」相關說明，新增縮放按鈕說明，移除已不存在的長標籤描述
