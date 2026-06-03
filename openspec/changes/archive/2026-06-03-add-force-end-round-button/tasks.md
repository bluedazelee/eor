## 1. HTML 結構

- [x] 1.1 在 `index.html` 的 tracker-view 中，於「確認本輪處理完畢」按鈕旁新增「強制結束本輪」按鈕元素（id: `btn-force-end-round`）

## 2. CSS 樣式

- [x] 2.1 在 `style.css` 中新增 `btn-warning` class，使用警示色（橘/紅）區別於 `btn-success`

## 3. JavaScript 實作

- [x] 3.1 在 `app.js` 中將現有 `btnFinishRound` 的清除邏輯抽取為共用函式 `resetAndReturnToSetup(roundName)`
- [x] 3.2 將原 `btnFinishRound` 事件處理改為呼叫 `resetAndReturnToSetup()`
- [x] 3.3 新增 `btnForceEndRound` DOM 參考（對應 id `btn-force-end-round`）
- [x] 3.4 實作 `btnForceEndRound` 的 click 事件：計算未完成桌數，顯示含輪次名稱與未完成桌數的 `confirm()` 對話框，確認後呼叫 `resetAndReturnToSetup()`
- [x] 3.5 確認 `btnForceEndRound` 無需在 `renderTracker()` 中切換 disabled 狀態（永遠啟用）

## 4. 驗證

- [x] 4.1 測試有未完成桌號時點擊強制結束：確認對話框顯示正確的未完成桌數
- [x] 4.2 測試確認強制結束：確認清除 LocalStorage 並跳回起始畫面
- [x] 4.3 測試取消強制結束：確認狀態不變，主畫面維持原樣
- [x] 4.4 測試所有桌號已完成時：確認兩個按鈕均可點擊
