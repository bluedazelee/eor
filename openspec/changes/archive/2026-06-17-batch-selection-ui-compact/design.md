## Context

批次模式啟用時，`#tracker-view` 加上 `.selection-mode` class，CSS 規則 `#tracker-view.selection-mode .dashboard-bar { display: none }` 將整個 dashboard-bar（含 filter 按鈕）隱藏。compact-strip 只顯示 `R1・12/50`，selection-action-bar 以雙行呈現取消/計數/確認 + 全選/清除/反選，高度明顯大於正常模式的 control-row。

## Goals / Non-Goals

**Goals:**
- 批次模式下可操作「隱藏完成」與「只顯示加時」兩個篩選器
- selection-action-bar 高度與 control-row 相同（單行，約 28–30px 內容高度）
- compact-strip filter 按鈕與原始按鈕的 active 狀態保持同步

**Non-Goals:**
- 不改變篩選器的業務邏輯
- 不調整桌面版（> 480px）的外觀
- 不影響正常模式的版面

## Decisions

### 1. compact-strip filter 按鈕：委派觸發模式

**決策**：在 `.dashboard-compact-strip` 加入兩個新按鈕（`#btn-hide-completed-compact`、`#btn-overtime-filter-compact`），click 時呼叫原始按鈕的 `.click()`，讓原始 handler 執行完整的 toggle 邏輯。

```
compact [隱藏完成] click
  → btnHideCompleted.click()
  → hideCompleted = !hideCompleted
  → renderTracker()
  → syncCompactFilterState()  ← 同步兩個按鈕的 active class
```

**Why 委派而非複製邏輯**：避免雙份 state 管理。原始按鈕仍是 source of truth，compact 版只是觸發器。

**同步點**：建立 `syncCompactFilterState()` 工具函式，在每次 `hideCompleted` / `showOvertimeOnly` 改變後呼叫，同步兩組按鈕的 `active` class。`enterSelectionMode()` 進入批次時也呼叫一次，確保 compact 按鈕初始狀態正確。

### 2. selection-action-bar 單行化

**決策**：移除 `.selection-bar-main` 與 `.selection-bar-shortcuts` 雙層 div，改為 `#selection-action-bar` 直接作為單一 flex row 容器。

新排列順序：
```
[取消] [全選] [清除] [反選]  ← 已選N桌（flex:1 居中）→  [確認]
```

CSS：
```css
.selection-action-bar {
  flex-direction: row;
  align-items: center;
  padding: 5px 10px;
  gap: 6px;
}
```

按鈕高度對齊 `.btn-filter`（padding: `5px 8px`）。

**Why 直接移除雙層 div**：現有雙層結構的唯一目的是實現兩行排版，單行後這兩層完全多餘，移除比保留更清晰。

**「確認執行」縮短**：加入 `.label-short`「確認」（與其他按鈕共用既有 RWD 機制），避免在緊湊單行中撐開過多空間。

### 3. compact-strip 排版

compact-strip 改為兩段：左側資訊區（`R1・12/50`）+ 右側 filter 按鈕組：

```css
.dashboard-compact-strip {
  justify-content: space-between;
}
.compact-filters {
  display: flex;
  gap: 6px;
}
```

## Risks / Trade-offs

- **單行6元素在超窄螢幕（< 320px）可能換行** → 現有 `.btn-filter` 已設 `white-space: nowrap`；整體估算在 320px 下約需 290px，仍可容納。
- **委派觸發若原始按鈕被 `display:none` 則 `.click()` 無效** → 原始按鈕在 dashboard-bar 被 CSS 隱藏（`display:none`），`.click()` 仍可觸發 JS 事件，視覺隱藏不影響程式化觸發。已驗證此行為在主流瀏覽器成立。
