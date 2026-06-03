## 1. HTML 結構

- [x] 1.1 在 `index.html` 的 tracker-view 主畫面上方（按鈕區）新增「全部設為已完成」按鈕元素（id: `btn-mark-all-completed`）

## 2. CSS 樣式

- [x] 2.1 在 `style.css` 中為 `#btn-mark-all-completed` 套用既有按鈕樣式規範，視覺上與「確認本輪處理完畢」「強制結束本輪」區分

## 3. JavaScript 實作

- [x] 3.1 在 `app.js` 中新增 `btnMarkAllCompleted` DOM 參考（對應 id `btn-mark-all-completed`）
- [x] 3.2 新增 `markAllCompleted()` 函式：遍歷 `state.tables` 將每個 `table.state` 設為 `'completed'`，呼叫一次 `saveState()` 與 `renderTracker()`
- [x] 3.3 綁定 `btnMarkAllCompleted` 的 click 事件：以 `confirm()` 顯示二次確認對話框（含輪次名稱，說明將把所有桌號設為已完成），確認後呼叫 `markAllCompleted()`
- [x] 3.4 確認 `btnMarkAllCompleted` 無需在 `renderTracker()` 中切換 disabled 狀態（永遠啟用）

## 4. 驗證

- [x] 4.1 測試點擊「全部設為已完成」：確認顯示二次確認對話框
- [x] 4.2 測試確認後：所有桌號圖卡變為「已完成」，統計顯示「已完成 N / N 桌」、進度條 100%，且「確認本輪處理完畢」按鈕解鎖
- [x] 4.3 測試取消後：所有桌號狀態維持不變，不寫入 LocalStorage
- [x] 4.4 測試重新載入頁面：確認已完成狀態從 LocalStorage 正確還原
