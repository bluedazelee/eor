## Context

`app.js` 的搜尋確認流程有兩條路徑，都在呼叫 `closeSearchNumpad()` 之後才加上 `table-card-highlight`：

```
btnNumpadConfirm click:
  closeSearchNumpad()         ← 此時 DOM 中尚無高亮，timer 未被設定
  card.classList.add('table-card-highlight')   ← 高亮加上，但計時器永不啟動

btnFilterConfirmOk click:
  closeSearchNumpad()         ← 同上
  revealedCard.classList.add('table-card-highlight')
```

`closeSearchNumpad()` 內部邏輯：
```js
const highlighted = cardGrid.querySelector('.table-card-highlight');
if (highlighted) {
  highlightClearTimer = setTimeout(clearSearchHighlight, 1000);  // 永遠不進來
} else {
  clearSearchHighlight();   // 永遠走這裡
}
```

因為高亮加在函式回傳之後，`highlighted` 永遠是 `null`，所以計時器從未啟動。

## Goals / Non-Goals

**Goals:**
- 讓兩條確認路徑的高亮都能在 1 秒後自動消失，符合 spec 需求
- 明確化「誰負責設計時器」的責任：由加上高亮的呼叫端負責

**Non-Goals:**
- 不修改 CSS、HTML、localStorage、Service Worker
- 不改動高亮以外的搜尋行為（scrollIntoView、篩選清除邏輯）

## Decisions

### 將計時器設定移至呼叫端

**決策：** 移除 `closeSearchNumpad()` 內部的 `if (highlighted)` 判斷，改為無條件呼叫 `clearSearchHighlight()`；兩個確認 handler 在加上高亮後各自設定 `highlightClearTimer`。

**理由：** `closeSearchNumpad()` 被呼叫時 DOM 中從來不存在高亮（高亮一定在它之後才加），讓它判斷高亮是否存在本來就是錯誤的責任歸屬。呼叫端既然負責加高亮，就應同時負責設計時器。

**替代方案考慮：**
- *在 `closeSearchNumpad()` 加一個 `willHighlight` 參數*：可行但增加函式介面複雜度，且仍然是讓關閉函式承擔它不該有的知識。
- *用 `requestAnimationFrame` 延遲在 `closeSearchNumpad()` 裡查找高亮*：hack，難以維護。

### `closeSearchNumpad()` 無條件呼叫 `clearSearchHighlight()`

**理由：** `clearSearchHighlight()` 除了移除高亮 class，也會清空 `searchNumpadMsg`（「找不到桌號 X」的提示文字）。關閉 numpad 時應該清空這個訊息，所以無條件呼叫是正確的。

### 設定新計時器前先 `clearTimeout`

每個確認 handler 在設定 `highlightClearTimer` 前先 `clearTimeout(highlightClearTimer)`，確保不會有殘留計時器（防禦性寫法，避免未來引入其他呼叫路徑時出問題）。

## Risks / Trade-offs

- [風險] 若未來新增第三條高亮路徑，開發者需記得也在該路徑設定計時器 → 緩解：`closeSearchNumpad()` 不再假裝會處理計時器，讓責任清楚地留在呼叫端，較容易被發現

## Migration Plan

純 `app.js` 局部修改，無需資料遷移或 Service Worker 版本更新。改完後直接在瀏覽器測試兩條路徑即可驗證。
