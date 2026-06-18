## 1. HTML

- [x] 1.1 將 `btn-zoom-in` 的初始 `class` 移除 `disabled`；將 `btn-zoom-out` 加上 `disabled` class
- [x] 1.2 將 `btn-zoom-in-compact` 的初始 `class` 移除 `disabled`；將 `btn-zoom-out-compact` 加上 `disabled` class
- [x] 1.3 更新 `btn-zoom-in` 的 `title` 屬性為「增加每列桌次」
- [x] 1.4 更新 `btn-zoom-out` 的 `title` 屬性為「減少每列桌次」
- [x] 1.5 更新 `btn-zoom-in-compact` 的 `title` 屬性為「增加每列桌次」
- [x] 1.6 更新 `btn-zoom-out-compact` 的 `title` 屬性為「減少每列桌次」

## 2. JS

- [x] 2.1 在 `applyCardSize()` 中對調 disabled 目標：`atMin` disable `btnZoomIn`/`btnZoomInCompact`，`atMax` disable `btnZoomOut`/`btnZoomOutCompact`
- [x] 2.2 對調 `btnZoomIn` click handler 邏輯：`lg→md`、`md→sm`（增加每列）
- [x] 2.3 對調 `btnZoomOut` click handler 邏輯：`sm→md`、`md→lg`（減少每列）
- [x] 2.4 對調 `btnZoomInCompact` click handler 邏輯（同 2.2）
- [x] 2.5 對調 `btnZoomOutCompact` click handler 邏輯（同 2.3）
