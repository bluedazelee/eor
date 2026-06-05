## Context

加時彈出層（`#overtime-popup`）是 `position: fixed` 置中顯示的浮動層，透過 `hidden` class 切換顯示。標題列（`.overtime-popup-title`）目前是單純的文字 div，關閉機制依賴 `document.addEventListener('pointerdown', _outsideClickHandler)` 偵測外部點擊。

## Goals / Non-Goals

**Goals:**
- 在標題列右側新增 ✕ 關閉按鈕
- 不影響既有的外部點擊關閉行為

**Non-Goals:**
- 不修改加時值的儲存或清除邏輯
- 不改變彈出層的定位方式

## Decisions

### 1. 標題列改為 flex row

**決定**：`.overtime-popup-title` 加上 `display: flex; justify-content: space-between; align-items: center`，標題文字以 `<span>` 包裝，✕ 按鈕靠右。

**理由**：最小改動，不需要新增外層 wrapper，直接在既有容器內排版。

### 2. ✕ 按鈕樣式

**決定**：無背景、無邊框，字色使用 `var(--text-sub)` 並加 `opacity: 0.6`，hover 時 `opacity: 1`。使用文字 `✕` 而非 SVG 圖示，維持專案純 HTML 的慣例。

**理由**：視覺低調不搶眼，不干擾 +3/+6/+9 等主要操作。文字 `✕` 無需額外資源。

### 3. 事件監聽器

**決定**：`btnOvertimeClose.addEventListener('click', (e) => { e.stopPropagation(); closeOvertimePopup(); })`。

**理由**：`stopPropagation` 防止事件冒泡觸發 `_outsideClickHandler`（雖然 ✕ 在彈出層內，外部偵測會自然排除，但明確止冒泡更保險）。

## Risks / Trade-offs

- 無已知風險，純 UI 改動
- `sw.js` 版本號需遞增，確保 PWA 使用者取得最新版本
