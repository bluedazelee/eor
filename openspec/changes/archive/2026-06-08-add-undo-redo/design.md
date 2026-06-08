## Context

PTCG EoR Tracker 是純 Vanilla JS 的單頁應用，狀態以全域 `state` 物件管理，每次修改後呼叫 `saveState()` 寫入 localStorage。目前所有修改 `state.tables` 的操作皆為不可逆，無任何歷史回溯機制。

三個需要納入復原範圍的 mutation 函式：
- `cycleCardState(tableNumber)` — 單桌點擊切換狀態
- `setOvertime(tableNumber, value)` — 設定加時分鐘
- `markAllCompleted()` — 批次將所有桌設為已完成

## Goals / Non-Goals

**Goals:**
- 為所有修改 `state.tables` 的操作加入可復原/重做的歷史機制
- 在 control-row 左側新增 ↩ / ↪ 純圖示按鈕，無步驟可操作時 opacity 0.3
- 歷史上限 20 層

**Non-Goals:**
- 不將歷史堆疊持久化至 localStorage（刷新即清空）
- 不顯示歷史步驟計數或 tooltip
- 不對 roundName、group、startTable、endTable 等欄位進行復原

## Decisions

### 決策 1：使用快照式 Undo Stack，而非 Command Pattern

**選擇：** 每次 mutation 前對 `state.tables` 做 `JSON.parse(JSON.stringify(...))` 深複製，push 到 `undoStack`。

**替代方案：** Command Pattern（每個操作對應 execute/undo 方法）。

**理由：** tables 陣列最多 200 筆、每筆 4 個欄位，一份快照 < 5 KB，20 層也只有 100 KB。快照式實作遠比 Command Pattern 簡單，且在此規模下效能無差異。不需要引入任何抽象。

---

### 決策 2：任何新 mutation 都清空 redoStack

**選擇：** 執行新操作時，清空 `redoStack`（標準線性歷史）。

**替代方案：** 保留分支歷史（允許 redo 回到 undo 前的「另一條線」）。

**理由：** 線性歷史符合使用者直覺，分支歷史會讓 UX 複雜化，在此場景沒有必要。

---

### 決策 3：統一透過 `commitState()` 進行快照與儲存

**選擇：** 新增 `commitState()` 函式，取代現有所有呼叫 `saveState()` 的地方（在 mutation 函式中）：

```js
function commitState() {
  undoStack.push(JSON.parse(JSON.stringify(state.tables)));
  if (undoStack.length > MAX_UNDO) undoStack.shift();
  redoStack.length = 0;
  saveState();
  updateUndoRedoButtons();
}
```

三個 mutation 函式在修改 state 前呼叫 `commitState()`，在修改後呼叫 `saveState()` + `renderTracker()`。

實際上的流程：

```
mutation 函式：
  1. commitState()   ← push 快照、清 redo、存 localStorage
  2. 修改 state.tables
  3. saveState()
  4. renderTracker()
```

**理由：** 集中化快照邏輯，避免在每個 mutation 函式中重複撰寫，也讓未來新增 mutation 時有明確的接入點。

---

### 決策 4：按鈕放在 control-row 最左側，使用 opacity 表示 disabled

**選擇：** HTML 結構在 `.control-row` 內、checkbox 左邊插入兩個 `<button>`，CSS 以 `opacity: 0.3 + pointer-events: none` 表示不可用（不隱藏）。

**理由：** 讓使用者能看見按鈕存在，即使當前無可操作步驟，也能建立「這個功能在這裡」的認知。

---

### 決策 5：新回合開始時清空兩個 stack

在 `btnStart` 的 click handler 中，於初始化 `state.tables` 後清空 `undoStack` 和 `redoStack`，避免上一輪的歷史跨輪影響。

## Risks / Trade-offs

- **快照包含 assignedTime 字串**：undo 後時間戳會一起還原，對使用者而言是正確行為（還原到操作前的完整狀態）。
- **刷新後歷史消失**：歷史不存 localStorage，刷新即清空。使用者需知曉此行為 → 已規劃在說明頁面加入說明。
- **sw.js 快取版本號**：HTML / JS / CSS 有修改，需更新 Service Worker 的快取版本號，確保使用者取得最新版本。
