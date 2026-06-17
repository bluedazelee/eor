## Why

經過多次 UI 調整後，app-header 與 action-footer 仍使用較寬鬆的 padding，在桌面版留有過多空白；說明頁面的搜尋功能說明與批量操作說明已與實際 UI 不符（搜尋改為展開式、批次模式新增篩選功能），需要同步更新。

## What Changes

**CSS 縮減空間：**
- `app-header` padding 全域統一為 `10px 20px`（原桌面版 `18px 20px`），移除 `@media (max-width: 480px)` 中對 header 的重複覆寫
- `.btn` (action-footer 按鈕) 全域 padding 從 `14px 24px` 縮減為 `10px 20px`，`@media (max-width: 480px)` 的 `10px 16px` 維持不變
- `.pokeball-icon` font-size 從 `1.4rem` 縮為 `1.2rem`；`.app-header h1` font-size 從 `1.25rem` 縮為 `1.1rem`

**說明頁面更新（index.html）：**
- 五、搜尋桌號：說明改為展開式搜尋 icon，描述點擊 🔍 展開/關閉搜尋欄位
- 七、批量設為已完成：新增說明批次模式資訊列顯示已選桌數與進度；補充篩選器（隱藏完成、只顯示加時）在批次模式下仍可操作

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

- `mobile-layout`：app-header 與 action-footer 高度縮減，全裝置統一（修改現有需求）
- `help-view`：說明內容更新（搜尋、批量操作章節）

## Impact

- `style.css`：修改 `.app-header` padding、`.btn` padding、`.pokeball-icon` font-size、`.app-header h1` font-size；更新 `@media (max-width: 480px)` 中的 `.app-header` 覆寫（移除或調整）
- `index.html`：更新 help-view 的五、七兩章節文字
- `sw.js`：版本號 bump（v15 → v16）
