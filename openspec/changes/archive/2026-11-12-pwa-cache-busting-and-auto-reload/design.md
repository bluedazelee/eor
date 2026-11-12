## Context

1. **PWA 快取同步問題**：本專案透過 `sw.js` 採用 Cache-First 策略提供離線能力，但在版本更新時容易發生新版 HTML 讀取到瀏覽器 HTTP Disk Cache 或舊版 SW 快取的舊 `app.js` / `style.css`。
2. **搜尋桌號數字鍵盤尺寸**：目前 `.search-numpad-popup` 寬度僅 `220px`、按鍵字體 `1.1rem`、padding `12px 0`，在手機螢幕中比例偏小，需要調大彈窗與按鍵比例。
3. **移除上方進度條**：`#dashboard-bar` 中除了「已完成 X / Y 桌 (Z%) | 剩餘 W 桌」文字外，還有一條 8px 高的 `.progress-bar-container`。移除該進度條可精簡頂部空間，讓卡片格線獲得更多垂直可視範圍。
4. **已完成桌次與直播桌作為滑選起點**：在「批量完成」與「巡場盤點」中，雖然已完成桌次與直播桌不可被選取，但裁判手指短壓（200ms）在這些卡片上並滑向鄰近卡片時，仍應觸發滑動區間多選（預設為「選取」模式，將滑過的可選取未完成桌次選取起來，並略過已完成桌次與直播桌）。
5. **新增「直播桌（Stream Table）」標記功能**：直播桌在實務上由轉播/舞台裁判獨立控管，不屬於巡場裁判分配與盤點的範圍。需在長按彈窗提供標記/取消直播桌功能：
   - 標記後在一般模式下單點直接切換 `尚未結束 (active)` ↔ `已完成 (completed)`（跳過 `已分配` 且保留直播標記）。
   - 在「批量完成」與「巡場盤點」中比照已完成桌次完全鎖定，不可選取、亦不會被巡場盤點自動設為已完成。
   - 複製資訊（📋）時標註 `N(直播)` 或 `N(直播+M分)`。
   - 每輪開始時清空重設。

## Goals / Non-Goals

**Goals:**
- 為 `index.html` 的 `style.css` 與 `app.js` 加上 `?v=25` 查詢參數，搭配 `sw.js` 的 `{ cache: 'reload' }`、`{ ignoreSearch: true }` 及 `app.js` 的 `controllerchange` 自動 reload。
- 放大 `#search-numpad-popup` 寬度（提升至 `300px`）與內部顯示框、0–9 數字按鍵、退格/確定鍵的高度與字級。
- 從 `index.html`、`style.css`、`app.js` 移除上方進度條（`#progress-bar-fill` / `.progress-bar-container`）。
- 實作 `isStream` 桌次標記屬性、長按彈窗切換按鈕、卡片 `📺 直播` 徽章、一般模式二段切換、選取模式與巡場盤點鎖定排除，以及複製資訊標註。
- 允許在已完成或直播桌卡片上短壓 200ms 啟動滑動多選（預設為 `dragTargetSelected = true` 選取模式），滑過區間內可選取未完成桌次時加入選取。
- 同步更新 `help-view` 與 `README.md` 說明。

**Non-Goals:**
- 不跨輪次持久化直播桌號（每輪開始時重置為 `isStream: false`）。

## Decisions

### 1. PWA 防舊快取三層保護
- **決策**：
  1. `index.html` 引用 `style.css?v=25` 與 `app.js?v=25`。
  2. `sw.js` 在 `install` 使用 `ASSETS_TO_CACHE.map(url => new Request(url, { cache: 'reload' }))`，在 `fetch` 使用 `caches.match(event.request, { ignoreSearch: true })`。
  3. `app.js` 在 `registerServiceWorker()` 記錄初始 `hadController = Boolean(navigator.serviceWorker.controller)`，於 `controllerchange` 時若 `hadController` 為真則單次呼叫 `window.location.reload()`。

### 2. 搜尋桌號數字鍵盤放大比例
- **決策**：
  - `.search-numpad-popup`：寬度由 `220px` 調大為 `300px`（`max-width: calc(100vw - 28px)`），`padding` 增為 `20px`，`gap` 增為 `12px`。
  - `.search-numpad-title`：字體由 `0.85rem` 調大為 `1rem`，關閉鈕 `.btn-numpad-x` 調大為 `28px × 28px`。
  - `.search-numpad-display`：`min-height` 由 `48px` 調大為 `58px`，字體由 `1.4rem` 調大為 `1.75rem`。
  - `.numpad-grid`：`gap` 增為 `10px`。
  - `.numpad-btn`：`padding` 由 `12px 0` 調大為 `16px 0`，字體由 `1.1rem` 調大為 `1.4rem`（`.numpad-btn.action` 字體由 `0.85rem` 調大為 `1.05rem`）。

