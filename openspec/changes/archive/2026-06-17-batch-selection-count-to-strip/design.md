## Context

批次模式的版面目前由兩個區塊組成：
1. `.dashboard-compact-strip`：`R1・12/50  [隱藏完成]  [只顯示加時]`
2. `#selection-action-bar`：`[取消] [全選] [清除] [反選]  已選N桌  [確認]`

「已選 N 桌」以 `flex:1` 置中夾在按鈕之間，形成不對稱的視覺分隔，且語意上屬於「狀態資訊」而非「操作按鈕」。

## Goals / Non-Goals

**Goals:**
- 將「已選 N 桌」移至 compact-strip，與 `R1・12/50` 等狀態資訊並列
- action-bar 成為純按鈕行，無任何文字佔位元素
- 不影響 `updateSelectionBar()` 的邏輯（`#selection-count` id 不變）

**Non-Goals:**
- 不改變選取計數的更新邏輯
- 不調整 compact-strip 的顯示時機

## Decisions

### compact-strip 新排版

```
左                    中               右
R1・12/50         已選 0 桌     [隱藏完成] [只顯示加時]
└─.compact-info─┘ └─#selection-count─┘ └─.compact-filters─┘
```

`#selection-count` 從 `selection-action-bar` 移至 `.dashboard-compact-strip`，置於 `.compact-info` 與 `.compact-filters` 之間。

compact-strip CSS 已有 `justify-content: space-between`，三段自然分佈。

`#selection-count` 在 compact-strip 中預設 `display: none`（非批次模式不顯示），進入批次模式時隨 compact-strip 一起顯示，無需額外控制。

### action-bar 移除佔位元素

移除 `#selection-count` 後，action-bar 的 flex 排版調整：
- 左側按鈕群（取消/全選/清除/反選）自然靠左
- 確認按鈕加 `margin-left: auto` 靠右

```
[取消] [全選] [清除] [反選]          [確認]
```

### `updateSelectionBar()` 不需改動

`selectionCount` 已在頂部 querySelector 取得 `document.getElementById('selection-count')`。元素 id 不變，移動後 JS 仍能正確找到並更新文字。

## Risks / Trade-offs

- **compact-strip 非批次模式下 `#selection-count` 可見性**：compact-strip 整體在非批次模式為 `display: none`，`#selection-count` 自然不可見，不需額外隱藏邏輯。
- **action-bar 寬度感知變化**：移除 flex:1 元素後，按鈕群不再撐滿整行；以 `margin-left: auto` 讓確認按鈕靠右，視覺上仍保持兩端對齊。
