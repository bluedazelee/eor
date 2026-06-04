## 1. HTML 結構

- [x] 1.1 在 `index.html` 的 `btn-copy-remaining` 按鈕後新增 `.copy-menu-popup` div，內含三個選項按鈕：`btn-copy-range`（本輪範圍）、`btn-copy-overtime`（加時桌次）、`btn-copy-detail`（詳細資訊），預設 `display: none`

## 2. CSS 樣式

- [x] 2.1 在 `style.css` 新增 `.copy-menu-popup` 樣式，仿 `.overtime-popup`（`position: fixed`、深色背景、藍色邊框、`z-index: 1000`）
- [x] 2.2 在 `style.css` 新增 `.copy-menu-item` 按鈕樣式（全寬、hover 高亮、與現有 `.btn-overtime-quick` 風格一致）

## 3. JS 邏輯

- [x] 3.1 在 `app.js` 頂部 DOM 元素區塊新增 `copyMenuPopup`、`btnCopyRange`、`btnCopyOvertime`、`btnCopyDetail` 四個 querySelector
- [x] 3.2 新增 `buildRangeInfo()` 函式，回傳 `{組別} {輪次} {起始}~{末尾}`
- [x] 3.3 新增 `buildOvertimeInfo()` 函式，回傳未完成加時桌的逐行字串；無加時桌時回傳 `null`
- [x] 3.4 修改 `buildRemainingInfo()` 首行，從僅 `{組別}` 改為 `{組別} {輪次} {起始}~{末尾}`
- [x] 3.5 新增 `showCopyMenu()` / `hideCopyMenu()` 函式，依按鈕位置以 `position: fixed` 定位選單並切換顯示
- [x] 3.6 將 `btnCopyRemaining` 的 click handler 改為呼叫 `showCopyMenu()` / toggle
- [x] 3.7 為 `btnCopyRange` 綁定 click：呼叫 `buildRangeInfo()`，複製並 alert，關閉選單
- [x] 3.8 為 `btnCopyOvertime` 綁定 click：呼叫 `buildOvertimeInfo()`，若 `null` 則 alert「目前無加時桻」，否則複製並 alert，關閉選單
- [x] 3.9 為 `btnCopyDetail` 綁定 click：呼叫 `buildRemainingInfo()`，複製並 alert，關閉選單
- [x] 3.10 在 `document` 上綁定 click 事件，點擊選單外部時呼叫 `hideCopyMenu()`
