## Why

批次選取模式的操作列目前將「已選 N 桌」計數夾在按鈕群中間，視覺重心分散，且計數資訊與操作按鈕語意上屬於不同層次。將計數移至上方 compact-strip 資訊列，可使操作列回歸純粹的動作區域，版面更清晰。

## What Changes

- **`#selection-count` 移至 compact-strip**：「已選 N 桌」從 `#selection-action-bar` 中移出，改置於 `.dashboard-compact-strip` 的右側（篩選按鈕左方）
- **action-bar 移除計數佔位**：`selection-action-bar` 不再有 `flex:1` 的計數 span，按鈕群左對齊緊排，「確認」按鈕靠右
- **compact-strip 排版調整**：左側 `R1・12/50`，中間 `已選 N 桌`，右側 `[隱藏完成] [只顯示加時]`

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

- `batch-complete`：「浮動操作列顯示」需求中的「已選桌數」位置從 action-bar 改至 compact-strip

## Impact

- `index.html`：`#selection-count` 元素移至 `.dashboard-compact-strip` 內
- `style.css`：compact-strip 加入 `#selection-count` 樣式；`selection-action-bar` 移除 flex:1 中間佔位；確認按鈕改為 `margin-left: auto` 靠右
- `app.js`：`updateSelectionBar()` 中 `selectionCount` DOM 參考目標不變（id 不動），無需修改邏輯
- `sw.js`：需更新版本號
