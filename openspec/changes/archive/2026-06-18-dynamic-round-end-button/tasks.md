## 1. HTML 結構

- [x] 1.1 移除 `index.html` 中的 `btn-force-end-round` 按鈕元素
- [x] 1.2 調整 `btn-finish-round` 的初始 class 為 `btn btn-warning`，初始文字改為「強制結束本輪」

## 2. JS 邏輯

- [x] 2.1 移除 `app.js` 頂部的 `btnForceEndRound` DOM reference（`document.getElementById('btn-force-end-round')`）
- [x] 2.2 修改 `renderTrackerView()` 中的按鈕狀態邏輯：全部完成時將 `btnFinishRound` 切換為 `btn btn-success` 並更新 `textContent` 為「確認本輪處理完畢」；否則切換為 `btn btn-warning` 並更新 `textContent` 為「強制結束本輪」，且移除 `disabled` 屬性
- [x] 2.3 移除 `btnForceEndRound` 的 click handler（`addEventListener`）
- [x] 2.4 改寫 `btnFinishRound` 的 click handler：點擊時判斷 `completedCount === totalCount`，若是則顯示「確認完畢」對話框，若否則顯示「強制結束（含未完成桌數）」對話框，兩者確認後皆呼叫 `resetAndReturnToSetup()`
