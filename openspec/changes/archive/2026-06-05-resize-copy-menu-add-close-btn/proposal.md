## Why

複製選單目前視覺偏緊湊，在手機裝置上不易操作；且選單缺乏明確關閉入口，手機使用者必須點擊選單外部才能關閉，操作不直覺。

## What Changes

- 調整 `.copy-menu-popup` 的 padding、gap、min-width，使視覺大小接近加時彈出框（`.overtime-popup`）
- 新增 `.copy-menu-close` CSS 樣式：以 `border-top` 分隔線與上方選項隔開，字色偏灰、低調
- 在複製選單底部新增「關閉」按鈕（第四個選項），點擊後關閉選單不執行任何複製
- 此關閉按鈕不影響既有的「點擊選單外部關閉」行為，兩者並存

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

- `copy-remaining-tables-info`：選單新增第四個「關閉」選項，並調整選單整體視覺尺寸

## Impact

- `style.css`：修改 `.copy-menu-popup`、`.copy-menu-item`；新增 `.copy-menu-close`
- `index.html`：在 `#copy-menu-popup` 內新增 `btn-copy-close` 按鈕
- `app.js`：新增 `btnCopyClose` DOM reference 與 click 事件監聽器
- `sw.js`：靜態資源快取版本號需更新（sw.js 的 CACHE_NAME）
