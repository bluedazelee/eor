## Context

control-row 目前分為 `.left-controls`（含復原/重做、隱藏完成）和 `.filter-btns`（含批量、複製、加時篩選、搜尋），以 `justify-content: space-between` 推開兩端。≤480px 時，`.filter-break`（`flex-basis: 100%` 的空元素）強制 filter-btns 換行，製造固定 2+2 格局。卡片格線 `minmax(110px, 1fr)`，無任何動態尺寸機制。

## Goals / Non-Goals

**Goals:**
- 三個卡片尺寸層級，由使用者切換，偏好跨 session 保留
- control-row 扁平化，依實際寬度自然換行，移除所有人工斷點
- 最小改動 JS 渲染邏輯（尺寸切換只改 class，不重繪卡片）

**Non-Goals:**
- 滑動手勢縮放
- 每個 view（setup/help）各自的縮放設定
- 動畫過渡（尺寸切換即時生效）

## Decisions

### 決策 1：class-based 尺寸切換，不用 CSS custom property

在 `.card-grid` 上切換 `.size-md` / `.size-sm` class（無 class = 大/預設）。子元素字體、可見性全以 descendant selector 控制：

```css
/* 大（預設）—— 無額外 class */
.card-grid { grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); }
.table-card .num { font-size: 1.8rem; }

/* 中 */
.card-grid.size-md { grid-template-columns: repeat(auto-fill, minmax(75px, 1fr)); }
.card-grid.size-md .num { font-size: 1.3rem; }
.card-grid.size-md .status-txt,
.card-grid.size-md .time-stamp { display: none; }

/* 小 */
.card-grid.size-sm { grid-template-columns: repeat(auto-fill, minmax(60px, 1fr)); }
.card-grid.size-sm .num { font-size: 1.0rem; }
.card-grid.size-sm .status-txt,
.card-grid.size-sm .time-stamp { display: none; }
.card-grid.size-sm .table-card { padding: 6px; }
```

`.overtime-badge` 在所有層級保持可見，字體維持 0.6rem（CSS px 換算後在高 DPI 手機上仍可讀）。

替代方案：CSS custom property（`--card-min: 110px`）注入 `minmax()`。否決，因為字體大小和 `display: none` 仍需 class 或 custom property，class 方案更直觀且一致。

### 決策 2：localStorage key 獨立，不納入 round state

```js
const CARD_SIZE_KEY = 'ptcg_eor_card_size'; // 'lg' | 'md' | 'sm'
```

app 啟動時讀取並套用 class；切換時即時寫入。round reset 不觸碰此 key。

### 決策 3：移除 left-controls / filter-btns 分組，control-row 直接 flex-wrap

```css
.control-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 4px;
  border-top: 1px solid rgba(255,255,255,0.05);
}
```

按鈕排列順序（DOM 順序 = 視覺順序）：
`[undo-redo-btns] [btn-zoom-in] [btn-zoom-out] [btn-batch-complete] [btn-hide-completed] [btn-overtime-filter] [btn-copy-remaining] [btn-search-toggle]`

`justify-content: space-between` 移除，換行由 flex 自然決定。

### 決策 4：統一短標籤，移除 label-long / label-short

刪除所有 `<span class="label-long">` / `<span class="label-short">` 結構，按鈕直接使用固定文字：
- 「批量完成」、「隱藏完成」、「只顯示加時」、📋、🔍

同步刪除 `.label-short { display: none }` 與 media query 中的 `.label-long` / `.label-short` 規則。

### 決策 5：縮放按鈕樣式沿用 undo-redo-btns 風格

`+` / `-` 按鈕與 ↩↪ 使用相同的圓角邊框樣式（`border: 1px solid rgba(255,255,255,0.15)`, `border-radius: 20px`），disabled 狀態套用現有 `.disabled` class。兩者放在同一個 `.zoom-btns` 容器內（類比 `.undo-redo-btns`）。

### 決策 6：≤480px media query 中的 minmax 覆寫移除

現有 `@media (max-width: 480px)` 將 minmax 改為 90px。移除後由 size class 統一管理，避免兩套機制衝突。

## Risks / Trade-offs

- **[Risk] 扁平排列在極窄螢幕（320px）可能換行過多** → 因按鈕統一短標籤後寬度縮減，預計 375px 多數情況單列可容納；320px 最差情況換兩列，可接受。
- **[Trade-off] 移除 label-long 後桌機標籤變短** → 桌機原顯示「批量設為已完成」，改後顯示「批量完成」，語義一致，影響極小。
- **[Risk] 小尺寸加時標記可讀性** → 0.6rem 在 Retina 螢幕（2x DPI）對應 ~19px 實際大小，足夠辨識；一般 1x DPI 螢幕約 9-10px，為可接受下限。
