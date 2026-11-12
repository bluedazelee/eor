## 1. HTML 結構與說明更新 (`index.html`)

- [x] 1.1 在 `index.html` 為 `style.css` 與 `app.js` 引用加上 `?v=25` 版本查詢參數
- [x] 1.2 在 `index.html` 移除 `#tracker-view` 中的 `.progress-bar-container`（`#progress-bar-fill`）進度條結構
- [x] 1.3 在 `index.html` 的 `#overtime-popup` 彈窗中新增「📺 標記為直播桌」切換按鈕（`#btn-stream-toggle`）
- [x] 1.4 更新 `index.html` 的 `#help-view`（更新「二、桌次狀態管理」與「三、加時與直播桌標記」加入直播桌說明、「四、儀表板統計」移除進度條描述、「七、批量設為已完成」與「八、巡場盤點」補充直播桌鎖定排除與滑動多選起點規則、「九、複製資訊」補充直播桌標註說明）

## 2. CSS 樣式調整 (`style.css`)

- [x] 2.1 在 `style.css` 移除 `.progress-bar-container` 與 `.progress-bar-fill` 樣式
- [x] 2.2 在 `style.css` 調大搜尋桌號數字鍵盤（`.search-numpad-popup`、`.search-numpad-title`、`.btn-numpad-x`、`.search-numpad-display`、`.numpad-grid`、`.numpad-btn`）的尺寸與字體比例
- [x] 2.3 在 `style.css` 新增直播桌卡片樣式（`.table-card-stream`）、直播徽章（`.stream-badge` 與 `.card-badges` 容器）、選取模式下 `.table-card-stream` 鎖定游標與樣式，以及長按彈窗中的 `#btn-stream-toggle` 按鈕樣式

## 3. JS 邏輯更新 (`app.js`)

- [x] 3.1 在 `app.js` 移除 `progressBarFill` DOM 參照與進度條寬度更新程式碼，並在 `registerServiceWorker()` 中新增 `controllerchange` 事件監聽（僅在頁面原本已有舊 `controller` 時觸發單次 `window.location.reload()`）
- [x] 3.2 在 `app.js` 實作直播桌（`isStream`）狀態管理：初始化與 `loadState` 向後相容補齊、長按彈窗 `#btn-stream-toggle` 標記/取消直播桌（含 `assigned` 自動轉回 `active` 與 Undo 支援）、卡片渲染 `.stream-badge`，以及 `cycleCardState()` 針對直播桌直接進行 `active ↔ completed` 二段切換並保留直播標記
- [x] 3.3 在 `app.js` 更新選取模式（批量完成與巡場盤點）鎖定與滑選邏輯：單點、全選、反選與巡場盤點 `getIncompleteTableNums()` 全面排除 `isStream === true` 的直播桌；同時允許在「已完成」或「直播桌」卡片上短壓（200ms）啟動滑動區間多選（預設 `dragTargetSelected = true` 選取模式，將滑過的可選取未完成桌次加入選取並略過已完成與直播桌）
- [x] 3.4 在 `app.js` 更新複製資訊函式（`buildOvertimeInfo()` 與 `buildRemainingInfo()`），對未完成的直播桌輸出 `桌號(直播)` 或 `桌號(直播+N分)` 格式

## 4. Service Worker 與文件同步 (`sw.js`, `README.md`)

- [x] 4.1 在 `sw.js` 將 `CACHE_NAME` 更新為 `'ptcg-eor-v25'`，於 `install` 事件使用 `new Request(url, { cache: 'reload' })` 強制繞過瀏覽器 HTTP 快取，並於 `fetch` 事件使用 `caches.match(event.request, { ignoreSearch: true })`
- [x] 4.2 同步更新 `README.md` 中的功能說明（直播桌標記、移除進度條描述、滑選起點規則與複製格式）
