## ADDED Requirements

### Requirement: Undo last table mutation
系統 SHALL 提供復原功能，允許使用者將 `state.tables` 回復到最近一次修改前的狀態。

#### Scenario: Undo after single table state change
- **WHEN** 使用者點擊桌號卡片切換狀態後，按下 ↩ 復原按鈕
- **THEN** 該桌恢復為點擊前的狀態（含 assignedTime），畫面重新渲染

#### Scenario: Undo after mark all completed
- **WHEN** 使用者執行「全部設為已完成」後，按下 ↩ 復原按鈕
- **THEN** 所有桌次恢復為操作前的各自狀態

#### Scenario: Undo after overtime change
- **WHEN** 使用者透過長按 popup 設定或清除加時分鐘後，按下 ↩ 復原按鈕
- **THEN** 該桌的 overtimeMinutes 恢復為操作前的值

#### Scenario: Undo button disabled when no history
- **WHEN** 進入 tracker-view 後尚未執行任何操作，或已復原至最初狀態
- **THEN** ↩ 按鈕顯示為 opacity 0.3 且無法點擊

---

### Requirement: Redo previously undone mutation
系統 SHALL 提供重做功能，允許使用者將已復原的操作重新套用。

#### Scenario: Redo after undo
- **WHEN** 使用者執行過復原後，按下 ↪ 重做按鈕
- **THEN** 最近一次被復原的操作重新套用，畫面重新渲染

#### Scenario: Redo stack cleared by new mutation
- **WHEN** 使用者復原後執行了新操作
- **THEN** ↪ 重做按鈕變為 disabled（redoStack 已清空），無法重做

#### Scenario: Redo button disabled when no redo history
- **WHEN** 尚未執行過復原，或重做後已達最新狀態
- **THEN** ↪ 按鈕顯示為 opacity 0.3 且無法點擊

---

### Requirement: History stack limit
系統 SHALL 將 undoStack 上限設為 20 層，超過時移除最舊的快照。

#### Scenario: Stack at capacity
- **WHEN** undoStack 已達 20 層，使用者再執行一次操作
- **THEN** 最舊的快照被移除，最新的快照被加入；仍可復原最近 20 步

---

### Requirement: History cleared on new round
系統 SHALL 在新回合開始時清空 undoStack 與 redoStack。

#### Scenario: Start new round resets history
- **WHEN** 使用者按下「開始紀錄」建立新一輪
- **THEN** undoStack 與 redoStack 皆被清空，↩ 和 ↪ 按鈕均變為 disabled

---

### Requirement: History not persisted across page reload
系統 SHALL 不將歷史堆疊存入 localStorage；頁面重新整理後歷史消失。

#### Scenario: History lost on reload
- **WHEN** 使用者執行若干操作後重新整理頁面
- **THEN** 頁面恢復上次儲存的 state，但 ↩ 和 ↪ 按鈕均為 disabled

---

### Requirement: Undo/Redo buttons in control-row
系統 SHALL 在 tracker-view 的 control-row 左側顯示 ↩ 和 ↪ 兩個純圖示按鈕，始終可見。

#### Scenario: Buttons visible in tracker view
- **WHEN** 使用者進入 tracker-view
- **THEN** ↩ 和 ↪ 按鈕顯示於 control-row 左側，checkbox 左邊

#### Scenario: Buttons opacity indicates availability
- **WHEN** undoStack 為空時
- **THEN** ↩ 按鈕 opacity 為 0.3 且 pointer-events: none
- **WHEN** redoStack 為空時
- **THEN** ↪ 按鈕 opacity 為 0.3 且 pointer-events: none

---

### Requirement: Help page documents undo/redo
說明頁面 SHALL 包含「復原與重做」章節，說明 ↩/↪ 按鈕的用法，並說明刷新頁面後歷史記錄消失的行為。

#### Scenario: Help page contains undo section
- **WHEN** 使用者開啟說明頁面
- **THEN** 頁面包含復原（↩）與重做（↪）的操作說明，以及「重新整理後歷史將清除」的提示
