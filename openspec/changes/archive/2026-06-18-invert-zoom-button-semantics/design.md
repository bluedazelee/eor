## Context

`applyCardSize(size)` 管理三個層級：`'lg'`（每列約 3 桌）、`'md'`（4 桌）、`'sm'`（5 桌）。目前 `atMax = size === 'lg'` 用來 disable `btnZoomIn`（放大），`atMin = size === 'sm'` 用來 disable `btnZoomOut`（縮小）。click handler 中 `btnZoomIn` 往 `lg` 方向走，`btnZoomOut` 往 `sm` 方向走。新語意下完全對調。

## Goals / Non-Goals

**Goals:**
- `+` 語意改為「增加每列桌次」，即往 `sm` 方向走
- `-` 語意改為「減少每列桌次」，即往 `lg` 方向走
- disabled 狀態同步修正

**Non-Goals:**
- 改變三個層級的實際 minmax 值或字體大小
- 改變按鈕圖示（仍使用 `+` / `−`）

## Decisions

### 決策：最小改動原則

只改 handler 方向與 disabled 目標，不動 `applyCardSize()` 的核心邏輯（size class 套用）：

```js
// 修改前
btnZoomIn  → sm→md→lg（放大）；atMax(lg) disabled ZoomIn
btnZoomOut → lg→md→sm（縮小）；atMin(sm) disabled ZoomOut

// 修改後
btnZoomIn  → lg→md→sm（增加每列）；atMin(sm) disabled ZoomIn
btnZoomOut → sm→md→lg（減少每列）；atMax(lg) disabled ZoomOut
```

`applyCardSize()` 中只需把 disabled 的目標按鈕對調：

```js
btnZoomIn.classList.toggle('disabled', atMin);   // 修改後：最多列時 + disabled
btnZoomOut.classList.toggle('disabled', atMax);  // 修改後：最少列時 - disabled
```

## Risks / Trade-offs

- **[Risk] 使用者習慣改變**：若現有使用者已熟悉舊語意，需要重新適應。但新語意更符合直覺，風險低。
- **[Risk] 無** — 純邏輯對調，無資料遷移或 localStorage 格式變更（size 層級名稱 lg/md/sm 不變）。
