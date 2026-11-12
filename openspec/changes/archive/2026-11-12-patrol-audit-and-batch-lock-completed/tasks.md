## 1. HTML 結構與使用說明更新 (`index.html`)

- [x] 1.1 在 `index.html` 的 `.control-row` 中新增「巡場盤點」按鈕（`#btn-patrol-audit`），並與 `#btn-batch-complete` 並列於 `.btn-group`
- [x] 1.2 在 `index.html` 新增巡場盤點跨範圍區段結算的三選一確認彈窗（`#patrol-scope-overlay` 與 `#patrol-scope-popup`，包含「取消」、「僅目前區段」、「全部區段」三個按鈕）
- [x] 1.3 更新 `index.html` 的 `#help-view`「七、批量設為已完成」章節（補充已完成桌次鎖定不可選取、反選自動跳過已完成桌次），並新增「巡場盤點」功能操作說明（含點選對戰中桌次完成其餘未完成桌次、維持原狀態、搭配範圍/篩選器分區盤點、跨區段選取時的三選一結算視窗，以及選取 0 桌時的二次確認機制）

## 2. CSS 樣式設計 (`style.css`)

- [x] 2.1 在 `style.css` 新增選取模式下 `.table-card.state-completed` 的鎖定視覺樣式（取消 hover 浮起與邊框變色、設定鎖定游標）
- [x] 2.2 在 `style.css` 新增 `#btn-patrol-audit`（`.btn-filter-patrol`）按鈕樣式、`#tracker-view.patrol-mode` 下專屬的對戰中選取卡片樣式（邊框、背景、右上角標記與 `#selection-count` 顏色），以及跨區段三選一確認彈窗（`#patrol-scope-popup`）樣式

## 3. JS 選取模式鎖定與巡場盤點邏輯 (`app.js`)

- [x] 3.1 在 `app.js` 綁定 `#btn-patrol-audit` 與跨區段確認彈窗相關 DOM 元素，並擴充選取模式狀態（`selectionModeType`: `'complete' | 'patrol'`）以支援進入/退出「批量完成」與「巡場盤點」模式及切換 `.patrol-mode` class
- [x] 3.2 在 `app.js` 鎖定選取模式下的已完成桌次：單點 `.state-completed` 卡片無效、禁止以 `.state-completed` 卡片作為短壓滑動多選起點，並將 `btnSelectInvert`（反選）修改為僅針對目前畫面可見之未完成桌次執行反選
- [x] 3.3 在 `app.js` 更新 `syncCardSelectionDOM()` 與 `updateSelectionBar()`，使其根據 `selectionModeType` 顯示對應的選取標記（`✓` vs. 巡場盤點標記）、計數文字（`已選 N 桌` vs. `對戰中 N 桌`）及「確認」按鈕啟用狀態（巡場盤點模式下只要有可結算之未完成桌次即保持啟用），並在篩選器或範圍標籤切換時同步更新
- [x] 3.4 在 `app.js` 實作 `btnSelectionConfirm` 於「巡場盤點」模式下的差集結算與跨區段彈窗邏輯：
  - 選取 0 桌時彈出 `confirm()` 二次確認視窗，確認後將目前可見範圍內所有未完成桌次標記為 `completed`
  - 選取 > 0 桌且停留在特定 `activeRangeTab`、同時 `selectedTables` 含有其他區段桌次時，開啟 `#patrol-scope-popup` 提供「取消」、「僅目前區段」、「全部區段」三選一結算
  - 將目標範圍內未選取之未完成桌次標記為 `completed`（已選桌次維持原 `active` / `assigned` 狀態），並呼叫 `commitState()` 支援單步 Undo

## 4. PWA 快取版本更新 (`sw.js`)

- [x] 4.1 更新 `sw.js` 中的 `CACHE_NAME` 版本號以確保離線快取更新
