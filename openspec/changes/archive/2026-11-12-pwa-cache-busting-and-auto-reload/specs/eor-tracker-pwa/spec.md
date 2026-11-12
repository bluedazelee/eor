## MODIFIED Requirements

### Requirement: 離線資源快取
系統 MUST 使用 Service Worker 快取所有必要的靜態資源，以確保在無網路連線 (離線) 時，網頁工具仍可正常載入與操作；同時在版本更新時 MUST 確保 HTML、CSS 與 JavaScript 資源版本同步，防止載入新舊混合的檔案：
- **靜態資源版本參數（Cache Busting）**：`index.html` 引用 `style.css` 與 `app.js` 時 SHALL 附帶版本查詢參數（如 `?v=25`），避免瀏覽器在新版 HTML 下直接沿用舊版 Disk Cache 的 JS/CSS。
- **安裝階段強制繞過瀏覽器快取**：`sw.js` 在 `install` 事件預先快取核心資源時，SHALL 使用 `{ cache: 'reload' }` 請求策略，確保從網路拉取最新檔案而非寫入瀏覽器本地舊快取。
- **快取比對忽略查詢參數**：`sw.js` 在 `fetch` 事件攔截同源請求並查詢快取時，SHALL 支援忽略 URL 查詢參數（`ignoreSearch: true`），確保帶有 `?v=` 的資源在離線時仍能穩定命中快取。
- **Service Worker 更新接管自動重新整理**：當頁面原先已受舊版 Service Worker 控制（`navigator.serviceWorker.controller` 存在），且新版 Service Worker 完成安裝並觸發 `controllerchange` 事件時，前端 SHALL 自動執行一次 `window.location.reload()`，確保畫面與記憶體中的腳本立即同步為最新版本。

#### Scenario: 離線時載入網頁
- **WHEN** 裝置處於無網路連線狀態且使用者重新整理或開啟本工具網頁（包含帶有 `?v=` 查詢參數的 `style.css` 與 `app.js` 請求）
- **THEN** Service Worker SHALL 攔截請求並從快取 (Cache Storage) 中傳回 `index.html`、`style.css` 與 `app.js`，使網頁仍能正常載入

#### Scenario: 版本更新時繞過瀏覽器舊快取並自動重新整理
- **WHEN** 系統發布新版本且使用者開啟受舊版 Service Worker 控制的頁面
- **THEN** 新版 Service Worker SHALL 以 `{ cache: 'reload' }` 下載最新核心資源，並在接管頁面（觸發 `controllerchange`）時自動重新整理頁面一次，使新版 HTML、CSS 與 JS 同步生效
