## Context

在 PTCG 賽事宣告 End of Round (EoR) 後，場上絕大多數對戰桌次其實已經完賽，裁判巡場調查時記錄的是**少數仍在進行對戰的桌次**。
目前 `app.js` 僅提供單一正向邏輯的「批量完成」（`isSelectionMode = true`）：
1. 點選誰，按「確認」就把誰設為 `completed`。
2. 雖然可透過「點選未完成桌次 → 按反選 → 按確認」達成反向設定，但初學者難以意會這套「反選連招」。
3. 更嚴重的是，在 EoR 中途進行二次調查時，若使用者未預先開啟「隱藏完成」，現有的 `btnSelectInvert` 會對畫面所有 `.table-card`（包含 `.state-completed`）做反選，導致已完成桌次也被勾選進來；同時單點與滑動多選目前也允許使用者點選已完成卡片，在「設為已完成」的選取模式下毫無實質意義。

因此，我們需要：
1. 在選取模式中徹底鎖定 `state === 'completed'` 的桌次（單點、滑選起點、反選皆跳過已完成桌次）。
2. 在現有選取模式架構上擴充第二種模式——**「巡場盤點」（Patrol Audit）**，讓裁判直接點名「場上還在打的桌次」，按下確認後自動把「目前顯示範圍內沒被點到的未完成桌次」全部設為已完成，並針對跨範圍區段選取提供貼心的三選一結算彈窗（`[取消]` / `[僅目前區段]` / `[全部區段]`）。

## Goals / Non-Goals

**Goals:**
- 在所有選取模式（批量完成、巡場盤點）中鎖定 `completed` 狀態的桌次不可選取，且「反選」僅針對目前畫面可見的未完成桌次運作。
- 新增獨立的「巡場盤點」入口按鈕與選取模式，複用現有的 `dashboard-compact-strip`、`selection-action-bar` 與短壓滑動多選機制，避免重複建立 DOM。
- 在「巡場盤點」模式提供明確的視覺區隔（例如橘紅/琥珀色系的「對戰中/保留」卡片邊框與標記、上方顯示「對戰中 N 桌」），避免與「批量完成」的綠色勾選混淆。
- 「巡場盤點」確認時，將目標範圍內**未被選取的未完成桌次**設為 `completed`，被選取桌次維持原狀態（`active` 或 `assigned`）。
- 當裁判跨範圍區段選取對戰中桌次（例如在 `1-25` 選取後切到 `26-50` 選取），且停留在單一區段按「確認」時，彈出三選一視窗讓裁判直接選擇結算「全部區段」或「僅目前區段」。
- 支援在「巡場盤點」選取 0 桌時點擊「確認」，彈出二次確認視窗後將目前可見範圍內所有未完成桌次設為已完成。
- 同步更新 `help-view` 使用說明與 `sw.js` 快取版本。

**Non-Goals:**
- 不改變單張卡片在一般模式下的三態循環（`active` → `assigned` → `completed` → `active`）。
- 進入「巡場盤點」或「批量完成」時，不強制自動改動使用者原本的「隱藏完成」篩選開關狀態。
- 不新增額外的持久化欄位至 `localStorage`（選取模式屬於暫態 UI 狀態）。

## Decisions

### 1. 共享選取模式狀態機（`selectionModeType`: `null | 'complete' | 'patrol'`）
- **決策**：保留布林值 `isSelectionMode` 並搭配 `let selectionModeType = null; // 'complete' | 'patrol'`，讓「批量完成」與「巡場盤點」共用同一套 `selectedTables` Set、同一組 `#selection-action-bar` 與 `#dashboard-compact-strip`，並透過 `#tracker-view` 上的 class（`.selection-mode` 加上 `.patrol-mode`）切換視覺主題。
- **理由**：兩種模式的底層互動（單點切換、200ms 短壓滑動區間多選、全選未完成、清除、反選、範圍標籤與篩選器連動）100% 相同，差別僅在於：
  1. 選取時的視覺語意（綠色 `✓` 代表「將完成」 vs. 橘紅/琥珀色標記代表「對戰中/保留」）。
  2. `compact-strip` 的計數文案（`已選 N 桌` vs. `對戰中 N 桌`）。
  3. 「確認」按鈕的啟用條件與結算邏輯（正向集合 vs. 範圍未完成差集）。
- **替代方案**：為巡場盤點另建一套獨立的 DOM 工具列與事件監聽器。這會造成大量重複程式碼與維護負擔，故不採用。

### 2. 已完成桌次（`state-completed`）的全面鎖定策略
- **決策**：
  - **單點（Click）**：在卡片 click handler 中，若 `isSelectionMode && table.state === 'completed'`，直接 `return` 不做任何選取切換。
  - **滑動多選（Drag Select）**：在 `cardGrid` 的 `pointerdown` 中，若起點卡片具有 `.state-completed`（`card.classList.contains('state-completed')`），直接 `return` 不啟動 `dragHoldTimer`；滑動過程中 `applyDragRangeSelection` 僅對 `!item.isCompleted` 的卡片套用選取變更。
  - **反選（Invert）**：`btnSelectInvert` 修改為：
    ```js
    const visibleIncompleteNums = Array.from(cardGrid.querySelectorAll('.table-card'))
      .filter(card => !card.classList.contains('state-completed'))
      .map(card => parseInt(card.dataset.num, 10));
    ```
    僅對可見且未完成的桌次進行 `has(n) ? delete(n) : add(n)`，且確保 `selectedTables` 中不會加入任何已完成桌次。
  - **CSS 視覺**：在 `#tracker-view.selection-mode .table-card.state-completed` 下設定 `cursor: default;` 並取消 hover 邊框變色與浮起效果，讓使用者在未開啟「隱藏完成」時也能直觀感受已完成卡片處於鎖定狀態。

