## 1. HTML 結構

- [x] 1.1 在 `index.html` 上方 `control-row` 的 `.filter-btns` 群組中新增「複製剩餘桌次資訊」按鈕元素（id: `btn-copy-remaining`）

## 2. CSS 樣式

- [x] 2.1 在 `style.css` 中為 `#btn-copy-remaining` 套用既有 `.btn-filter` 規範，視覺上與其他控制列按鈕一致（可加 accent class）

## 3. JavaScript 實作

- [x] 3.1 在 `app.js` 中新增 `btnCopyRemaining` DOM 參考（對應 id `btn-copy-remaining`）
- [x] 3.2 新增 `buildRemainingInfo()` 純函式：篩選 `state !== 'completed'` 的桌號，分為加時桌（`overtimeMinutes !== null`，格式 `桌號(+N分)`）與一般桌（格式 `桌號`），各組依桌號由小到大排序，空組以「無」表示，回傳 `剩餘 n 桌；剩餘加時桌：…；剩餘一般桌：…`
- [x] 3.3 新增 `copyToClipboard(text)` 函式：優先使用 `navigator.clipboard.writeText()`，不可用或失敗時退回暫時 `<textarea>` + `document.execCommand('copy')`，回傳是否成功
- [x] 3.4 綁定 `btnCopyRemaining` 的 click 事件：呼叫 `buildRemainingInfo()` 取得字串後複製，成功以 `alert()` 顯示成功提示，失敗顯示錯誤提示

## 4. 驗證

- [x] 4.1 測試同時有加時桌與一般桌：字串格式、分組、排序與 `(+N分)` 正確
- [x] 4.2 測試無剩餘加時桌 / 無剩餘一般桌：對應段落顯示「無」
- [x] 4.3 測試所有桌號皆已完成：字串為 `剩餘 0 桌；剩餘加時桌：無；剩餘一般桌：無`
- [x] 4.4 測試複製成功回饋，且剪貼簿內容與顯示字串一致
- [x] 4.5 測試 Clipboard API 不可用情境下 fallback 仍能複製
