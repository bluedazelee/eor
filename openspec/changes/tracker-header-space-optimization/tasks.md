## 1. HTML 結構重構

- [x] 1.1 重構 dashboard-bar 內部：新增 `.dashboard-stats-row`（flex 容器）包住 `#display-round` 與 `.stats-info`，使 round indicator 與 stats 文字合併為同一水平行
- [x] 1.2 新增 `.dashboard-compact-strip` 元素（含 `.compact-round` 與 `.compact-progress` span）於 `.dashboard-bar` 之後、`.table-search-bar` 之前
- [x] 1.3 在 `.filter-btns` 最右側新增搜尋 icon 按鈕 `#btn-search-toggle`（內容：🔍）
- [x] 1.4 為 `#btn-batch-complete`、`#btn-hide-completed`、`#btn-overtime-filter` 加入雙 span（`.label-long` / `.label-short`）
- [x] 1.5 為 `#btn-select-all-incomplete`、`#btn-select-clear` 加入雙 span（`.label-long` / `.label-short`）

## 2. CSS 樣式

- [x] 2.1 壓縮 `.dashboard-bar`：padding `16px 20px` → `10px 14px`，gap `12px` → `8px`，margin-bottom `20px` → `12px`
- [x] 2.2 新增 `.dashboard-stats-row` flex 排版樣式（align-items baseline、gap、讓 round display 與 stats text 在同一行）
- [x] 2.3 新增 `.dashboard-compact-strip` 樣式（預設 `display: none`；flex、align-items center；字型大小與間距）
- [x] 2.4 新增 `#tracker-view.selection-mode .dashboard-bar { display: none }` 與 `#tracker-view.selection-mode .dashboard-compact-strip { display: flex }` 規則
- [x] 2.5 新增 `#btn-search-toggle` 樣式（與 `.btn-filter` 同類型，加 `.active` 狀態樣式）；新增 `#tracker-view.selection-mode #btn-search-toggle { display: none }` 規則
- [x] 2.6 新增 `.label-short { display: none }` 與 `@media (max-width: 480px)` 下的 `.label-long { display: none }` / `.label-short { display: inline }` 規則
- [x] 2.7 在 `@media (max-width: 480px)` 中新增 `.app-header` padding 縮減（`18px` → `10px`）、`.app-main` padding 縮減（`20px` → `12px`）、`.btn` padding 縮減（`14px 24px` → `10px 16px`）

## 3. JS 邏輯

- [x] 3.1 在 app.js 頂部 querySelector 區段新增 `btnSearchToggle`、`dashboardCompactStrip`、`compactRound`、`compactProgress` 的 DOM 參考
- [x] 3.2 實作搜尋 icon toggle 邏輯：點擊 `#btn-search-toggle` 切換 `.table-search-bar` 的可見性；展開時 focus input；收起時清除搜尋結果與高亮
- [x] 3.3 在進入批次選取模式時（現有邏輯）：在 `#tracker-view` 加上 `.selection-mode` class；若搜尋列展開則強制收起並清除高亮；更新 `.dashboard-compact-strip` 文字（`R{輪次}・{完成數}/{總數}`）
- [x] 3.4 在退出批次選取模式時（取消 / 確認執行）：移除 `#tracker-view` 的 `.selection-mode` class

## 4. PWA 快取更新

- [x] 4.1 更新 `sw.js` 的快取版本號，確保 PWA 安裝裝置可取得新版 CSS 與 HTML
