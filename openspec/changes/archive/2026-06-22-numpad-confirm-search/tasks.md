## 1. HTML 結構

- [x] 1.1 在 `search-numpad-popup` 標題列加入圓形關閉按鈕（`#btn-numpad-x`），與標題文字同列
- [x] 1.2 將底部 numpad grid 的「關閉」按鈕（`#btn-numpad-close`）改為「確定」（`#btn-numpad-confirm`）
- [x] 1.3 新增篩選確認提示視窗 HTML 結構（overlay + popup，含說明文字、「取消」、「確認跳轉」按鈕）

## 2. CSS 樣式

- [x] 2.1 設定 `#btn-numpad-x` 圓形按鈕樣式（`position: absolute` 右上角，24px 圓形，hover guard）
- [x] 2.2 設定篩選確認提示視窗樣式（`position: fixed` 置中，overlay 半透明背景，按鈕排列）

## 3. JS 邏輯 — 移除即時搜尋

- [x] 3.1 移除 digit 按鈕 handler 中的 `handleTableSearch()` 呼叫及 `clearSearchHighlight()` 呼叫
- [x] 3.2 移除 `btnNumpadBackspace` handler 中的 `handleTableSearch()` 呼叫及 `clearSearchHighlight()` 呼叫
- [x] 3.3 新增 `confirmedSearchValue`（number | null）模組層級變數，初始值 null；`openSearchNumpad()` 時重置為 null

## 4. JS 邏輯 — 確定按鈕與三情境處理

- [x] 4.1 新增 `btnNumpadConfirm` DOM 參照（`#btn-numpad-confirm`）
- [x] 4.2 實作確定 handler：buffer 為空時無動作；否則取得整數桌號，分三情境分派
- [x] 4.3 情境 A（桌號不存在）：numpad 訊息區顯示「找不到桌號 X」，numpad 維持開啟
- [x] 4.4 情境 B（桌號可見）：設定 `confirmedSearchValue`，關閉 numpad，捲動並高亮，1 秒後消失
- [x] 4.5 情境 C（桌號存在但被篩選隱藏）：顯示篩選確認提示視窗，傳遞目標桌號

## 5. JS 邏輯 — 篩選確認視窗

- [x] 5.1 新增篩選確認視窗的 DOM 參照（overlay、popup、確認按鈕、取消按鈕、說明文字）
- [x] 5.2 實作 `openFilterConfirmDialog(tableNum)`：更新說明文字，顯示視窗
- [x] 5.3 「取消」handler：關閉確認視窗，numpad 維持開啟
- [x] 5.4 「確認跳轉」handler：關閉確認視窗，清除相關篩選，設定 `confirmedSearchValue`，關閉 numpad，重新渲染，捲動並高亮，1 秒後消失

## 6. JS 邏輯 — 關閉按鈕與重渲染

- [x] 6.1 將 `btnNumpadClose`（舊 handler）改接至 `#btn-numpad-x`（`closeSearchNumpad()`）
- [x] 6.2 `renderCards()` 中將 `searchBuffer` 改用 `confirmedSearchValue` 重新套用高亮

## 7. 收尾

- [x] 7.1 更新 `sw.js` 版本號（快取失效）
