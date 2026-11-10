## Context

PTCG EoR Tracker 為針對手機觸控優先設計的單頁 PWA。在「批量完成」選取模式（`isSelectionMode = true`）下，使用者目前僅能透過逐一點擊 `.table-card` 或使用「全選 / 清除 / 反選」操作。當裁判需要選取某一段連續桌號（例如第 12～28 桌）時，逐一點選耗時且易誤觸。

然而，`#card-grid` 本身是 `overflow-y: auto` 的垂直捲動容器。若直接將所有滑動手勢攔截為選取，將導致使用者無法在批次模式中上下捲動檢視其他桌次。因此需要一套能自然區分「上下捲動列表」、「單點切換」與「滑動區間選取」的手勢機制。

## Goals / Non-Goals

**Goals:**
- 在批次選取模式（`isSelectionMode = true`）下，支援透過「短壓（約 200ms）啟動滑動區間多選」。
- 保留批次模式下的原生垂直捲動與單點切換體驗，並確保一般模式下的 500ms 長按加時設定彈窗完全不受影響。
- 滑動選取採「連續可見卡片區間（Range）」計算，並依據起點卡片的選取狀態決定整趟手勢為「勾選」或「取消勾選」。
- 滑動選取時，僅影響與起點卡片「完成狀態分類相同」的卡片（`尚未結束 active` 與 `已分配 assigned` 視為同一類「非已完成」；`已完成 completed` 為另一類）。
- 支援同一次滑動中往回拖曳時的「即時預覽回退」，以及手指靠近 `#card-grid` 上下邊緣時的「自動平滑捲動」。

**Non-Goals:**
- 不改變一般模式（`isSelectionMode = false`）的任何點擊或長按行為。
- 不在批次模式外提供長按直接進入批次模式的入口（維持由「批量完成」按鈕進入）。
- 不影響被篩選器（隱藏完成、只顯示加時、範圍標籤）隱藏的卡片。

## Decisions

### 1. 手勢狀態機與觸控事件處理（短壓 200ms 啟動滑選）
- **決策**：在 `#card-grid` 層級委派（event delegation）管理批次模式的滑動選取手勢：
  1. `pointerdown`（在 `.table-card` 上，且 `isSelectionMode === true`）：記錄起點卡片、起始座標 `(startX, startY)`，並啟動 `DRAG_HOLD_MS = 200` 的計時器。
  2. 計時器觸發前若移動距離 `Math.hypot(dx, dy) > 10`：取消計時器，交由瀏覽器執行 `#card-grid` 原生捲動。
  3. 計時器觸發前若 `pointerup`：取消計時器，由既有的單點邏輯切換該張卡片。
  4. 計時器期滿（200ms 內未大幅移動）：進入 `isDragSelecting = true` 狀態：
     - 記錄當下 `selectedTables` 的快照 `dragInitialSelection = new Set(selectedTables)`。
     - 記錄起點卡片的目標選取動作 `dragTargetSelected = !dragInitialSelection.has(startTableNum)`（起點未選 ➔ 區間設為已選；起點已選 ➔ 區間設為取消選取）。
     - 記錄起點卡片的完成狀態分類 `dragStartIsCompleted = (startTable.state === 'completed')`。
     - 立即對起點卡片套用選取變更並加上短暫視覺回饋（及支援裝置上的輕微震動 `navigator.vibrate?.(15)`），讓使用者明確感知已進入滑選狀態。
- **防止行動端捲動搶走手勢**：在 `#card-grid` 綁定 `{ passive: false }` 的 `touchmove` 監聽器；當 `isDragSelecting === true` 時呼叫 `e.preventDefault()`，阻止行動端瀏覽器在滑選啟動後觸發頁面捲動或 `pointercancel`。

### 2. 連續區間計算與即時預覽回退
- **決策**：
  - 進入滑動選取時，先取得當前 DOM 中所有可見卡片陣列 `visibleCards = Array.from(cardGrid.querySelectorAll('.table-card'))` 及對應桌號與狀態分類。
  - 手指移動時，透過 `document.elementFromPoint(clientX, clientY)?.closest('.table-card')` 取得當前手指下的卡片。若手指正好滑過卡片間的 grid gap（回傳 `null`），維持上一個有效的終點卡片，避免選取區間閃爍。
  - 計算起點索引 `startIdx` 與當前終點索引 `endIdx` 之間的閉區間 `[Math.min(startIdx, endIdx), Math.max(startIdx, endIdx)]`。
  - **快照還原 + 區間覆寫**：每次終點卡片改變時，先將 `selectedTables` 重設為 `dragInitialSelection` 的內容，接著遍歷區間內的卡片：
    - 若該卡片的 `(table.state === 'completed') === dragStartIsCompleted`，則依 `dragTargetSelected` 加入或移出 `selectedTables`；否則略過（維持其在 `dragInitialSelection` 中的原狀）。
- **替代方案考量**：若不保存 `dragInitialSelection` 而直接在滑過時修改 `selectedTables`，當使用者從 10 桌往回滑到 06 桌時，無法得知 07～10 桌在滑動前是否原本就被勾選。使用快照還原可確保往回滑時 100% 精準回退。

### 3. 滑動過程中的局部 DOM 更新（避免整網格重建）
- **決策**：在滑動進行中（`pointermove` 與自動捲動期間），**不呼叫 `renderTracker()` 重建整個 `#card-grid` DOM**，而是直接同步現有 `.table-card` 元素的 `.table-card-selected` class 與 `.selection-check` 子節點，並呼叫 `updateSelectionBar()`。
- **理由**：若在拖曳途中執行 `cardGrid.innerHTML = ''` 重建 DOM，會導致指標事件目標遺失、觸控中斷以及高頻率重排卡頓。直接增刪 class 與勾勾節點可維持 60fps 流暢度。

### 4. 列表邊緣自動捲動（Edge Auto-scroll）
- **決策**：當 `isDragSelecting === true` 且指標的 `clientY` 進入 `#card-grid.getBoundingClientRect()` 上下邊緣緩衝區（例如 `EDGE_ZONE = 48px`）時，啟動 `requestAnimationFrame` 迴圈調整 `cardGrid.scrollTop`（越靠近邊緣速度越快，約 `3px ~ 10px / frame`）。每一幀捲動後，以最後記錄的 `(lastClientX, lastClientY)` 重新執行 `elementFromPoint` 與區間更新，直到手指離開邊緣或放開為止。

## Risks / Trade-offs

- **[Risk] iOS Safari / Android Chrome 長按選字或系統選單干擾** → **Mitigation**：`.table-card` 已設有 `user-select: none`，將一併補齊 `-webkit-user-select: none` 與 `-webkit-touch-callout: none`，並在 `isSelectionMode` 下抑制 `contextmenu` 事件。
- **[Risk] 短壓後未移動直接放開時的重複切換** → **Mitigation**：一旦 200ms 短壓計時器觸發並已在起點套用選取變更，設定旗標忽略隨後產生的 `click` 事件，避免放開手指時 `click` 又把起點卡片切換回去。
