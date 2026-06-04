## Context

加時彈出層（`.overtime-popup`）目前以 `position: fixed` 搭配 JS 計算座標的方式錨定於被長按的圖卡下方／上方。`showOvertimePopup()` 內讀取圖卡的 `getBoundingClientRect()`，水平方向以寫死的 `popupW = 220` 估算寬度做裁切，垂直方向以量測的 `offsetHeight` 判斷是否翻轉至圖卡上方。

問題在於：寬度是寫死估計值而非量測值，與 CSS（`min-width: 200px` 且無 `max-width`、`box-sizing: border-box`）的實際渲染寬度不一致。當實際寬度大於 220 時，水平裁切的右邊界算錯，靠近邊緣的圖卡彈出層溢出畫面；中央圖卡也因基準偏差而略微溢出。

同專案的複製選單（`.copy-menu-popup`）採用純 CSS 置中（`top/left: 50% + translate(-50%, -50%)`），完全不算座標、數學上不可能溢出，是已驗證的成熟模式。本設計將加時彈出層改用同一模式。

## Goals / Non-Goals

**Goals:**
- 加時彈出層在任何螢幕尺寸、任何被長按圖卡位置下都不超出可視範圍。
- 沿用既有 `.copy-menu-popup` 的置中模式，與專案 UI 一致。
- 以彈出層標題顯示桌號，補回「指向哪張桌」的視覺連結。
- 保留所有現有互動行為（長按觸發、移動取消、快選、自訂、清除、點外部關閉）。

**Non-Goals:**
- 不改動加時值的儲存邏輯與狀態機。
- 不新增鍵盤導航或無障礙強化。
- 不改為底部彈出面板（bottom-sheet）；該方案改動較大，本次不採用。

## Decisions

### 1. 定位方式：純 CSS 置中，移除 JS 座標計算

`.overtime-popup` 改為 `position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);`，與 `.copy-menu-popup` 一致。`showOvertimePopup()` 移除 `getBoundingClientRect()`、`popupW`、`popupH`、`left`/`top` 計算與翻轉裁切整段。

**原因**：交給瀏覽器置中，只要寬度小於視窗即不可能溢出；徹底消除「寫死寬度 vs 實際寬度」這類脆弱計算。

**替代方案**：保留錨定式但改為量測 `offsetWidth` + 加 `max-width` + 改用 `visualViewport`。捨棄，因計算式天生脆弱、且使用者已接受置中方案。

### 2. `anchorElement` 參數處理

`showOvertimePopup(tableNumber, anchorElement)` 的 `anchorElement` 在置中後不再需要。實作時移除該參數，並同步更新 `attachLongPress()` 內的呼叫點 `showOvertimePopup(tableNumber, cardElement)`。

**原因**：移除未使用參數，保持函式簽名與實際用途一致，避免誤導後續維護者。

### 3. 標題顯示桌號

彈出層標題由靜態文字「設定加時（分鐘）」改為動態「設定加時 · 桌 {number}」，於 `showOvertimePopup()` 開啟時寫入。為此 `.overtime-popup-title` 需要可被 JS 取得的參照（在 `index.html` 加上 id，並於 `app.js` 頂部 DOM 區塊新增 querySelector）。

**原因**：置中後失去與圖卡的空間關聯，標題顯示桌號可明確讓裁判確認正在為哪一桌設定加時。

### 4. `max-width` 邊界保險

`.overtime-popup` 新增 `max-width: calc(100vw - 16px)`。

**原因**：極窄螢幕或未來內容變寬時，避免彈出層寬度超過視窗仍造成置中後左右溢出。

## Risks / Trade-offs

- **失去指向性**：置中後無法從位置看出對應哪張桌——以標題顯示桌號補回，風險低。
- **與加時徽章視覺距離變遠**：使用者長按後視線需移至畫面中央；但彈出層為臨時 modal 式互動，操作時間短，影響有限。
- **軟鍵盤遮擋自訂輸入欄**：置中彈出層在手機鍵盤彈出時可能被部分遮擋。此風險在原錨定式同樣存在，本次不處理；若日後成為問題再評估。
