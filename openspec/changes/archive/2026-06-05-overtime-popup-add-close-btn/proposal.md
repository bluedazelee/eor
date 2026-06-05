## Why

加時標記彈出層目前唯一的關閉方式是點擊彈出層外部區域，在手機裝置上操作不直覺，容易誤觸其他桌號圖卡。新增右上角 ✕ 關閉按鈕可提供明確的離開入口。

## What Changes

- 將 `.overtime-popup-title` 改為 flex row 排版，標題文字靠左，✕ 按鈕靠右
- 新增 `#btn-overtime-close` 按鈕，點擊後關閉彈出層不儲存任何變更
- 既有的「點擊外部關閉」行為維持不變，兩者並存

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

- `overtime-table-marking`：彈出層新增右上角 ✕ 關閉按鈕

## Impact

- `index.html`：修改 `#overtime-popup-title` 結構，新增 `btn-overtime-close` 按鈕
- `style.css`：`.overtime-popup-title` 加 flex 排版；新增 `.btn-overtime-close` 樣式
- `app.js`：新增 `btnOvertimeClose` DOM reference 與 click 事件監聽器
- `sw.js`：PWA 快取版本號需更新
