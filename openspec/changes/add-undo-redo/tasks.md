## 1. JS — Undo/Redo 核心機制

- [x] 1.1 在 `app.js` 頂部宣告 `undoStack`、`redoStack` 陣列與 `MAX_UNDO = 20` 常數
- [x] 1.2 實作 `commitState()` 函式：push 當前 `state.tables` 深複製至 undoStack（超出上限時 shift）、清空 redoStack、呼叫 `saveState()`、呼叫 `updateUndoRedoButtons()`
- [x] 1.3 實作 `updateUndoRedoButtons()` 函式：依 undoStack / redoStack 長度切換按鈕的 opacity 與 pointer-events
- [x] 1.4 實作 `undoAction()` 函式：將當前 tables push 至 redoStack，從 undoStack pop 並還原 `state.tables`，呼叫 `saveState()` 與 `renderTracker()` 與 `updateUndoRedoButtons()`
- [x] 1.5 實作 `redoAction()` 函式：將當前 tables push 至 undoStack，從 redoStack pop 並還原 `state.tables`，呼叫 `saveState()` 與 `renderTracker()` 與 `updateUndoRedoButtons()`

## 2. JS — 接入 mutation 函式

- [x] 2.1 在 `cycleCardState()` 修改 state 前呼叫 `commitState()`（取代原本的直接 `saveState()`）
- [x] 2.2 在 `setOvertime()` 修改 state 前呼叫 `commitState()`
- [x] 2.3 在 `markAllCompleted()` 修改 state 前呼叫 `commitState()`
- [x] 2.4 在 `btnStart` click handler 初始化 `state.tables` 後清空 `undoStack` 與 `redoStack`，並呼叫 `updateUndoRedoButtons()`

## 3. HTML — 按鈕結構

- [x] 3.1 在 `index.html` 的 `.control-row` 內、`.checkbox-container` 左側，加入包裹兩個按鈕的 `<div class="undo-redo-btns">`，內含 `<button id="btn-undo">↩</button>` 與 `<button id="btn-redo">↪</button>`

## 4. CSS — 按鈕樣式

- [x] 4.1 在 `style.css` 新增 `.undo-redo-btns` 排列樣式（flex, gap）
- [x] 4.2 新增 `#btn-undo`、`#btn-redo` 基本樣式（尺寸、背景、border、font-size），與現有 `.btn-filter` 視覺風格一致
- [x] 4.3 新增 `.undo-redo-btns button.disabled` 樣式：`opacity: 0.3; pointer-events: none`

## 5. JS — 按鈕事件綁定

- [x] 5.1 在 `app.js` 頂部 DOM 元素宣告區加入 `btnUndo` 與 `btnRedo` querySelector
- [x] 5.2 綁定 `btnUndo` click 事件呼叫 `undoAction()`
- [x] 5.3 綁定 `btnRedo` click 事件呼叫 `redoAction()`
- [x] 5.4 在 `loadState()` 完成後呼叫 `updateUndoRedoButtons()`（確保刷新後按鈕正確顯示為 disabled）

## 6. HTML — 說明頁面

- [x] 6.1 在 `index.html` 的 `help-view` 中新增「復原與重做」章節，說明 ↩/↪ 按鈕操作方式，並加入「重新整理頁面後歷史記錄將清除」提示

## 7. PWA

- [x] 7.1 更新 `sw.js` 的快取版本號，確保使用者取得包含新功能的最新版本
