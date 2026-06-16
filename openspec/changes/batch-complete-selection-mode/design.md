## Context

現有批量操作以底部彈窗（bottom sheet）呈現，內有「範圍排除」與「指定桌號」兩個文字輸入模式。桌次格線在操作期間維持正常互動（點擊改狀態、長按加時），彈窗與格線完全分離。

新設計將互動移至格線本身：進入選取模式後，格線切換為點選選取狀態，底部彈窗整體移除。

## Goals / Non-Goals

**Goals:**
- 以格線直接選取取代文字輸入，使大批量操作的操作成本與桌數無關。
- 提供「全選未完成」、「清除全選」、「反選」三個快捷操作，覆蓋最常見的使用模式。
- 保留單步 undo 支援（與現行邏輯一致）。

**Non-Goals:**
- 不支援跨輪次的桌次操作。
- 不保留文字輸入模式（完整取代，不並存）。
- 選取狀態不寫入 localStorage（選取僅為 UI 暫態）。

## Decisions

**選取狀態存於模組層級變數，不進入 `state` 物件**
選取是操作過程的暫態，不需要持久化，也不應觸發 undo 快照。使用模組層級的 `let isSelectionMode = false` 與 `const selectedTables = new Set()` 管理，與 `state` 完全分離。

**浮動操作列固定於頂端（tracker-view 內），不使用 fixed**
由於 tracker-view 佔滿視窗且使用者在格線內捲動，操作列採 `position: sticky; top: 0` 附著於 tracker-view 的捲動容器頂端，確保在任何捲動位置都可見，也不影響其他畫面。

**選取模式下，整張卡片點擊切換選取；長按停用**
在選取模式中，單點切換 `selectedTables`，不執行原有狀態循環；長按事件直接 early return，不開啟加時彈窗。兩者皆在現有事件處理器最頂端加入模式判斷，不需額外的事件監聽器。

**`renderTracker()` 統一處理選取覆蓋層**
在現有卡片渲染邏輯中，依 `isSelectionMode` 與 `selectedTables` 決定是否加入 `selected` class 及勾勾覆蓋層（`<span class="selection-check">✓</span>`）。不額外建立渲染函式，降低維護成本。

**移除底部彈窗 HTML 與相關 JS**
舊的 `#batch-complete-popup`、兩個 tab 按鈕、三個輸入欄位的 DOM 元素與對應 JS 一併移除，減少死碼。

## Risks / Trade-offs

[已完成桌仍可被選取] → 確認執行時只更新非已完成桌，已完成桌即使被選取也不影響最終結果，行為與現行邏輯一致（`calcBatchTargets` 已依 `state.tables` 過濾）。可視需求在 UI 上額外顯示已完成桌為不可選狀態，但目前不在範圍內。

[選取模式期間，篩選器（隱藏已完成 / 只顯示加時桌）仍可操作] → 篩選器改變顯示但不影響 `selectedTables`（Set 以桌號儲存，不依 DOM）。隱藏的桌次不被「全選未完成」納入，但已在選取的桌次若被篩選隱藏，其選取狀態仍保留。此行為直覺且一致。