### 3. 「巡場盤點」確認按鈕啟用條件、跨區段三選一彈窗與差集結算邏輯
- **決策**：
  - 定義輔助函式 `getIncompleteTableNums(ignoreRangeTab = false)`：
    - 根據當前 `showOvertimeOnly` 及（若 `!ignoreRangeTab`）`activeRangeTab` 條件，回傳所有 `t.state !== 'completed'` 的桌號陣列。
  - 在 `updateSelectionBar()` 中：
    - 若 `selectionModeType === 'complete'`：顯示 `已選 ${n} 桌`，`btnSelectionConfirm.disabled = (n === 0)`。
    - 若 `selectionModeType === 'patrol'`：顯示 `對戰中 ${n} 桌`；檢查當前可見未完成桌數 `visibleIncompleteCount`（或當有跨區已選桌次時全區段的未完成桌數），只要有可結算之未完成桌次，`btnSelectionConfirm.disabled = false`；否則 `disabled = true`。
    - 在 `renderTracker()` 中同步呼叫 `updateSelectionBar()`，確保切換範圍標籤或篩選器時即時更新確認按鈕狀態。
  - 點擊「確認」時（`selectionModeType === 'patrol'`）：
    1. **情況 A：未選取任何桌次（`selectedTables.size === 0`）**：
       - 取得當前可見未完成桌號 `visibleIncompleteNums = getIncompleteTableNums(false)`。
       - 若 `visibleIncompleteNums.length === 0` 則直接返回。
       - 呼叫 `confirm(\`目前未選取任何對戰中桌次，確定要將目前顯示範圍內的 \${visibleIncompleteNums.length} 個未完成桌次全部設為「已完成」嗎？\`)`。
       - 若確認則執行 `executePatrolComplete(visibleIncompleteNums)`；若取消則留在盤點模式。
    2. **情況 B：有選取桌次（`selectedTables.size > 0`），且發生「跨範圍區段選取」**：
       - 檢查條件：`activeRangeTab !== null` 且 `Array.from(selectedTables).some(num => num < activeRangeTab.start || num > activeRangeTab.end)`。
       - 若成立，開啟自訂三選一彈窗 `#patrol-scope-popup`（參考既有 `.filter-confirm-popup` 樣式）：
         - 訊息提示：「偵測到其他範圍區段也有已選取的對戰中桌次，請選擇要設為已完成的結算範圍：」
         - 按鈕 1 **「取消」**：關閉彈窗，留在盤點模式。
         - 按鈕 2 **「僅目前區段 (start-end)」**：對 `getIncompleteTableNums(false)` 執行差集完成。
         - 按鈕 3 **「全部區段 (startTable-endTable)」**：對 `getIncompleteTableNums(true)` 執行差集完成。
    3. **情況 C：有選取桌次，且無跨區段衝突（在「全部」標籤下，或所有已選桌次皆在當前區段內）**：
       - 直接對 `getIncompleteTableNums(false)` 執行差集完成。
  - `executePatrolComplete(candidateIncompleteNums)` 函式：
    - 計算 `targetsToComplete = candidateIncompleteNums.filter(num => !selectedTables.has(num))`。
    - 若 `targetsToComplete.length > 0`，先呼叫 `commitState()`，將 `targetsToComplete` 對應桌次的 `state` 設為 `'completed'`，並呼叫 `saveState()`。
    - 呼叫 `exitSelectionMode()`。

### 4. 「巡場盤點」的視覺設計
- **決策**：
  - 控制列按鈕：`[批量完成]`（綠色 hover 主題）與 `[巡場盤點]`（琥珀橘/紅框 hover 主題，`.btn-filter-patrol`）並列於 `.control-row`。
  - 當進入巡場盤點時，`#tracker-view` 加上 `.patrol-mode` class：
    - 被選取的卡片（`.table-card-selected`）在 `.patrol-mode` 下使用琥珀橘/亮紅邊框與背景光暈，右上角標記顯示 `⏳`（或對應標記），清楚傳達「此桌仍在對戰中，予以保留」。
    - `compact-strip` 中的 `#selection-count` 文字顏色亦對應調整為琥珀橘色系。

## Risks / Trade-offs

- **[Risk] 跨範圍標籤選取後停在單一區段按確認** → **Mitigation**：已透過「2A 跨區段三選一確認彈窗（取消 / 僅目前區段 / 全部區段）」完美解決，無論裁判是想分頁巡全場還是只結算單區，都能一鍵直達且不會誤判。
- **[Risk] 選取 0 桌時誤觸確認** → **Mitigation**：已設計 `selectedTables.size === 0` 時強制彈出 `confirm()` 二次確認警示，防止一鍵誤清全場。
- **[Risk] 控制列按鈕數量增加導致小螢幕換行擁擠** → **Mitigation**：將「批量完成」與「巡場盤點」放入 `.btn-group` 並保持精簡字數（4 字），在手機寬度下仍能維持整齊排版。
