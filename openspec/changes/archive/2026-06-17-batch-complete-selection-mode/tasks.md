## 1. HTML — 移除舊批量操作彈窗

- [x] 1.1 從 `index.html` 移除 `#batch-complete-popup` 整個 div（含 header、tabs、range fields、specific fields、preview text、actions）

## 2. HTML — 新增浮動操作列

- [x] 2.1 在 `index.html` tracker-view 的格線上方新增 `#selection-action-bar` div（預設 hidden），包含：取消按鈕（`#btn-selection-cancel`）、已選桌數 span（`#selection-count`）、確認執行按鈕（`#btn-selection-confirm`）
- [x] 2.2 在操作列中新增快捷操作列，包含：全選未完成（`#btn-select-all-incomplete`）、清除全選（`#btn-select-clear`）、反選（`#btn-select-invert`）三個按鈕

## 3. CSS — 浮動操作列樣式

- [x] 3.1 新增 `#selection-action-bar` 的樣式：`position: sticky; top: 0`，背景色與 z-index 確保覆蓋格線，包含主要操作列（取消、計數、確認）與快捷操作列的 flex 佈局
- [x] 3.2 新增已選取桌號卡片的 `.table-card-selected` 樣式：選取覆蓋層（半透明主色背景）與勾勾圖示（`.selection-check` 絕對定位於右上角）

## 4. JS — 移除舊批量操作程式碼

- [x] 4.1 從 `app.js` 移除舊批量操作的 DOM ref 宣告（`batchCompletePopup`、`tabRange`、`tabSpecific`、`batchRangeFields`、`batchSpecificFields`、`batchRangeStart`、`batchRangeEnd`、`batchExclude`、`batchSpecific`、`batchPreviewText`、`btnBatchClose`、`btnBatchCancel`、`btnBatchConfirm`）
- [x] 4.2 從 `app.js` 移除舊批量操作邏輯函式（`parseTableNums`、`calcBatchTargets`、`updateBatchPreview`、`switchBatchTab`、`openBatchPopup`、`closeBatchPopup`、`executeBatchComplete`）及其全部事件監聽器與 `batchMode` 變數

## 5. JS — 新增選取模式 DOM ref

- [x] 5.1 在 `app.js` 模組頂部新增 DOM ref：`selectionActionBar`、`selectionCount`、`btnSelectionCancel`、`btnSelectionConfirm`、`btnSelectAllIncomplete`、`btnSelectClear`、`btnSelectInvert`

## 6. JS — 選取模式核心狀態與函式

- [x] 6.1 新增模組層級變數 `let isSelectionMode = false` 與 `const selectedTables = new Set()`
- [x] 6.2 新增 `enterSelectionMode()` 函式：設 `isSelectionMode = true`、清空 `selectedTables`、顯示 `#selection-action-bar`、呼叫 `updateSelectionBar()`、呼叫 `renderTracker()`
- [x] 6.3 新增 `exitSelectionMode()` 函式：設 `isSelectionMode = false`、清空 `selectedTables`、隱藏 `#selection-action-bar`、呼叫 `renderTracker()`
- [x] 6.4 新增 `updateSelectionBar()` 函式：更新 `#selection-count` 文字為「已選 N 桌」，依 `selectedTables.size === 0` 切換 `#btn-selection-confirm` 的 disabled 狀態

## 7. JS — renderTracker 選取狀態渲染

- [x] 7.1 修改 `app.js` 的 `renderTracker()` 中桌號卡片渲染邏輯：在 `isSelectionMode` 為 true 時，對 `selectedTables` 中的桌號加入 `table-card-selected` class 並插入 `<span class="selection-check">✓</span>` 覆蓋層

## 8. JS — 卡片點擊與長按的選取模式處理

- [x] 8.1 修改 `app.js` 中卡片的 click 事件處理器：在最頂端加入 `if (isSelectionMode)` 判斷，執行 toggle `selectedTables`、呼叫 `updateSelectionBar()`、更新該卡片的 `table-card-selected` class，然後 return（不執行原有狀態循環）
- [x] 8.2 修改 `app.js` 中卡片的 longpress（pointerdown/pointerup）事件處理器：在最頂端加入 `if (isSelectionMode) return` 防止開啟加時彈窗

## 9. JS — 快捷操作與確認執行事件監聽器

- [x] 9.1 新增 `#btn-batch-complete` click 監聽器：呼叫 `enterSelectionMode()`（取代舊的 `openBatchPopup()`）
- [x] 9.2 新增 `#btn-selection-cancel` click 監聽器：呼叫 `exitSelectionMode()`
- [x] 9.3 新增 `#btn-selection-confirm` click 監聽器：呼叫 `commitState()`，將 `selectedTables` 中的桌次狀態設為 `'completed'`，呼叫 `saveState()`、`renderTracker()`、`exitSelectionMode()`
- [x] 9.4 新增 `#btn-select-all-incomplete` click 監聽器：將格線中所有可見且狀態非 `'completed'` 的桌次加入 `selectedTables`，呼叫 `updateSelectionBar()`、`renderTracker()`
- [x] 9.5 新增 `#btn-select-clear` click 監聽器：清空 `selectedTables`，呼叫 `updateSelectionBar()`、`renderTracker()`
- [x] 9.6 新增 `#btn-select-invert` click 監聽器：對格線中可見桌次執行反選，呼叫 `updateSelectionBar()`、`renderTracker()`

## 10. HTML — 更新使用說明

- [x] 10.1 更新 `index.html` 使用說明第七節「批量設為已完成」的內容，反映選取模式操作流程（取代舊的「範圍排除」與「指定桌號」說明）
