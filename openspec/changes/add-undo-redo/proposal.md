## Why

Tracker 頁面的所有操作（單桌點擊切換狀態、長按設定加時、全部設為已完成）目前皆為不可逆操作，在比賽現場高壓情境下誤操作後無法快速還原，增加裁判負擔。

## What Changes

- 在 tracker-view 的 control-row 左側新增 ↩（復原）和 ↪（重做）兩個純圖示按鈕
- 新增 Undo/Redo 歷史堆疊機制，涵蓋所有會修改 `state.tables` 的操作
- 無可復原/重做步驟時，按鈕以 opacity 0.3 呈現並停用互動
- 在說明頁面（help-view）新增「復原與重做」章節

## Capabilities

### New Capabilities

- `undo-redo`: 操作歷史堆疊，支援對 tables 狀態的復原與重做，含 UI 按鈕與說明文件

### Modified Capabilities

（無）

## Impact

- `app.js`：新增 undoStack / redoStack 管理邏輯，並在 `cycleCardState()`、`setOvertime()`、`markAllCompleted()` 三處加入快照 hook
- `index.html`：control-row 新增兩個按鈕元素
- `style.css`：新增復原/重做按鈕樣式（disabled 狀態 opacity）
- `sw.js`：快取版本號需更新以確保新版 HTML/JS/CSS 正確載入
- 說明頁面（help-view）：新增章節說明
