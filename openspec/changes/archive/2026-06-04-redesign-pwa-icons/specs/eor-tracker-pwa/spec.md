## MODIFIED Requirements

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
