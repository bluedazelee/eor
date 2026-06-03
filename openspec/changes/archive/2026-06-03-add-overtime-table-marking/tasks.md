## 1. 資料結構

- [x] 1.1 在 `app.js` 的 table 物件初始化中新增 `overtimeMinutes: null` 欄位
- [x] 1.2 確認 `loadState()` 載入舊資料時，若缺少 `overtimeMinutes` 欄位則補預設值 `null`（向下相容）

## 2. HTML 結構

- [x] 2.1 在 `index.html` 的 `dashboard-bar` 中新增「只顯示加時桌」切換按鈕（id: `btn-overtime-filter`）
- [x] 2.2 在 `index.html` 的 `body` 末端新增加時標記浮動彈出層 HTML（id: `overtime-popup`），內含 +3/+6/+9 快選按鈕、數字輸入欄位、確認按鈕、清除標記按鈕

## 3. CSS 樣式

- [x] 3.1 新增 `.overtime-badge` 樣式（加時徽章，顯示於圖卡上，與加時顏色區分）
- [x] 3.2 新增 `#overtime-popup` 浮動彈出層樣式（定位、背景、陰影、z-index）
- [x] 3.3 新增彈出層內快選按鈕、輸入欄位、確認/清除按鈕的樣式
- [x] 3.4 新增 `#btn-overtime-filter` 的啟用狀態樣式（`.active` class，視覺上有明顯區別）

## 4. 長按偵測

- [x] 4.1 在 `app.js` 中新增 `attachLongPress(cardElement, tableNumber)` 函式，使用 `pointerdown`/`pointerup`/`pointermove`/`pointercancel` 偵測 500ms 長按，移動超過 10px 取消
- [x] 4.2 長按觸發後設 `longPressTriggered = true` 旗標，在 `card.addEventListener('click', ...)` 中判斷旗標並於觸發後重設
- [x] 4.3 在 `renderTracker()` 的圖卡建立流程中呼叫 `attachLongPress()`

## 5. 加時標記彈出層邏輯

- [x] 5.1 實作 `showOvertimePopup(tableNumber, anchorElement)` 函式：計算定位（clamp 至 viewport 邊界）、顯示彈出層、依是否已有加時值決定是否顯示清除按鈕
- [x] 5.2 實作 `closeOvertimePopup()` 函式，關閉彈出層並移除外部點擊監聽
- [x] 5.3 綁定彈出層內 +3/+6/+9 快選按鈕：呼叫 `setOvertime(tableNumber, value)` 後關閉彈出層
- [x] 5.4 綁定確認按鈕：讀取數字輸入欄位值，驗證為正整數後呼叫 `setOvertime()` 並關閉，否則保持開啟
- [x] 5.5 綁定清除標記按鈕：呼叫 `setOvertime(tableNumber, null)` 後關閉彈出層
- [x] 5.6 實作外部點擊關閉：彈出層開啟時於 `document` 加入一次性 `pointerdown` 監聽，點擊彈出層外部時呼叫 `closeOvertimePopup()`

## 6. 加時值存取

- [x] 6.1 實作 `setOvertime(tableNumber, value)` 函式：更新 `state.tables` 中對應桌號的 `overtimeMinutes`，呼叫 `saveState()` 與 `renderTracker()`

## 7. 圖卡渲染

- [x] 7.1 在 `renderTracker()` 的圖卡建立流程中，若 `table.overtimeMinutes !== null`，新增顯示「+N分」的 `.overtime-badge` 元素

## 8. 篩選邏輯

- [x] 8.1 在 `app.js` 模組作用域新增 `let showOvertimeOnly = false` 狀態變數
- [x] 8.2 新增 `btnOvertimeFilter` DOM 參考（對應 id `btn-overtime-filter`）
- [x] 8.3 綁定 `btnOvertimeFilter` click 事件：切換 `showOvertimeOnly`，切換按鈕 `.active` class，呼叫 `renderTracker()`
- [x] 8.4 在 `renderTracker()` 的可見性判斷中加入 `showOvertimeOnly` 條件：`visible = (showOvertimeOnly ? table.overtimeMinutes !== null : true) && (!chkShowCompleted.checked ? table.state !== 'completed' : true)`

## 9. 驗證

- [x] 9.1 測試長按圖卡彈出加時標記 UI，快選 +3/+6/+9 正確儲存並顯示徽章
- [x] 9.2 測試手動輸入自訂值及無效值處理
- [x] 9.3 測試長按已標記圖卡顯示清除按鈕，點擊清除後移除徽章
- [x] 9.4 測試點擊彈出層外部關閉，不修改加時值
- [x] 9.5 測試「只顯示加時桌」按鈕啟用/停用切換
- [x] 9.6 測試複合篩選：只顯示加時桌啟用 + 取消勾選已完成 → 僅顯示未完成加時桌
- [x] 9.7 確認長按後不觸發狀態循環
- [x] 9.8 確認加時值在重新載入後從 LocalStorage 正確還原
