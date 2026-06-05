## Why

新使用者或不熟悉工具的裁判，在賽事現場無法快速找到操作說明（例如長按加時、複製資訊格式差異），導致需要口頭詢問其他裁判。在工具內提供內建使用說明頁面，可讓使用者隨時查閱，降低學習門檻。

## What Changes

- 新增第三個畫面 `help-view`，以 SPA view-panel 模式切換，內含工具所有功能說明
- 在 `setup-view` 的設定表單底部新增次要按鈕「使用說明」，點擊後進入 help-view
- help-view 頂部提供「← 返回」按鈕，回到 setup-view
- 說明頁分為八個章節：開局設定、桌次狀態管理（含顏色 chip 視覺化）、加時桌標記、儀表板統計、篩選控制、複製資訊、結束本輪、離線與資料保存

## Capabilities

### New Capabilities
- `help-view`: 內建使用說明畫面，從 setup-view 進入，涵蓋所有功能操作說明，含視覺化狀態 chip 與加時徽章示意

### Modified Capabilities
<!-- 無現有規格需要變更 -->

## Impact

- **index.html**: 新增 `btn-help` 按鈕（setup-view 表單內）、新增 `help-view` section 及全部 HTML 內容
- **style.css**: 新增 `btn-secondary`、`btn-back`、`help-header`、`help-content`、`help-section`、`help-item`、`state-chip-*`、`overtime-badge-demo` 等樣式規則
- **app.js**: 新增 `helpView`、`btnHelp`、`btnHelpBack` DOM 參考、`showHelpView()` 函式、兩個 click 事件綁定；`showTrackerView()` 同步加入 `helpView.classList.add('hidden')` 防止殘留顯示
- **sw.js**: 無需更新快取版本號，help-view 內容內嵌於已快取的 `index.html` 中，不增加新的快取資源
