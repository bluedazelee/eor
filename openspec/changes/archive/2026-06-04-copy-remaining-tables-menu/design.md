## Context

「複製剩餘桌次資訊」按鈕目前直接複製固定格式的完整詳細字串。新需求要在點擊後先彈出三選一的選單，依使用者選擇決定複製內容。

現有 `.overtime-popup` 已定義了一套成熟的浮動選單樣式（`position: fixed`、深色背景、橘色邊框）。本設計沿用同一視覺語言，以新的 `.copy-menu-popup` class 實作複製選單。

## Goals / Non-Goals

**Goals:**
- 點擊按鈕彈出選單，提供「本輪範圍」、「加時桌次」、「詳細資訊」三個選項
- 各選項複製對應格式後以 alert 確認
- 「加時桌次」無加時桌時 alert「目前無加時桻」並不複製
- 點擊選單外部關閉選單

**Non-Goals:**
- 不新增鍵盤導航或無障礙強化
- 不更動複製內容以外的 state 邏輯

## Decisions

### 1. 選單 DOM 放置位置：獨立 div，position: fixed

與 `.overtime-popup` 相同，選單以 `position: fixed` 定位，以 JS 計算按鈕位置後設定 `top`/`left`。

**原因**：按鈕在 `filter-btns` 容器內，若用 `position: absolute` 需對容器加 `position: relative` 且可能被 overflow 截掉；fixed 方式與現有 overtime-popup 一致，不破壞現有 layout。

**替代方案**：在按鈕旁的 HTML 內嵌 relative dropdown——捨棄，因 `filter-btns` 是 flex 容器，加上 relative wrapper 會影響排版。

### 2. 選單開關邏輯：toggleCopyMenu()，單一 popup

同一時間最多只有一個 copy-menu-popup 顯示，重複點按鈕會關閉選單（toggle）。

**原因**：與 overtime-popup 的開關模式一致；不需要狀態機，簡單且可預期。

### 3. 「詳細資訊」首行格式

從原本的 `{組別}` 改為 `{組別} {輪次} {起始}~{末尾}`，對應 `buildDetailedInfo()` 函式。

原有的 `buildRemainingInfo()` 保持簽名不變，但內部第一行更新為新格式（所有呼叫點均受益）。

**原因**：詳細資訊就是「完整版」，包含範圍資訊後不需再看其他地方確認。

### 4. 「加時桌次」無結果行為：alert 而非空字串複製

若未完成桌中無加時桌，直接 alert「目前無加時桌」，不執行複製。

**原因**：複製空字串對裁判無意義，且與「本輪範圍」永遠有內容的語意不同，明確提示更清楚。

## Risks / Trade-offs

- **選單定位在鍵盤彈出時偏移**：iOS/Android 軟鍵盤不影響此功能（tracker view 不觸發鍵盤），風險低。
- **點外部關閉依賴 document click 冒泡**：若未來有 `stopPropagation` 的元素包住按鈕需注意，目前無此情況。
