## Why

組別會在跨輪次後自動帶回上次選擇，但桌號範圍（起始／結束桌號）卻在每輪結束、返回設定畫面時被重置回 HTML 預設值（1 / 50）。同一場賽事中，裁判每輪通常負責相同或相近的桌號範圍，每輪都要重新輸入造成不必要的重複操作。

## What Changes

- 新增桌號範圍的跨輪次記憶：開始紀錄時，將當前的起始／結束桌號保存至獨立的 localStorage key。
- 返回設定畫面時，將起始／結束桌號欄位**預填**為上次使用的值，作為可編輯的預設值（使用者仍可自由調整）。
- 尚無紀錄（首次使用）時，維持現有 HTML 預設值（起始 1 / 結束 50）作為 fallback。
- 行為比照現有的組別記憶（`group-selection`），但桌號範圍**僅在點擊「開始紀錄」時寫入**，而非邊輸入邊儲存。
- 桌號範圍的記憶**不因輪次重設而清除**（與整輪狀態 `ptcg_eor_tracker_state` 的清除互不影響）。

## Capabilities

### New Capabilities
- `table-range-persistence`: 跨輪次記住上次使用的桌號範圍，於返回設定畫面時預填為可編輯的預設值。

### Modified Capabilities
<!-- 無既有 capability 的需求變更；本變更為新增能力，且不修改 group-selection 或 eor-tracker-core 的既有需求 -->

## Impact

- **程式碼**：`app.js` 三處 —— 新增 localStorage key 常數、新增 `restoreRangeSelection()`（於 `showSetupView()` 內呼叫，緊鄰 `restoreGroupSelection()`）、於 `btnStart` 處理常式寫入桌號範圍。
- **使用者操作流程**：返回設定畫面時，桌號範圍欄位呈現上次的值而非預設值；其餘操作不變，欄位仍可手動編輯。
- **PWA / 快取**：僅異動 `app.js`，需更新 `sw.js` 的快取版本號以確保使用者取得新版邏輯。
- **資料**：新增一個 localStorage key（如 `ptcg_eor_range`），不影響既有 `ptcg_eor_tracker_state` 與 `ptcg_eor_group`。
