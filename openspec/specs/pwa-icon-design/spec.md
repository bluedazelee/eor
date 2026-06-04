# Capability: pwa-icon-design

## Purpose
TBD

## Requirements

### Requirement: 像素風六邊形圖示設計
系統 MUST 提供以像素藝術風格設計的 PWA 圖示，視覺要素包含六邊形 badge 外框、格線紋理（象徵 Tracker 追蹤功能）以及像素字型的「EoR」文字。

#### Scenario: 圖示視覺要素完整
- **WHEN** 查看任何尺寸的 PWA 圖示
- **THEN** 圖示 SHALL 包含：水平六邊形輪廓、規則格線底紋、置中的「EoR」像素字型文字

#### Scenario: 圖示色彩符合品牌規範
- **WHEN** 查看 PWA 圖示
- **THEN** 圖示 SHALL 使用指定色彩：外部背景 `#0b0b16`、六邊形主色 `#4f46e5`、邊框 `#7c3aed`、格線 `#6366f1`（透明度 60%）、文字 `#f1f2f6`

### Requirement: 多尺寸圖示輸出
系統 MUST 提供三種解析度的 PNG 圖示，以支援不同裝置與用途。

#### Scenario: Favicon 尺寸
- **WHEN** 瀏覽器請求 favicon
- **THEN** 系統 SHALL 提供 32×32 像素的 `icons/icon-32.png`

#### Scenario: 主畫面安裝圖示（小）
- **WHEN** 裝置需要標準 PWA 安裝圖示
- **THEN** 系統 SHALL 提供 192×192 像素的 `icons/icon-192.png`，為 32×32 基礎設計的 6 倍整數放大

#### Scenario: 主畫面安裝圖示（大）
- **WHEN** 裝置需要高解析度 PWA 安裝圖示或啟動畫面
- **THEN** 系統 SHALL 提供 512×512 像素的 `icons/icon-512.png`，為 32×32 基礎設計的整數倍放大，保留像素藝術外觀

### Requirement: Maskable 圖示安全區合規
系統 MUST 確保圖示設計在 maskable 模式下，核心視覺要素（六邊形與文字）位於安全區內，不被裁切。

#### Scenario: Maskable 安全區內容完整
- **WHEN** PWA 以 maskable 模式顯示圖示（可能裁切為圓形或其他形狀）
- **THEN** 六邊形外框與「EoR」文字 SHALL 完整落在圖示中心 80% 的安全圓形區域內

### Requirement: 圖示可重現生成
系統 MUST 提供可重現圖示 PNG 的生成工具，且不依賴外部設計軟體或 Node.js 環境。

#### Scenario: 在瀏覽器中生成圖示
- **WHEN** 開啟 `tools/generate-icons.html` 於現代瀏覽器
- **THEN** 頁面 SHALL 自動生成三個尺寸的圖示預覽，並提供下載連結，使設計師可重新生成最新版圖示
