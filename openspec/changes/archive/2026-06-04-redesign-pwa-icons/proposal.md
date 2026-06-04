## Why

目前的 PWA 圖示使用預設佔位圖，缺乏品牌識別度。新設計以「Tracker 格線」與「EoR 文字」為要素，建立符合 app 功能定位的像素風視覺識別，提升安裝至主畫面後的專業感。

## What Changes

- 新增像素風六邊形 badge 圖示，以 SVG 定義、輸出為 PNG
- 圖示融入兩個設計要素：格線紋理（象徵 Tracker 追蹤功能）+ 像素字型「EoR」
- 色彩採用 app 現有紫藍色調（`#4f46e5` 系列）
- 輸出 `icons/icon-192.png`、`icons/icon-512.png` 取代現有圖示
- 新增 `icons/icon-32.png` 作為 favicon
- 更新 `index.html` 的 favicon link
- 更新 `sw.js` 快取版本號以確保使用者取得新圖示

## Capabilities

### New Capabilities
- `pwa-icon-design`: 定義 PWA 圖示的設計規格，包含尺寸、安全區、像素縮放規則與色彩 token

### Modified Capabilities
- `eor-tracker-pwa`: 補充圖示規格要求（尺寸涵蓋 32/192/512，maskable 安全區符合 PWA 標準）

## Impact

- 靜態資源：`icons/icon-32.png`（新增）、`icons/icon-192.png`（替換）、`icons/icon-512.png`（替換）
- `index.html`：更新 favicon href
- `sw.js`：版本號 bump（CACHE_NAME 常數）
- `manifest.json`：可選——新增 32×32 icon entry
