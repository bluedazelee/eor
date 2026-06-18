## Context

`renderTracker()` 目前有兩個篩選條件（`showOvertimeOnly`、`hideCompleted`），以 AND 邏輯決定卡片可見性。`state.startTable`/`state.endTable` 在 setup 時設定，`state.tables` 包含所有桌次物件。tracker view 的 DOM 結構：dashboard-bar → control-row → search-bar → selection-action-bar → card-grid。

## Goals / Non-Goals

**Goals:**
- 一鍵篩選至指定桌次區段
- 各標籤即時顯示該區段的未完成桌數
- 正常模式與批量模式皆可操作

**Non-Goals:**
- 自訂區段範圍（僅自動產生）
- 持久化選取的區段
- 在標籤列中顯示已完成/已分配的細分數字

## Decisions

### 決策 1：分段算法

```js
function buildRangeTabs(startTable, endTable) {
  const total = endTable - startTable + 1;
  const segmentSize = Math.max(25, Math.ceil(total / 4));
  const tabs = [];
  for (let s = startTable; s <= endTable; s += segmentSize) {
    tabs.push({ start: s, end: Math.min(s + segmentSize - 1, endTable) });
  }
  return tabs.length > 1 ? tabs : []; // 1 段 = 等同全部，不顯示分段
}
```

回傳空陣列時，整個 `range-filter-bar` 隱藏。

### 決策 2：`renderRangeTabs()` 計算各標籤的未完成數

每次 `renderTracker()` 呼叫時順帶呼叫 `renderRangeTabs()`，重算每段的 `state !== 'completed'` 桌數並更新標籤文字，確保即時性。

```
標籤文字格式：
  全部標籤：「全部 (N)」，N = 全域未完成
  分段標籤：「起-訖 (N)」，N = 該段未完成
```

### 決策 3：標籤列位置 — selection-action-bar 之後

DOM 順序：control-row → search-bar → selection-action-bar → **range-filter-bar** → card-grid。

這樣在批量模式下，使用者可先選定範圍再執行「全選」（全選只選取「目前顯示中」的未完成桌，已受範圍篩選過濾）。

### 決策 4：activeRangeTab 為模組頂層 UI 狀態

```js
let activeRangeTab = null; // null = 全部；或 { start, end }
```

開始新輪次（`renderTracker()` 在 `showTrackerView()` 中首次呼叫）時不重設——使用者可能希望保留；但 `resetAndReturnToSetup()` 後重設為 null，因為下一輪桌次範圍可能不同。

### 決策 5：標籤樣式沿用 btn-filter 風格

範圍標籤使用與篩選按鈕相同的圓角、邊框、字體系統，`.active` class 標示當前選取的標籤，視覺語言一致。

## Risks / Trade-offs

- **[Trade-off] 批量模式「全選」只選取顯示中的桌次**：已受範圍篩選限制，行為符合預期（縮小後全選），無需額外處理。
- **[Risk] 標籤列佔用垂直空間**：標籤列約 32–36px 高，會壓縮 card-grid 可用高度。在 card-grid 最低 70% 高度規範下，仍需實際驗證手機上的高度表現。
