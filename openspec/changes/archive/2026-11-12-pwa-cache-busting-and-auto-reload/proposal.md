## Why

1. **PWA 快取不同步問題**：在版本更新後，使用者開啟網頁或 PWA 時容易發生「載入了新版 `index.html`，但瀏覽器或 Service Worker 卻從本地快取讀取了舊版 `app.js` 與 `style.css`」的問題，需加入靜態資源版本參數（Cache Busting）、Service Worker 安裝時強制繞過 HTTP 快取，以及新版 Service Worker 接管時自動刷新頁面的機制。
2. **搜尋桌號數字鍵盤偏小**：目前 `.search-numpad-popup` 寬度僅 `220px`，按鍵尺寸與字體在手機畫面上偏小，需放大彈窗與按鍵比例以提升單手點按體驗。
3. **精簡上方儀表板進度條**：上方儀表板已有「已完成 0 / N 桌 (0%) | 剩餘 N 桌」的清楚數據顯示，移除視覺進度條可讓介面更俐落並釋放更多卡片顯示空間。
4. **已完成桌次與直播桌可作為滑動多選起點**：在「批量完成」與「巡場盤點」模式中，雖然已完成桌次（與直播桌）不可被選取，但裁判手指短壓在這些卡片上並滑向其他卡片時，仍應觸發滑動區間多選（預設為「選取」模式，將滑過的可選取未完成桌次加入選取，且自動略過不可選取桌次），使滑選體驗更流暢無斷點。
5. **新增標記直播桌功能**：實務上「直播桌」由舞台或轉播組獨立控管，不屬於巡場裁判進行分配與盤點確認的桌次。若無專屬標記與保護，巡場裁判在執行「巡場盤點」或「批量完成」時容易誤將直播桌一併設為已完成。因此需提供標記為直播桌的功能：標記後在一般模式下單點直接切換「尚未結束 ↔ 已完成」（跳過「已分配」且保留直播標記），並在「批量完成」與「巡場盤點」模式中自動鎖定不被選取、亦不會被巡場盤點自動設為已完成。

## What Changes

- **HTML 靜態資源版本參數與 Service Worker 快取同步機制**：
  - 在 `index.html` 引用 `style.css?v=25` 與 `app.js?v=25`。
  - 在 `sw.js` 的 `install` 事件使用 `new Request(url, { cache: 'reload' })` 繞過瀏覽器 Disk Cache；`fetch` 事件使用 `caches.match(event.request, { ignoreSearch: true })`。
  - 在 `app.js` 監聽 `controllerchange` 事件，當新版 Service Worker 接管時自動執行單次 `window.location.reload()`。
- **放大搜尋桌號數字鍵盤（`#search-numpad-popup`）**：
  - 調大彈窗寬度（`300px`）、輸入顯示框高度與字級，並放大 0–9、`⌫`、「確定」按鈕的點擊區域與字體比例。
- **移除上方進度條（`#progress-bar-fill` / `.progress-bar-container`）**：
  - 從 `index.html`、`style.css` 與 `app.js` 移除上方視覺進度條，保留「已完成 X / Y 桌 (Z%) | 剩餘 W 桌」文字數據。
- **支援在已完成桌次（與直播桌）上短壓啟動滑動區間多選**：
  - 在選取模式（批量完成、巡場盤點）中，短壓（200ms）任何桌號卡片（包含已完成桌次與直播桌）皆可啟動滑動區間多選。
  - 若起點為不可選取之桌次（已完成或直播桌），整趟滑動手勢預設為「選取（加入選取）」模式；起點本身與區間內所有已完成/直播桌維持不選取，區間內可選取的未完成桌次則被加入選取。
- **新增「直播桌（Stream Table）」標記與保護機制**：
  - 全域 `state.tables` 每張桌次新增 `isStream: boolean` 屬性（預設 `false`，每輪開始時重置，向後相容舊 `localStorage` 資料）。
  - **設定入口**：整合於長按卡片（0.5 秒）彈窗（`#overtime-popup`）中，提供「📺 標記為直播桌」/「📺 取消直播桌」按鈕（支援 Undo/Redo）；若將處於 `assigned`（已分配）狀態的桌次標記為直播桌，自動將其狀態轉回 `active`（尚未結束）並清除 `assignedTime`。
  - **視覺呈現**：標記為直播桌的卡片顯示專屬的「📺 直播」徽章（`.stream-badge`）與直播桌樣式。
  - **一般模式單點切換**：單點已標記為直播桌的卡片時，直接於 `尚未結束 (active)` ↔ `已完成 (completed)` 之間二段切換（跳過 `已分配`），且切換後始終保留直播標記。
  - **選取模式（批量完成 / 巡場盤點）保護鎖定**：直播桌比照「已完成桌次」鎖定不可選取（單點無效、全選與反選自動跳過、滑選可作為起點但自動略過直播桌本身）；在「巡場盤點」按下確認（含選 0 桌全部完成、跨區段結算）時，直播桌一律排除在結算完成目標之外，維持原狀態，只能在一般模式下手動點選設為已完成。
  - **複製資訊（📋）標註**：在「詳細資訊」與「加時桌次」中，未完成的直播桌於桌號後標註 `直播`（無加時顯示 `N(直播)`，有加時顯示 `N(直播+M分)`）。
