## Why

複製選單目前缺少一個介於「加時桌次」與「詳細資訊」之間的選項：只需知道剩餘桌數而不需要明細清單時，使用者必須複製詳細資訊再手動截取，流程不夠精簡。此外，所有選項的 alert 提示文字目前完全相同，難以辨識剛才複製的是哪一類資訊。

## What Changes

- **新增「剩餘桌次」複製選項**：顯示輪次 / 組別 / 範圍及剩餘桌數，不含加時桌與一般桌明細。
- **更新四個複製選項的 alert 提示文字**：各自顯示對應選項名稱，成功與失敗訊息均保留已複製（或待複製）的字串內容。

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

- `copy-remaining-tables-info`：新增「剩餘桌次」選項及其格式規格；更新四個選項的 alert 提示文字規格。

## Impact

- `index.html`：在複製選單中新增一顆按鈕（`btn-copy-remaining-count`），置於「加時桌次」與「詳細資訊」之間。
- `app.js`：新增 DOM ref、新增 `buildRemainingCountInfo()` 函式、新增事件監聽器；修改現有三個選項的 alert 文字。
- 不涉及 PWA 快取或 `sw.js` 版本號變更。
