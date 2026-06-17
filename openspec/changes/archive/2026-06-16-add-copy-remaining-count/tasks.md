## 1. HTML 結構

- [x] 1.1 在 `index.html` 的 `copy-menu-popup` 中，於 `btn-copy-overtime` 與 `btn-copy-detail` 之間新增 `<button id="btn-copy-remaining-count" class="copy-menu-item">剩餘桌次</button>`

## 2. JS — DOM Reference

- [x] 2.1 在 `app.js` 模組頂部 DOM ref 宣告區，新增 `const btnCopyRemainingCount = document.getElementById('btn-copy-remaining-count');`

## 3. JS — Builder 函式

- [x] 3.1 在 `app.js` 的 Copy Remaining Tables Info 區段，新增 `buildRemainingCountInfo()` 函式，回傳 `buildRangeInfo()` + `'\n\n剩餘 ' + remaining.length + ' 桌'`

## 4. JS — 事件監聽器

- [x] 4.1 在 `app.js` 新增 `btnCopyRemainingCount` 的 click 事件監聽器：呼叫 `buildRemainingCountInfo()`、複製到剪貼簿、顯示「已複製剩餘桌次：\n{info}」alert，並呼叫 `hideCopyMenu()`

## 5. JS — Alert 文字更新

- [x] 5.1 將 `btnCopyRange` 監聽器的成功 alert 改為「已複製本輪範圍：\n${info}」、失敗改為「複製失敗，請手動複製：\n${info}」
- [x] 5.2 將 `btnCopyOvertime` 監聽器的成功 alert 改為「已複製加時桌次：\n${info}」、失敗改為「複製失敗，請手動複製：\n${info}」
- [x] 5.3 將 `btnCopyDetail` 監聽器的成功 alert 改為「已複製詳細資訊：\n${info}」、失敗改為「複製失敗，請手動複製：\n${info}」
