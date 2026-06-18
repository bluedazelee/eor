## Why

目前 `+` 按鈕代表「放大卡片」（每列桌次變少），`-` 代表「縮小卡片」（每列桌次變多）。這樣的語意對使用者而言較不直觀——使用工具的主要動機是「查看更多桌次」或「查看更少桌次」，而非調整卡片大小本身。將語意改為「增減每列桌次數量」後，`+` 表示每列多放一個等級的桌次（更密集），`-` 表示每列少放（更稀疏），與使用者的操作意圖更為吻合。按鈕邏輯因此需要對調。

## What Changes

- **`+` 按鈕邏輯反轉**：原為「增大卡片」（lg → md → sm 的反方向），改為「增加每列桌次」（lg → md → sm）
- **`-` 按鈕邏輯反轉**：原為「縮小卡片」（lg → md → sm），改為「減少每列桌次」（lg → md → sm 的反方向）
- **disabled 狀態對調**：原預設大尺寸（lg）時 `+` disabled；新語意下 lg 已是最少每列，`-` 應 disabled
- **HTML 初始 disabled 狀態更新**：`btn-zoom-in` / `btn-zoom-in-compact` 移除 `disabled` class；`btn-zoom-out` / `btn-zoom-out-compact` 加上 `disabled` class
- **tooltip 文字更新**：`title` 屬性從「放大/縮小卡片」改為「增加/減少每列桌次」

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

- `card-zoom`：卡片縮放按鈕語意從「卡片大小」改為「每列桌次數量」，`+` 增加每列桌次（卡片變小），`-` 減少每列桌次（卡片變大）

## Impact

- `index.html`：調整 `btn-zoom-in` / `btn-zoom-out` / `btn-zoom-in-compact` / `btn-zoom-out-compact` 的初始 `disabled` class 與 `title` 屬性
- `app.js`：對調 `btnZoomIn`/`btnZoomInCompact` 與 `btnZoomOut`/`btnZoomOutCompact` 的 click handler 邏輯；對調 `applyCardSize()` 中 `atMax`/`atMin` 的 disabled 目標按鈕
- `sw.js`：不涉及快取資源變更，無需更新版本號
