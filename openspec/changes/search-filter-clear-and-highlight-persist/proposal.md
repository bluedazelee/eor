## Why

兩項搜尋體驗缺口：

1. **篩選器遮擋問題**：當搜尋的桌號被篩選器（「隱藏完成」、「只顯示加時」、或範圍標籤）隱藏時，系統只顯示靜態提示訊息，使用者必須手動關閉篩選器再重新搜尋，操作中斷。改為自動偵測並清除相關篩選器後直接跳轉，並在 numpad 訊息區說明已清除哪個篩選。

2. **關閉彈窗後高亮立即消失**：關閉 numpad 後，卡片高亮立即被清除，使用者來不及確認跳轉目標的位置。延遲 1 秒後才清除，讓使用者有充裕時間辨認目標卡片。

## What Changes

- **篩選器自動清除**：`handleTableSearch()` 在發現卡片不在 DOM 時，逐一判斷三個篩選器是否為遮擋原因，有罪則清除，呼叫 `renderTracker()`，再跳轉高亮；numpad 訊息顯示「已清除篩選，跳轉至桌號 X」
- **關閉後高亮延遲清除**：`closeSearchNumpad()` 若目前有高亮卡片，改為 1 秒後才呼叫 `clearSearchHighlight()`；若無高亮則立即清除
- **重新開啟立即重置**：`openSearchNumpad()` 先取消任何待執行的延遲清除計時器，再立即清除現有高亮，確保乾淨起始狀態
- 新增 `highlightClearTimer` 頂層變數管理計時器生命週期

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

- `numpad-search`：搜尋目標被篩選器遮擋時的行為改善；關閉彈窗後的高亮持續行為

## Impact

- `app.js`：修改 `handleTableSearch()`、`closeSearchNumpad()`、`openSearchNumpad()`；新增 `highlightClearTimer` 變數
- `sw.js`：不涉及快取資源變更，無需更新版本號
