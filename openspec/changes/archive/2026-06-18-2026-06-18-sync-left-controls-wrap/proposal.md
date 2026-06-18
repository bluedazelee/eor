## Why

在較小的裝置上，按鈕列右側的 `.filter-btns`（批量完成、複製資訊、只顯示加時、🔍）因為設有 `flex-wrap: wrap`，當空間不足時會自動折成兩列。然而左側的 `.left-controls`（↩↪、隱藏完成）沒有對應的折行設定，始終維持單列，造成兩側視覺高度不對稱，整個按鈕列在小螢幕上顯得不協調。

## What Changes

- **偵測右側折行**：在 `app.js` 加入 `ResizeObserver` 監聽 `.filter-btns`；每當其尺寸改變時，比較所有可見子元素的 `getBoundingClientRect().top`，若出現差異（超過 2px 門檻）則判定為已折行
- **同步左側排版**：偵測到折行時，在 `.left-controls` 加上 `stacked` class；右側回到單列時移除，確保兩側始終同步
- **新增 CSS**：`.left-controls.stacked` 切換為 `flex-direction: column; align-items: center`，使 ↩↪ 在上列、隱藏完成在下列，兩者居中對齊

## Capabilities

### Modified Capabilities

- `mobile-layout`：補充按鈕列左側折行同步行為規範

## Impact

- **`app.js`**：加入 `ResizeObserver` 初始化邏輯與折行偵測函式（約 15 行）
- **`style.css`**：新增 `.left-controls.stacked` 規則（2 個屬性）
- **`sw.js`**：`style.css` 與 `app.js` 皆有更新，需同步更新 Service Worker 快取版本號
- **`index.html`**：不需修改
- **既有功能**：不影響，純樣式與觀察者邏輯，不改動任何狀態或互動行為
