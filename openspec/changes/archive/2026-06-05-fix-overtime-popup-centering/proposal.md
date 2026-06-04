## Why

在手機裝置上長按桌號圖卡開啟的加時設定彈出層，目前以「錨定圖卡 + JS 手動計算座標」方式定位。但定位邏輯寫死彈出層寬度（`popupW = 220`），CSS 又未設 `max-width`，導致裁切基準與實際渲染寬度不一致：長按靠近左右邊緣的圖卡時彈出層會溢出畫面，甚至長按畫面中央的圖卡也會略微溢出，造成裁判看不到完整選項。

## What Changes

- 加時彈出層不再錨定圖卡計算座標，改為**畫面置中**（沿用既有 `.copy-menu-popup` 的純 CSS 置中模式：`position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%)`），數學上不可能溢出視窗。
- 彈出層加上 `max-width: calc(100vw - 16px)`，在極窄螢幕上仍保留邊界保險。
- 為補回「指向哪張桌」的視覺連結，彈出層標題改為動態顯示桌號，例如「設定加時 · 桌 12」。
- 移除 `showOvertimePopup()` 中以 `getBoundingClientRect()` 計算 `left`/`top` 與翻轉裁切的程式碼。
- 其餘行為完全不變：長按 500ms 觸發、移動超過 10px 取消、+3／+6／+9 快選、自訂分鐘、清除標記、點擊外部關閉。

## Capabilities

### New Capabilities

（無新 capability）

### Modified Capabilities

- `overtime-table-marking`：加時標記彈出層的定位方式由「錨定圖卡並確保不超出視窗」改為「畫面置中」；彈出層標題改為顯示對應桌號。

## Impact

- `style.css`：修改 `.overtime-popup`，改為置中定位並新增 `max-width`。
- `app.js`：簡化 `showOvertimePopup()`，移除座標計算；於開啟時將桌號寫入彈出層標題。
- `index.html`：`.overtime-popup-title` 改為可由 JS 更新桌號（必要時加上 id）。
- `sw.js`：無新增靜態資源，無需更新快取版本號。
