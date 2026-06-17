## 1. HTML 結構

- [x] 1.1 將 `#selection-count`（`<span id="selection-count" class="selection-count">已選 0 桌</span>`）從 `#selection-action-bar` 中移出，改置於 `.dashboard-compact-strip` 內，位於 `.compact-info` 與 `.compact-filters` 之間

## 2. CSS 樣式

- [x] 2.1 在 `.dashboard-compact-strip` 中為 `#selection-count` 加入適當樣式（字體大小、顏色與 compact-strip 資訊風格一致）
- [x] 2.2 在 `#selection-action-bar` 中為 `#btn-selection-confirm` 加入 `margin-left: auto`，使其靠右對齊
- [x] 2.3 移除或更新 `.selection-count` 的 `flex: 1` 規則（該規則原用於 action-bar 佔位，移至 compact-strip 後不再需要）

## 3. PWA 快取更新

- [x] 3.1 更新 `sw.js` 快取版本號（`v13` → `v14`）
