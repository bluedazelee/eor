## Why

目前主畫面底部同時顯示兩個功能相近的按鈕（「確認本輪處理完畢」與「強制結束本輪」），佔用空間且需要使用者自行判斷情境選擇，介面訊息不夠清晰。將兩者合併為一個自動切換的動態按鈕，讓按鈕在任何時刻都只呈現唯一且正確的操作，降低認知負擔。

## What Changes

- 刪除 `action-footer` 中的 `btn-force-end-round` 按鈕元素
- 原「確認本輪處理完畢」按鈕（`btn-finish-round`）改為動態按鈕：
  - **未全部完成時**：顯示「強制結束本輪」，套用 `btn-warning`（琥珀色），始終可點擊
  - **全部完成時**：自動切換為「確認本輪處理完畢」，套用 `btn-success`（綠色），可點擊
- 兩種狀態下的 confirm 對話框文字保持各自原有的措辭
- 切換邏輯掛載在現有的 `renderTrackerView()` 中，每次狀態更新時自動判斷

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

- `force-end-round`：「強制結束」改為情境式顯示（僅在未全部完成時出現），不再是獨立的常駐按鈕；全部完成後不再同時顯示兩個按鈕的場景已不存在
- `eor-tracker-core`：「確認本輪完成並重設」的觸發方式改變——不再是獨立按鈕在全部完成後啟用，而是動態按鈕在全部完成時自動切換為此模式

## Impact

- `index.html`：刪除 `btn-force-end-round` 元素；`btn-finish-round` 的初始 class 與文字調整
- `app.js`：`renderTrackerView()` 條件邏輯改為切換按鈕外觀與標籤；兩個 click handler 合併為一個
- `style.css`：無新增樣式需求，現有 `btn-success` / `btn-warning` 直接沿用
- `sw.js`：不涉及快取資源變更，無需更新版本號
