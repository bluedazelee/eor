## 1. HTML 結構

- [x] 1.1 在 `.dashboard-compact-strip` 內新增 `.compact-filters` div，包含 `#btn-hide-completed-compact`（`data-filter="hide-completed"`）與 `#btn-overtime-filter-compact`（`data-filter="overtime"`）兩個按鈕，各含 `.label-long` / `.label-short` 雙 span
- [x] 1.2 重構 `#selection-action-bar` 內部：移除 `.selection-bar-main` 與 `.selection-bar-shortcuts` 兩層 div，改為直接子元素排列：`#btn-selection-cancel`、`#btn-select-all-incomplete`、`#btn-select-clear`、`#btn-select-invert`、`#selection-count`、`#btn-selection-confirm`
- [x] 1.3 為 `#btn-selection-confirm` 加入雙 span：`.label-long`「確認執行」/ `.label-short`「確認」

## 2. CSS 樣式

- [x] 2.1 新增 `.compact-filters` 樣式（`display: flex; gap: 6px; align-items: center`）；新增 `#btn-hide-completed-compact`、`#btn-overtime-filter-compact` 的 active 狀態樣式（與 `.btn-filter.active` 相同）
- [x] 2.2 修改 `.selection-action-bar`：`flex-direction: row`、`align-items: center`、`padding: 5px 10px`、`gap: 6px`（移除原本的 `flex-direction: column`）
- [x] 2.3 移除 `.selection-bar-main` 與 `.selection-bar-shortcuts` 的 CSS 規則（類別不再使用）
- [x] 2.4 修改 `.selection-count`：加入 `flex: 1; text-align: center`（維持居中，但現在在 row 排版中）
- [x] 2.5 調整 `.btn-sel-cancel`、`.btn-sel-shortcut`、`.btn-sel-confirm` 的 padding 至 `5px 8px` / `5px 10px`，使按鈕高度與 `.btn-filter` 一致

## 3. JS 邏輯

- [x] 3.1 在 app.js 頂部 querySelector 區段新增 `btnHideCompletedCompact`、`btnOvertimeFilterCompact` 的 DOM 參考
- [x] 3.2 新增 `syncCompactFilterState()` 函式：同步 `#btn-hide-completed-compact` 與 `#btn-overtime-filter-compact` 的 `active` class，分別對應 `hideCompleted` 與 `showOvertimeOnly` 的當前值
- [x] 3.3 在 `btnHideCompleted` click handler 末尾呼叫 `syncCompactFilterState()`
- [x] 3.4 在 `btnOvertimeFilter` click handler 末尾呼叫 `syncCompactFilterState()`
- [x] 3.5 為 `btnHideCompletedCompact` 綁定 click：呼叫 `btnHideCompleted.click()`
- [x] 3.6 為 `btnOvertimeFilterCompact` 綁定 click：呼叫 `btnOvertimeFilter.click()`
- [x] 3.7 在 `enterSelectionMode()` 中呼叫 `syncCompactFilterState()`，確保進入批次時 compact 按鈕反映當前篩選狀態

## 4. PWA 快取更新

- [x] 4.1 更新 `sw.js` 快取版本號（`v12` → `v13`）
