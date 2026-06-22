## Why

`closeSearchNumpad()` 在關閉 numpad 時檢查是否已有高亮卡片以決定是否啟動計時器，但兩個確認路徑（直接跳轉、篩選器確認後跳轉）都是在 `closeSearchNumpad()` 回傳後才加上 `table-card-highlight` class，導致計時器從未被啟動，高亮永遠不會消失。

## What Changes

- 修正直接確認路徑（`btnNumpadConfirm` handler）：在加上 `table-card-highlight` 後立即設定 1 秒計時器
- 修正篩選器確認路徑（`btnFilterConfirmOk` handler）：同上
- 移除 `closeSearchNumpad()` 內部檢查已有高亮並設計時器的邏輯，改由呼叫端負責設定計時器（關注點分離）

## Capabilities

### New Capabilities
<!-- 無新能力，此為純 bug fix -->

### Modified Capabilities

- `table-search`：不修改需求，需求本身已正確描述「高亮 1 秒後消失」；此次修正的是實作與需求不符的問題

## Impact

- 僅影響 `app.js` 中搜尋相關的 event handler（`btnNumpadConfirm`、`btnFilterConfirmOk`）及 `closeSearchNumpad()`
- 不涉及 HTML、CSS、localStorage、Service Worker，**不需更新 `sw.js` 版本號**
- 對使用者操作流程無影響，行為回歸至 spec 預期的狀態
