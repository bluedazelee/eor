## 1. 修正表單欄位水平溢出（style.css）

- [x] 1.1 在 `.input-group input` 規則內加上 `width: 100%`
- [x] 1.2 在 `.input-group select` 規則內加上 `width: 100%`

## 2. 鎖定整體高度為視窗高度（style.css）

- [x] 2.1 新增 `html` 規則：`height: 100%; overflow: hidden`
- [x] 2.2 將 `body` 的 `min-height: 100vh` 改為 `height: 100%`，並加上 `overflow: hidden`
- [x] 2.3 將 `.app-container` 的 `min-height: 100vh` 改為 `height: 100%`
- [x] 2.4 在 `.app-main` 加上 `min-height: 0; overflow: hidden`

## 3. Setup 頁滾動行為（style.css）

- [x] 3.1 將 `#setup-view` 的 `justify-content: center` 移除，加上 `overflow-y: auto`
- [x] 3.2 在 `.setup-card` 加上 `margin: auto`

## 4. Tracker 頁高度架構重構（style.css）

- [x] 4.1 在 `#tracker-view` 加上 `display: flex; flex-direction: column; height: 100%; overflow: hidden`
- [x] 4.2 在 `.dashboard-bar` 加上 `flex-shrink: 0`
- [x] 4.3 將 `.card-grid` 的 `max-height: calc(100vh - 280px)` 移除，加上 `flex: 1; min-height: 0`
- [x] 4.4 在 `.action-footer` 加上 `flex-shrink: 0`
- [x] 4.5 移除 `@media (max-width: 480px)` 內 `.card-grid` 的 `max-height: calc(100vh - 270px)`

## 5. 更新 Service Worker 快取版本號（sw.js）

- [x] 5.1 更新 `sw.js` 內的快取版本號（例如 `v1` → `v2`），確保已安裝 PWA 取得新版 style.css
