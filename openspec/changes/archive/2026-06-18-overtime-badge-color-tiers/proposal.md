## Why

目前所有加時標記（`+N分`）使用統一橘色，在卡片縮小的精簡顯示模式下無法快速區分加時嚴重程度。加入三段顏色編碼後，裁判可以一眼掃描格線，立即識別需要優先處理的高加時桌次，無需逐一閱讀數字。

## What Changes

- 加時標記依 `overtimeMinutes` 分為三個顏色等級：
  - **低（≤ 3 分）**：黃色 — 輕微加時
  - **中（> 3 且 ≤ 6 分）**：橘色（現有顏色）— 中度加時
  - **高（> 6 分）**：紅色 — 嚴重加時
- CSS 新增 `.overtime-badge-low`、`.overtime-badge-mid`、`.overtime-badge-high` 修飾 class
- JS 在產生 badge 時依分鐘數判斷等級，套用對應 class（取代原本固定的單一 class）

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

- `overtime-table-marking`：加時標記新增顏色等級視覺呈現

## Impact

- `style.css`：在 `.overtime-badge` 後新增三個等級的顏色修飾 class
- `app.js`：badge 產生邏輯加入等級判斷，`badge.className` 從固定值改為依等級動態設定
- `sw.js`：不涉及快取資源變更，無需更新版本號
