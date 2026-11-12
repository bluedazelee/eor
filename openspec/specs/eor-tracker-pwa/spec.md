# Capability: eor-tracker-pwa

## Purpose
TBD

## Requirements

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

### Requirement: 支援安裝至主畫面
系統 MUST 提供 Web App Manifest 描述檔與合規的圖示設定，使得支援的瀏覽器（如 Chrome, Safari）能夠提示使用者安裝此工具。圖示 SHALL 包含 32×32（favicon）、192×192 與 512×512 三種尺寸，並以 `maskable` purpose 聲明，確保安全區合規。

#### Scenario: 提示安裝應用程式
- **WHEN** 使用者在相容的行動裝置或桌面瀏覽器中開啟本工具網頁
- **THEN** 瀏覽器 SHALL 識別 Manifest 檔案並提供「新增至主畫面」或「安裝應用程式」之選項，且安裝後會有獨立的應用程式視窗與自訂的 App 圖示

#### Scenario: 圖示涵蓋所有必要尺寸
- **WHEN** 瀏覽器或作業系統請求 PWA 圖示
- **THEN** manifest.json SHALL 聲明 192×192 與 512×512 兩個 PNG 圖示，且兩者均設定 `"purpose": "any maskable"`

#### Scenario: Favicon 連結正確
- **WHEN** 瀏覽器載入頁面並請求 favicon
- **THEN** `index.html` 的 `<link rel="icon">` SHALL 指向 `icons/icon-32.png`（32×32）
