## Why

Tracker 頁上方的 dashboard-bar、搜尋列、批次操作列在手機螢幕上合計佔用超過 40% 的畫面高度，導致桌號卡片格線嚴重受壓（正常模式約 57%、批次模式約 47%），影響裁判在賽場上快速瀏覽與操作的效率。

## What Changes

- **壓縮 dashboard-bar**：將 round-indicator 與 stats 文字合併為同一水平行，縮減 padding / gap / margin，使 dashboard-bar 從三列縮為兩列（stats 列 + progress bar，加上下方的 control-row）
- **搜尋欄改為展開式**：移除常態顯示的搜尋輸入框，改在 control-row 最右側加入搜尋 icon 按鈕（🔍）；點擊後於 dashboard-bar 下方展開搜尋列，再次點擊或清空後收起
- **批次模式 dashboard 壓縮**：進入選取模式時，dashboard-bar 隱藏完整的 stats 與 control-row，改顯示一行簡要資訊（格式：`R1・12/50`）；退出批次模式後恢復完整顯示
- **批次模式隱藏搜尋 icon**：選取模式期間搜尋功能不適用，icon 一併隱藏
- **RWD 縮短按鈕文字**：螢幕寬度 ≤ 480px 時，透過 CSS `content` 覆寫顯示較短的標籤

  | 原文 | 手機顯示 |
  |------|---------|
  | 批量設為已完成 | 批量完成 |
  | 隱藏已完成桌號 | 隱藏完成 |
  | 只顯示加時桌 | 只顯示加時 |
  | 全選未完成 | 全選 |
  | 清除全選 | 清除 |

- **手機 padding 縮減**：app-header（18px → 10px）、app-main（20px → 12px）、action-footer 按鈕（14px → 10px）僅於 ≤ 480px 裝置套用

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

- `mobile-layout`：新增「card-grid 最低高度佔比」要求（正常模式 ≥ 70%，批次模式 ≥ 70%）；並更新 dashboard-bar 壓縮與 app-header/footer padding 縮減相關規範
- `table-search`：搜尋列從「始終可見」改為「展開式」——預設收起，透過 control-row 的 icon 按鈕切換顯示
- `batch-complete`：新增「進入選取模式時 dashboard 切換為簡要顯示」行為，退出後恢復完整 dashboard

## Impact

- `index.html`：control-row 新增搜尋 icon 按鈕；dashboard-bar 新增簡要資訊列（`.dashboard-compact-strip`）；搜尋欄外層增設展開容器
- `style.css`：dashboard-bar 壓縮樣式；搜尋欄展開/收起動畫；批次模式 compact strip 樣式；≤ 480px RWD 規則（含按鈕文字縮寫）
- `app.js`：搜尋 icon toggle 邏輯；批次模式進入/退出時切換 dashboard 顯示狀態
- `sw.js`：需更新快取版本號以使手機 PWA 取得最新樣式