### 3. 移除上方進度條
- **決策**：
  - 移除 `index.html` 中的 `<div class="progress-bar-container"><div id="progress-bar-fill" ...></div></div>`。
  - 移除 `app.js` 中的 `progressBarFill` 常數與 `progressBarFill.style.width = ...`。
  - 移除 `style.css` 中的 `.progress-bar-container` 與 `.progress-bar-fill` 樣式。

### 4. 直播桌（`isStream`）資料結構與互動模型
- **決策**：
  - **資料結構**：`state.tables` 每個元素結構為 `{ number, state, assignedTime, overtimeMinutes, isStream: false }`。在 `loadState()` 中補齊 `if (t.isStream === undefined) t.isStream = false;` 以確保向後相容。
  - **設定入口（`#overtime-popup`）**：
    - 在 `#overtime-popup` 底部新增按鈕 `<button id="btn-stream-toggle" class="btn-stream-toggle">📺 標記為直播桌</button>`。
    - 開啟彈窗時，若 `table.isStream` 為 `true`，按鈕文字顯示 `📺 取消直播桌標記` 並加上 `.active` 樣式；否則顯示 `📺 標記為直播桌`。
    - 點擊時呼叫 `toggleStream(tableNumber)`：`commitState()`，切換 `table.isStream = !table.isStream`；若切換後 `table.isStream === true` 且 `table.state === 'assigned'`，則將 `table.state = 'active'`、`table.assignedTime = null`。若該桌原本在 `selectedTables` 中，亦一併移除。接著 `saveState()`、`renderTracker()`、`closeOvertimePopup()`。
  - **一般模式單點（`cycleCardState`）**：
    ```js
    if (table.isStream) {
      if (table.state === 'completed') {
        table.state = 'active';
        table.assignedTime = null;
      } else {
        table.state = 'completed';
        table.assignedTime = null;
      }
    }
    ```
  - **視覺呈現**：
    - 在 `renderTracker()` 中，若 `table.isStream` 為 `true`，卡片加上 `.table-card-stream` class，並附加 `<span class="stream-badge">📺 直播</span>`（若與加時徽章同時存在，可並列或堆疊於徽章列 `.card-badges` 中，確保緊湊美觀）。
  - **選取模式鎖定與滑選起點**：
    - 定義卡片在選取模式中是否為「鎖定不可選（`isLockedInSelection`）」：`table.state === 'completed' || table.isStream === true`（對應 DOM class `.state-completed` 或 `.table-card-stream`）。
    - **單點**：若 `table.state === 'completed' || table.isStream` 則直接 `return`。
    - **全選 / 反選**：過濾 `!card.classList.contains('state-completed') && !card.classList.contains('table-card-stream')`。
    - **巡場盤點可結算目標（`getIncompleteTableNums`）**：過濾 `table.state !== 'completed' && !table.isStream`，確保直播桌永遠不會被巡場盤點設為已完成！
    - **短壓滑動多選**：
      - 所有 `.table-card` 皆可啟動 `dragHoldTimer`。
      - `dragVisibleCards` 記錄 `isLocked: el.classList.contains('state-completed') || el.classList.contains('table-card-stream')`。
      - 當 200ms 到達時：若 `startItem.isLocked` 為 `true`，則 `dragTargetSelected = true`（預設為選取模式）；否則 `dragTargetSelected = !dragInitialSelection.has(startItem.num)`。
      - `applyDragRangeSelection` 僅對 `!item.isLocked` 的卡片套用 `dragTargetSelected`。
  - **複製資訊（📋）**：
    - `buildOvertimeInfo()` 與 `buildRemainingInfo()` 中：
      - 加時桌格式：`t.isStream ? \`\${t.number}(直播+\${t.overtimeMinutes}分)\` : \`\${t.number}(+\${t.overtimeMinutes}分)\``。
      - 一般桌格式：`t.isStream ? \`\${t.number}(直播)\` : \`\${t.number}\``。

## Risks / Trade-offs

- **[Risk] 卡片同時有「📺 直播」與「+3分」加時徽章時的高度空間** → **Mitigation**：將徽章包在水平排列的 `.card-badges` flex 容器（`display: flex; gap: 4px; flex-wrap: wrap; justify-content: center;`），在小尺寸卡片下也能保持單行或緊湊呈現，不撐破卡片。
