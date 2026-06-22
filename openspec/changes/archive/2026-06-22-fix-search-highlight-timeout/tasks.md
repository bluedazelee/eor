## 1. 修正 app.js 計時器邏輯

- [x] 1.1 在 `closeSearchNumpad()` 中，移除 `if (highlighted) { highlightClearTimer = ... } else { ... }` 判斷，改為無條件呼叫 `clearSearchHighlight()`
- [x] 1.2 在 `btnNumpadConfirm` handler 的 `card.classList.add('table-card-highlight')` 之後，加上 `clearTimeout(highlightClearTimer); highlightClearTimer = setTimeout(clearSearchHighlight, 1000);`
- [x] 1.3 在 `btnFilterConfirmOk` handler 的 `revealedCard.classList.add('table-card-highlight')` 之後，加上相同的 `clearTimeout` + `setTimeout` 計時器設定

## 2. 驗證

- [x] 2.1 在瀏覽器手動測試直接確認路徑：輸入可見桌號 → 確定 → 確認高亮出現並於 1 秒後自動消失
- [x] 2.2 在瀏覽器手動測試篩選確認路徑：啟用篩選器使某桌隱藏 → 搜尋該桌 → 確認跳轉 → 確認高亮出現並於 1 秒後自動消失
