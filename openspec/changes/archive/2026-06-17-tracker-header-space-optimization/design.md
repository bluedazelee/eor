## Context

目前 tracker-view 的固定區塊（app-header + dashboard-bar + table-search-bar + action-footer）在 iPhone 14（844px）上合計約 357px，使 card-grid 僅剩 56.7%；批次模式展開 selection-action-bar 後更降至 46.7%，遠低於 70% 目標。

主要空間占用來源：
1. dashboard-bar 分三列顯示（round-indicator / stats-info / control-row），加 padding/gap/margin 合計約 157px
2. table-search-bar 作為獨立區塊常態佔 45px
3. 批次模式 selection-action-bar 疊加而非取代 dashboard control-row，淨增 +93px

## Goals / Non-Goals

**Goals:**
- 正常模式 card-grid ≥ 70% 視窗高度
- 批次模式 card-grid ≥ 70% 視窗高度
- 搜尋功能保持完整，改為 icon 展開式
- RWD：≤ 480px 裝置按鈕文字縮短，不觸發多行換行

**Non-Goals:**
- 不改變任何功能邏輯或桌次狀態機
- 不改變桌面（> 600px）的版面
- 不更動 setup-view 或 help-view

## Decisions

### 1. dashboard-bar 合併為兩行 + progress bar

**決策**：將 `.round-indicator` 與 `.stats-text` 合併至同一 flex 行，移除 `round-indicator` 作為獨立 row。

```
修改前（3 rows）:
  row A: 當前輪次  R1
  row B: 已完成 0/0桌 (0%) | 剩0桌
  ─── progress bar ───
  row C: [↩][↪] [隱藏完成] [批量完成] [複製] [加時] [🔍]

修改後（2 rows）:
  row A: R1  已完成 0/0桌 (0%) | 剩0桌
  ─── progress bar ───
  row B: [↩][↪] [隱藏完成] [批量完成] [複製] [加時] [🔍]
```

CSS 調整：
- `.dashboard-bar` padding: `16px 20px` → `10px 14px`，gap: `12px` → `8px`，margin-bottom: `20px` → `12px`
- 新增 `.dashboard-stats-row`（flex 容器）包住 round display + stats text
- `.progress-bar-container` 維持獨立一行

預計節省：~45px

---

### 2. 搜尋欄改為 icon 展開式

**決策**：在 `control-row` 最右側加入 `#btn-search-toggle`（🔍 icon）；`#table-search-input` 的外層 `.table-search-bar` 預設 `display: none`，點擊 icon 後切換 `hidden` class 展開/收起。

**Why icon 在 control-row 而非浮動**：control-row 本身已有篩選工具，搜尋在語意上屬於同層操作，放在右側比浮動按鈕更一致。

**搜尋欄展開行為**：
- 展開時 `#btn-search-toggle` 加 `active` 樣式（高亮），搜尋欄自動 focus
- 收起時（再次點擊 icon 或清空 input 後 blur）移除高亮，清空搜尋結果
- 批次模式進入時若搜尋欄展開，強制收起並清除高亮

預計節省（常態）：~45px

---

### 3. 批次模式切換 dashboard 顯示

**決策**：進入選取模式時，在 `#tracker-view` 加上 `.selection-mode` class；CSS 透過此 class 控制顯示切換：

```css
/* 正常模式：顯示完整 dashboard */
.dashboard-bar { display: flex; }
.dashboard-compact-strip { display: none; }

/* 批次模式：隱藏完整 dashboard，顯示簡要列 */
#tracker-view.selection-mode .dashboard-bar { display: none; }
#tracker-view.selection-mode .dashboard-compact-strip { display: flex; }
```

`.dashboard-compact-strip` 為新增 HTML 元素，內容格式：`R1・12/50`（輪次 + 已完成/總計）。JS 在進入/退出批次模式時同步更新此文字，並 toggle `.selection-mode`。

**Why CSS class toggle 而非 JS style**：符合現有 `renderTracker()` 模式，且 class 切換可在 CSS 統一管理所有批次模式的視覺狀態。

---

### 4. RWD 按鈕文字縮短

**決策**：在需要縮短的按鈕內使用兩個 `<span>` 子元素：

```html
<button id="btn-batch-complete" class="btn-filter btn-filter-complete">
  <span class="label-long">批量設為已完成</span>
  <span class="label-short">批量完成</span>
</button>
```

```css
.label-short { display: none; }

@media (max-width: 480px) {
  .label-long { display: none; }
  .label-short { display: inline; }
}
```

**Why 雙 span 而非 `data-*` + `::after`**：雙 span 方案對 screen reader 友善（`aria-hidden` 可控），實作直覺，且不依賴偽元素字體繼承問題。

套用按鈕：`btn-batch-complete`、`btn-hide-completed`、`btn-overtime-filter`、`btn-select-all-incomplete`、`btn-select-clear`

---

### 5. 手機 padding 縮減

僅於 `@media (max-width: 480px)` 套用：
- `.app-header` padding: `18px 20px` → `10px 20px`（節省 ~16px）
- `.app-main` padding: `20px` → `12px`（節省 ~16px）
- `.btn`（action-footer）padding: `14px 24px` → `10px 16px`（節省 ~8px）

---

## Risks / Trade-offs

- **搜尋預設收起影響可發現性** → 🔍 icon 使用高對比樣式，與其他篩選 icon 同列，使用者可快速識別。help-view 說明同步更新。
- **批次模式 dashboard 消失影響方向感** → 保留簡要 `R1・12/50` 資訊，讓使用者仍知道輪次與整體進度。
- **小螢幕（iPhone SE，667px）驗證** → 試算值基於 844px；SE 更小，但比例計算相同，固定區塊不超過 30% 目標仍成立。
- **control-row 按鈕過多導致換行**（加入 🔍 後共 6 個元素）→ 按鈕均為 `white-space: nowrap` + 縮短文字，加上容器為 `flex-wrap: wrap`；若仍換行，可接受（search icon 換到下一行也不影響功能）。

## Migration Plan

1. 修改 `index.html`：重構 dashboard-bar 內部結構，加入 `.dashboard-compact-strip`、`#btn-search-toggle`、雙 span 按鈕文字
2. 修改 `style.css`：壓縮 dashboard-bar 樣式、搜尋展開動畫、批次模式 compact strip、RWD 規則
3. 修改 `app.js`：search toggle 邏輯、批次進入/退出時的 class toggle 與 compact strip 文字更新
4. 更新 `sw.js`：版本號 bump，確保 PWA 安裝的手機取得新 CSS

回滾：所有變更集中於單一 commit，可直接 git revert。
