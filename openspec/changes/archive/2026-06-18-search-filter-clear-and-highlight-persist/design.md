## Context

`handleTableSearch(value)` 在 state.tables 找到桌次後，用 `cardGrid.querySelector([data-num="N"])` 確認卡片是否在 DOM。若不在，表示被篩選器擋住，目前只顯示靜態訊息。三個可能的篩選器：`hideCompleted`（boolean）、`showOvertimeOnly`（boolean）、`activeRangeTab`（null 或 {start,end}）。`closeSearchNumpad()` 目前直接呼叫 `clearSearchHighlight()`。

## Goals / Non-Goals

**Goals:**
- 篩選器遮擋時自動清除並跳轉
- 關閉 numpad 後高亮延遲 1 秒消失
- 重新開啟 numpad 立即清除任何殘留高亮

**Non-Goals:**
- 提供「不清除篩選」的選項（行為直接自動）
- 顯示被清除的篩選器名稱細節（只顯示「已清除篩選」）

## Decisions

### 決策 1：篩選器遮擋的判斷與清除

```js
// 在 handleTableSearch 中，card 為 null 時：
const shouldClearHideCompleted = hideCompleted && table.state === 'completed';
const shouldClearOvertimeOnly  = showOvertimeOnly && table.overtimeMinutes === null;
const shouldClearRangeTab      = activeRangeTab &&
  (table.number < activeRangeTab.start || table.number > activeRangeTab.end);

const anyCleared = shouldClearHideCompleted || shouldClearOvertimeOnly || shouldClearRangeTab;

if (shouldClearHideCompleted) { hideCompleted = false; btnHideCompleted.classList.remove('active'); }
if (shouldClearOvertimeOnly)  { showOvertimeOnly = false; btnOvertimeFilter.classList.remove('active'); }
if (shouldClearRangeTab)      { activeRangeTab = null; }

if (anyCleared) {
  syncCompactFilterState();
  renderTracker();
  const revealedCard = cardGrid.querySelector(`[data-num="${num}"]`);
  if (revealedCard) {
    revealedCard.classList.add('table-card-highlight');
    revealedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    searchNumpadMsg.textContent = `已清除篩選，跳轉至桌號 ${num}`;
    searchNumpadMsg.classList.remove('hidden');
  }
  return;
}
// anyCleared 為 false 時（不應發生，保留原訊息作為後備）
searchNumpadMsg.textContent = `桌號 ${num} 目前被篩選器隱藏`;
searchNumpadMsg.classList.remove('hidden');
```

`syncCompactFilterState()` 確保批量模式的 compact strip 篩選按鈕狀態同步。

### 決策 2：highlightClearTimer 管理

```js
let highlightClearTimer = null;

// closeSearchNumpad 中：
const highlighted = cardGrid.querySelector('.table-card-highlight');
if (highlighted) {
  highlightClearTimer = setTimeout(clearSearchHighlight, 1000);
} else {
  clearSearchHighlight();
}

// openSearchNumpad 中（最前面）：
if (highlightClearTimer) { clearTimeout(highlightClearTimer); highlightClearTimer = null; }
clearSearchHighlight();
```

`clearSearchHighlight()` 本身不需要改動，它只清除 DOM class 和訊息。

## Risks / Trade-offs

- **[Trade-off] 自動清除篩選器改變使用者狀態**：行為是主動的，使用者可能沒預期。訊息「已清除篩選，跳轉至桌號 X」提供明確說明。
- **[Risk] 1 秒延遲期間使用者快速操作**：重新開啟 numpad 時立即清除解決此問題。
