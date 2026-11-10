## 1. HTML 結構與說明更新 (`index.html`)

- [x] 1.1 在 `index.html` 的 `#help-view` 第七節「批量設為已完成」中，更新說明項目以涵蓋「短暫按住卡片後滑動可連續選取（或取消選取）區間內同狀態桌次」的操作方式。

## 2. CSS 樣式調整 (`style.css`)

- [x] 2.1 在 `style.css` 中為 `.table-card` 與批次選取模式下的 `#card-grid` 補齊防選字與防長按選單樣式（`-webkit-user-select: none`、`-webkit-touch-callout: none`），並新增滑動選取啟動時的卡片視覺回饋樣式（如 `.table-card-drag-anchor` 或拖曳中狀態）。

## 3. JS 批次滑動多選核心邏輯 (`app.js`)

- [x] 3.1 在 `app.js` 新增卡片選取視覺同步輔助函式（直接更新單一 `.table-card` 的 `.table-card-selected` class 與 `.selection-check` 節點），避免滑動過程中重建整個 `#card-grid` DOM。
- [x] 3.2 在 `app.js` 實作批次模式下的短壓（200ms，移動容許值 10px）啟動滑動選取手勢狀態機，包含記錄初始 `selectedTables` 快照、起點目標動作（勾選/取消勾選）、起點完成狀態分類（非已完成 vs 已完成），以及防止放開後觸發重複單點 `click` 事件。
- [x] 3.3 在 `app.js` 實作滑動過程中的連續可見卡片區間計算、同完成狀態分類過濾（`active` 與 `assigned` 視為同類，`completed` 為另一類）及基於快照的即時預覽回退邏輯，並透過 `{ passive: false }` 的 `touchmove` 鎖定滑選期間的原生捲動。
- [x] 3.4 在 `app.js` 實作滑動選取期間的 `#card-grid` 上下邊緣自動平滑捲動（`requestAnimationFrame`），並在捲動與退出批次模式時妥善清理計時器與動畫迴圈。

## 4. PWA 快取版本更新 (`sw.js`)

- [x] 4.1 在 `sw.js` 中將 `CACHE_NAME` 從 `ptcg-eor-v21` 更新為 `ptcg-eor-v22`。
