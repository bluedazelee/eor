# Capability: eor-tracker-pwa

## Purpose
TBD

## Requirements

### Requirement: 離線資源快取
系統 MUST 使用 Service Worker 快取所有必要的靜態資源，以確保在無網路連線 (離線) 時，網頁工具仍可正常載入與操作。

#### Scenario: 離線時載入網頁
- **WHEN** 裝置處於無網路連線狀態且使用者重新整理或開啟本工具網頁
- **THEN** Service Worker SHALL 攔截請求並從快取 (Cache Storage) 中傳回 index.html、style.css 與 app.js，使網頁仍能正常載入

### Requirement: 支援安裝至主畫面
系統 MUST 提供 Web App Manifest 描述檔與合規的圖示設定，使得支援的瀏覽器（如 Chrome, Safari）能夠提示使用者安裝此工具。

#### Scenario: 提示安裝應用程式
- **WHEN** 使用者在相容的行動裝置或桌面瀏覽器中開啟本工具網頁
- **THEN** 瀏覽器 SHALL 識別 Manifest 檔案並提供「新增至主畫面」或「安裝應用程式」之選項，且安裝後會有獨立的應用程式視窗與自訂的 App 圖示