- **更新使用說明頁面（`help-view` 與 `README.md`）**：
  - 更新「桌次狀態管理」、「加時與直播桌標記」、「儀表板統計」、「批量設為已完成」、「巡場盤點」及「複製資訊」章節說明。

## Capabilities

### New Capabilities
- `stream-table-marking`: 提供長按標記/取消「直播桌」功能、專屬徽章顯示、一般模式下跳過「已分配」直接切換「尚未結束 ↔ 已完成」、在批量完成與巡場盤點模式中鎖定排除不被選取或自動完成，以及在複製資訊中標註 `(直播)`。

### Modified Capabilities
- `eor-tracker-pwa`: 強化離線資源快取與版本更新一致性規範（靜態資源 Cache Busting 版本參數、SW 安裝時 `{ cache: 'reload' }` 繞過瀏覽器快取、離線 `ignoreSearch` 快取比對，以及 SW 更新接管時自動重新整理頁面）。
- `numpad-search`: 調大數字鍵盤彈窗與數字按鍵在畫面中的尺寸比例。
- `eor-tracker-core`: 移除上方視覺進度條，保留統計數據顯示；桌號圖卡在標記為直播桌時單點直接於「尚未結束 ↔ 已完成」間切換。
- `batch-complete`: 鎖定直播桌與已完成桌次不可選取（單點、全選、反選皆略過），並允許在已完成桌次或直播桌上短壓啟動滑動區間多選（預設為「選取」模式，將滑過的可選取未完成桌次加入選取）。
- `patrol-audit`: 鎖定直播桌不可選取且不納入巡場盤點「設為已完成」的結算範圍，並允許在已完成桌次或直播桌上短壓啟動滑動區間多選。
- `copy-remaining-tables-info`: 未完成的直播桌在「加時桌次」與「詳細資訊」輸出時標註 `N(直播)` 或 `N(直播+M分)`。
- `help-view`: 更新說明頁面以涵蓋直播桌標記、移除進度條描述及滑動多選起點規則。

## Impact

- **`index.html`**：
  - 為 `style.css` 與 `app.js` 加上 `?v=25`。
  - 移除 `.progress-bar-container` 元素。
  - 在 `#overtime-popup` 新增 `#btn-stream-toggle` 按鈕。
  - 更新 `#help-view` 說明文字。
- **`style.css`**：
  - 放大 `.search-numpad-popup`、`.search-numpad-display` 與 `.numpad-btn` 的尺寸與字體比例。
  - 移除 `.progress-bar-container` 與 `.progress-bar-fill` 樣式。
  - 新增直播桌徽章（`.stream-badge`）、卡片直播樣式、選取模式下直播桌鎖定樣式與彈窗直播桌切換按鈕樣式。
- **`app.js`**：
  - `state.tables` 新增 `isStream` 欄位（含 `loadState` 向後相容補齊）。
  - `cycleCardState()` 針對 `table.isStream` 實作 `active ↔ completed` 二段切換。
  - 長按彈窗新增切換直播桌功能（`toggleStreamTable`）。
  - 選取模式（單點、滑選起點與區間、全選、反選、巡場盤點差集結算）全面排除 `table.isStream` 桌次，並支援在已完成/直播桌上短壓啟動滑選（預設選取模式）。
  - 複製資訊函式（`buildOvertimeInfo`、`buildRemainingInfo`）支援直播桌標註。
  - 移除 `progressBarFill` 更新，並在 `registerServiceWorker()` 加入 `controllerchange` 單次自動 reload。
- **`sw.js`**：
  - 更新 `CACHE_NAME = 'ptcg-eor-v25'`，`install` 使用 `{ cache: 'reload' }`，`fetch` 使用 `{ ignoreSearch: true }`。
