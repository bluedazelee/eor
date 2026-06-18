## Why

大型賽事桌次可達 200 桌，即使搭配縮放功能也難以快速定位特定區段。裁判在實務上通常只負責某一區段（如 101–150 桌），但目前只能捲動或逐一搜尋。新增範圍篩選標籤列，讓裁判可以一鍵聚焦在特定桌次區段，大幅提升大型賽事的操作效率。

## What Changes

- **新增範圍篩選標籤列**（`range-filter-bar`）：位於 control-row 與 card-grid 之間，在正常模式與批量模式皆可見
- **自動產生分段標籤**：依 `startTable`/`endTable` 計算，算法為 `segmentSize = max(25, ceil(total/4))`；若只有 1 段（total ≤ 25）則不顯示標籤列
- **標籤格式**：`起-訖(未完成數)`，其中未完成 = `state !== 'completed'`（active + assigned）；「全部」標籤顯示全域未完成桌數
- **複合篩選**：`activeRangeTab` 與現有 `showOvertimeOnly`、`hideCompleted` 以 AND 邏輯複合套用
- **暫態狀態**：`activeRangeTab` 不持久化至 localStorage；開始新輪次時自動重設為「全部」
- **標籤上的未完成數即時更新**：每次 `renderTracker()` 時重新計算並更新各標籤顯示

## Capabilities

### New Capabilities

- `range-filter-tabs`：範圍篩選標籤自動分段邏輯、複合篩選、即時未完成桌數顯示

### Modified Capabilities

（無）

## Impact

- `index.html`：新增 `range-filter-bar` 容器（動態內容由 JS 產生）
- `app.js`：新增 `activeRangeTab` 狀態、`buildRangeTabs()` 產生函式、`renderRangeTabs()` 渲染函式、`renderTracker()` 加入第三個篩選條件
- `style.css`：新增標籤列與標籤的樣式
- `sw.js`：不涉及快取資源變更，無需更新版本號
