## 1. HTML 結構

- [x] 1.1 在 `selection-action-bar` 與 `card-grid` 之間新增 `<div id="range-filter-bar" class="range-filter-bar hidden"></div>`

## 2. CSS 樣式

- [x] 2.1 新增 `.range-filter-bar`：`display: flex; flex-wrap: wrap; gap: 6px; padding: 4px 0;`
- [x] 2.2 新增 `.range-tab`：沿用 `.btn-filter` 的外觀（`border-radius: 20px`、字體、邊框），字體略小（`0.72rem`）
- [x] 2.3 新增 `.range-tab.active`：高亮狀態（`border-color`、`color`、`background` 與 `.btn-filter.active` 一致）
- [x] 2.4 `@media (hover: hover)` 包裹 `.range-tab:hover` 樣式，防止觸控裝置殘留高亮

## 3. JS — 核心邏輯

- [x] 3.1 新增 `activeRangeTab = null` UI 狀態變數（頂層，`showOvertimeOnly`/`hideCompleted` 旁邊）
- [x] 3.2 新增 `rangeFilterBar` DOM reference（`document.getElementById('range-filter-bar')`）
- [x] 3.3 實作 `buildRangeTabs(startTable, endTable)` → 回傳 `[{ start, end }, ...]` 陣列，1 段時回傳 `[]`
- [x] 3.4 實作 `renderRangeTabs()` → 計算各段未完成數、建立標籤 DOM、綁定 click handler、更新 `rangeFilterBar` 的 hidden 狀態
- [x] 3.5 在 `renderTracker()` 的 `forEach` 篩選條件中加入 `passesRangeFilter`（`activeRangeTab ? table.number >= activeRangeTab.start && table.number <= activeRangeTab.end : true`）
- [x] 3.6 在 `renderTracker()` 末尾呼叫 `renderRangeTabs()`，確保每次狀態變更後標籤數字即時更新
- [x] 3.7 在 `resetAndReturnToSetup()` 中將 `activeRangeTab` 重設為 `null`

## 4. 說明頁面

- [x] 4.1 檢視說明頁面現有內容，針對範圍篩選標籤新功能新增適當說明
