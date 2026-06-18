## 1. JS — 篩選器自動清除

- [x] 1.1 在 `handleTableSearch()` 中，`card` 為 null 時加入篩選器遮擋判斷：`shouldClearHideCompleted`、`shouldClearOvertimeOnly`、`shouldClearRangeTab`
- [x] 1.2 若任一為 true，清除相關篩選器狀態（boolean 改 false / activeRangeTab 設 null），更新對應按鈕的 `active` class
- [x] 1.3 呼叫 `syncCompactFilterState()` 同步 compact strip 篩選按鈕狀態
- [x] 1.4 呼叫 `renderTracker()`，再次查找 DOM 卡片，跳轉並高亮
- [x] 1.5 numpad 訊息區顯示「已清除篩選，跳轉至桌號 X」
- [x] 1.6 移除舊有的「桌號 X 目前被篩選器隱藏」訊息邏輯（改為後備訊息，anyCleared 為 false 時才顯示）

## 2. JS — 高亮延遲清除

- [x] 2.1 新增 `highlightClearTimer = null` 頂層變數
- [x] 2.2 修改 `closeSearchNumpad()`：若 DOM 中有 `.table-card-highlight` 元素，改為 `setTimeout(clearSearchHighlight, 1000)` 並儲存至 `highlightClearTimer`；否則立即呼叫 `clearSearchHighlight()`
- [x] 2.3 修改 `openSearchNumpad()`：最前面加入 `clearTimeout(highlightClearTimer); highlightClearTimer = null; clearSearchHighlight()`，確保重開時立即清除
