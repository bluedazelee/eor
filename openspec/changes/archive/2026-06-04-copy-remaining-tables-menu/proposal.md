## Why

目前「複製剩餘桌次資訊」按鈕一律複製完整詳細格式，但裁判在不同情境下只需要特定資訊：宣告範圍時只需組別輪次桌號段；確認加時狀況時只需加時桌列表。提供選單讓裁判一步選出所需格式，減少複製後還需手動刪節的摩擦。

## What Changes

- 「複製剩餘桌次資訊」按鈕點擊後不再直接複製，改為彈出選單（仿 `.overtime-popup` 樣式）
- 選單提供三個選項：
  - **本輪範圍**：複製 `{組別} {輪次} {起始桌號}~{末尾桌號}`，例如 `大師A R1 1~50`
  - **加時桌次**：複製未完成加時桌清單（`桌號(+N分)` 逐行）；若無加時桌則 alert「目前無加時桌」而不複製
  - **詳細資訊**：複製原有完整格式，但首行改為 `{組別} {輪次} {起始桌號}~{末尾桌號}`
- 各選項複製成功後均以 alert 顯示已複製內容（與現有行為一致）
- 點擊選單外部區域關閉選單

## Capabilities

### New Capabilities

（無新 capability）

### Modified Capabilities

- `copy-remaining-tables-info`：複製行為改為先顯示選單再依選項複製，並新增「本輪範圍」與「加時桌次」兩種格式；「詳細資訊」首行加入輪次與桌號範圍

## Impact

- `index.html`：在 `btn-copy-remaining` 附近新增選單 DOM 結構
- `app.js`：重構 `btnCopyRemaining` click handler，新增選單顯示/隱藏邏輯與三個複製函式
- `style.css`：新增 `.copy-menu-popup` 及相關樣式（仿 `.overtime-popup`）
- `sw.js`：靜態資源未新增，無需更新快取版本號
