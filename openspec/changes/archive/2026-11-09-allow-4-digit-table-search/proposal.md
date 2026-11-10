## Why

目前搜尋桌號的數字鍵盤限制最多只能輸入 3 個數字（最高 `999`），當賽事桌號達到 4 位數（例如 `1000`～`9999`）時，裁判無法透過搜尋功能輸入完整桌號並跳轉定位。需要將搜尋輸入上限擴充至 4 位數以支援大型賽事或 4 位數桌號編碼。

## What Changes

- 將數字鍵盤搜尋緩衝區（`searchBuffer`）的最大長度限制由 3 位數調整為 4 位數（支援輸入最高至 `9999`）。
- 使用者操作流程維持不變：點擊 🔍 開啟數字鍵盤，現在可連續點擊最多 4 個數字鍵，再按「確定」執行搜尋跳轉。
- 更新 `sw.js` 的 PWA 快取版本號（`ptcg-eor-v20` → `ptcg-eor-v21`），確保已安裝 PWA 的裝置能取得更新後的 `app.js`。

## Capabilities

### New Capabilities
<!-- 無新增 capability -->

### Modified Capabilities
- `table-search`: 補充並規範數字鍵盤輸入位數上限為 4 位數（最多可輸入 4 個數字字元，超過時忽略後續數字鍵輸入）。

## Impact

- `app.js`：修改 `.numpad-btn[data-digit]` 點擊事件中的 `searchBuffer.length` 上限檢查（`>= 3` 改為 `>= 4`）。
- `sw.js`：更新 `CACHE_NAME` 版本號以觸發快取更新。
