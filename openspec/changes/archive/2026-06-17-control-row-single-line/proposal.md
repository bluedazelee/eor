## Why

Tracker 一般模式的 control-row 目前因 `.left-controls` 使用 `flex-direction: column`，造成復原/重做按鈕顯示在「隱藏已完成」按鈕上方，形成兩列排版。這與同一畫面批次模式的單列操作列在視覺風格上不一致，且額外佔用垂直空間。

## What Changes

- **`.left-controls` 改為橫排**：`flex-direction: column` → `flex-direction: row; align-items: center`，讓 [↩][↪] 與 [隱藏完成] 在同一水平行
- **undo/redo 按鈕高度對齊**：padding 從 `4px 8px` 改為 `5px 8px`，與 `.btn-filter` 及 selection-action-bar 按鈕高度一致
- 純 CSS 修改，不動 HTML 結構

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

- `mobile-layout`：control-row 從雙列改為單列，高度與 selection-action-bar 一致

## Impact

- `style.css`：修改 `.left-controls` 與 `.undo-redo-btns button` 兩條規則
- `sw.js`：版本號 bump（v14 → v15）
