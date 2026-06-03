## Context

EoR Tracker 是純前端 PWA（vanilla JS + HTML + CSS），無後端與外部依賴。桌號狀態以 `state.tables[].state`（`active` / `assigned` / `completed`）儲存於 LocalStorage，並由 `renderTracker()` 統一渲染統計、進度條與圖卡。目前要將所有桌號設為已完成，只能逐一點擊圖卡循環切換（`cycleCardState`），桌數多時費時。需新增一鍵批次完成的捷徑，且不破壞現有狀態機與完成流程。

## Goals / Non-Goals

**Goals:**
- 在主畫面上方新增「全部設為已完成」按鈕，隨時可點擊
- 點擊後以二次確認對話框防止誤觸
- 確認後將 `state.tables` 全部設為 `completed`，並透過既有 `saveState()` + `renderTracker()` 更新統計、進度條與 LocalStorage

**Non-Goals:**
- 不新增「全部重設」或反向批次操作
- 不修改現有 `cycleCardState`、`btnFinishRound`、`btnForceEndRound` 的行為
- 不新增後端 API 或狀態同步機制

## Decisions

**決策 1：按鈕永遠可點擊，不依賴目前完成狀態**
- 選擇：按鈕始終 enabled，靠確認對話框防誤觸
- 棄選：所有桌已完成時 disable；但這只是顯示性限制，無實質好處且增加 `renderTracker()` 分支
- 理由：與 `btnForceEndRound` 一致，實作最簡單

**決策 2：使用原生 `confirm()` 做二次確認**
- 選擇：原生 `confirm()`，文案說明將把所有桌號設為已完成
- 棄選：自訂 modal；對 PWA offline 場景，原生 confirm 最可靠且無需額外 CSS/JS
- 理由：與既有 `btnFinishRound` / `btnForceEndRound` 的確認模式保持一致

**決策 3：新增 `markAllCompleted()` 批次函式**
- 選擇：遍歷 `state.tables` 將每個 `table.state = 'completed'`，再呼叫一次 `saveState()` 與 `renderTracker()`
- 棄選：對每桌呼叫 `cycleCardState`；它每次都 save+render 且依當前狀態循環，無法直接設為 completed
- 理由：單次批次更新 + 單次重繪，效能與語意都正確；`renderTracker()` 會自然解鎖「確認本輪處理完畢」按鈕（completedCount === totalCount）

**決策 4：批次完成不主動清除 `assignedTime`**
- 選擇：僅變更 `state`，保留各桌既有 `assignedTime`
- 理由：`assignedTime` 僅在 `assigned` 狀態的圖卡上顯示，completed 狀態不顯示，故無視覺影響；保留可在日後還原時保有歷史時間

## Risks / Trade-offs

- [誤觸風險] 按鈕永遠啟用 → 二次確認對話框文案明確標示「將所有桌號設為已完成」
- [UX 一致性] 主畫面上方按鈕增多 → 沿用既有按鈕樣式規範，文字清楚區分用途
