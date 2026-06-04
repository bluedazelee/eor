## Why

手機瀏覽時，setup 頁面因 `input[type="number"]` 缺少 `width: 100%` 導致水平溢出，整個頁面可左右滑動；同時兩個畫面皆缺乏視窗高度約束，tracker 頁面靠魔法數字 `calc(100vh - 280px)` 維持卡片格高度，容易在 dashboard 高度變化時失準。此次一併修正，確保應用在手機上的顯示行為符合預期。

## What Changes

- **修正 setup 頁水平溢出**：`.input-group input` 與 `.input-group select` 加上 `width: 100%`，讓欄位填滿所在的 grid cell，不再溢出容器
- **鎖定整體高度為視窗高度**：將 `html`、`body`、`.app-container` 從 `min-height: 100vh` 改為 `height: 100%`，搭配 `overflow: hidden` 確保外層頁面不產生 scrollbar
- **Setup 頁滾動行為**：`#setup-view` 改為 `overflow-y: auto`，內容放得下時不顯示 scrollbar；螢幕極小時允許垂直滾動，`.setup-card` 改用 `margin: auto` 在有空間時保持居中
- **Tracker 頁高度架構重構**：`#tracker-view` 改為 flex column，`.card-grid` 設 `flex: 1; min-height: 0; overflow-y: auto`，自然填滿剩餘空間，移除 `max-height: calc(100vh - 280px)` 魔法數字；`.dashboard-bar` 與 `.action-footer` 設 `flex-shrink: 0` 確保永遠可見

## Capabilities

### New Capabilities

- `mobile-layout`: 手機視窗下的 RWD 佈局規範，包含水平溢出防護、視窗高度約束、各畫面滾動行為

### Modified Capabilities

（無需求層級變更，現有功能行為不變）

## Impact

- **`style.css`**：唯一修改的檔案，所有變更皆為 CSS 規則調整
- **`sw.js`**：`style.css` 變更後需更新 Service Worker 快取版本號，確保使用者拿到新版樣式
- **HTML / JS**：不需修改
- **既有功能**：不影響，所有互動邏輯與狀態管理保持不變
