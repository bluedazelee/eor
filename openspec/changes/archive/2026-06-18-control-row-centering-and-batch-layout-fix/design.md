## Context

control-row 目前為 `flex-wrap: wrap`，子元素有兩種形式：已有容器的（`.undo-redo-btns`、`.zoom-btns`）和裸按鈕（`批量完成`、`隱藏完成`、`只顯示加時`、`📋`、`🔍`）。換行時以直接子元素為單位，因此裸按鈕可能被拆開。compact strip 和 selection bar 的雙 span 問題源於上一次 change 刪除 CSS 規則但未同步修正 HTML。

## Goals / Non-Goals

**Goals:**
- 換行後每列按鈕置中
- 「隱藏完成/只顯示加時」和「📋/🔍」在換行時保持同列
- 批量模式兩個列不溢出手機螢幕寬度

**Non-Goals:**
- 變更 compact strip 的換行邏輯（維持單列）
- 變更 selection action bar 的換行邏輯（維持單列）

## Decisions

### 決策 1：`.btn-group` 新容器 class

```css
.btn-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
```

`flex-shrink: 0` 防止容器在 flex 主軸被壓縮；不設 `flex-wrap` 確保組內按鈕永不自行斷行。gap 沿用 `.control-row` 的 8px，視覺間距一致。

### 決策 2：`justify-content: center` 加到 `.control-row`

單列時居中效果，配合 `flex-wrap: wrap`，換行後每列獨立置中。不影響現有 `gap` 和 `flex-shrink`。

### 決策 3：compact strip 和 selection bar 固定短標籤

移除 span 結構，直接寫文字節點：
- 篩選：「隱藏」「加時」（比「隱藏完成」「只顯示加時」各節省 ~30px）
- 操作：「全選」「清除」「確認」（比長版各節省 ~30-40px）

短標籤讓兩個列在 320px 以上裝置均可單列顯示，優先保住 card-grid 高度。

## Risks / Trade-offs

- **[Trade-off] 短標籤資訊量減少**：「全選未完成」→「全選」語意略有損失，但批量模式下上下文明確，使用者應可理解。
- **[Risk] 無** — 純 HTML + CSS 修改，不影響 JS 邏輯。
