## Context

`.left-controls` 是 `control-row` 的左側子容器，目前以 `flex-direction: column` 垂直疊放 `.undo-redo-btns`（[↩][↪]）與 `#btn-hide-completed`，造成控制列視覺上佔兩行高度。

## Goals / Non-Goals

**Goals:**
- control-row 內所有元素在同一水平行顯示
- undo/redo 按鈕高度與 `.btn-filter` 一致（padding 5px），匹配 selection-action-bar 高度

**Non-Goals:**
- 不更動 HTML 結構
- 不調整 `.filter-btns`（右側按鈕群）排版

## Decisions

### `.left-controls` 改為 row

```css
/* 修改前 */
.left-controls {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* 修改後 */
.left-controls {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
}
```

`gap: 6px` 維持不變，作為 [↩↪] 群組與 [隱藏完成] 按鈕之間的水平間距。

### undo/redo 按鈕 padding 微調

```css
/* 修改前 */
.undo-redo-btns button {
  padding: 4px 8px;
}

/* 修改後 */
.undo-redo-btns button {
  padding: 5px 8px;
}
```

上下各 +1px 使其與 `.btn-filter`（`padding: 5px 12px`）等高。

## Risks / Trade-offs

- **超窄螢幕（< 320px）**：左側 [↩][↪][隱藏完成] + 右側 4 顆按鈕在極窄裝置可能讓 filter-btns 換行，但 filter-btns 已有 `flex-wrap: wrap` 可自動處理，不影響功能。
