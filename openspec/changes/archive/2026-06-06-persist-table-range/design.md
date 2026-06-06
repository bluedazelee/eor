## Context

目前組別選擇透過獨立的 localStorage key (`ptcg_eor_group`) 達成跨輪次記憶：`restoreGroupSelection()` 於 `showSetupView()` 內還原下拉選單，`groupSelect` 的 `change` 事件與 `btnStart` 處理常式負責寫入。整輪狀態 (`ptcg_eor_tracker_state`) 則在 `resetAndReturnToSetup()` 被 `removeItem` 清除，且 `showSetupView()` 內的 `setupForm.reset()` 會把所有表單欄位（含起始／結束桌號）打回 HTML 預設值（1 / 50）。

因此桌號範圍目前沒有任何跨輪次記憶。本變更要為桌號範圍加上與組別相同性質的記憶機制，但定位為「可編輯的預填預設值」。

## Goals / Non-Goals

**Goals:**
- 桌號範圍跨輪次保留，返回設定畫面時預填上次使用的起始／結束桌號。
- 預填值維持可編輯，使用者隨時可手動調整。
- 與既有組別記憶機制風格一致，最小化程式碼異動。

**Non-Goals:**
- 不鎖定或強制沿用桌號範圍（非唯讀）。
- 不改變既有 `state` 結構或 `ptcg_eor_tracker_state` 的儲存內容。
- 不調整輪次名稱 (`incrementRoundName`) 既有的自動遞增行為。

## Decisions

**決策 1：獨立 localStorage key，比照組別**
新增常數（如 `RANGE_STORAGE_KEY = 'ptcg_eor_range'`），與 `GROUP_STORAGE_KEY` 並列。理由：整輪狀態的 key 會在輪次重設時被清除，桌號範圍必須存在不受清除影響的獨立 key，才能跨輪次存活。此模式已在組別上驗證可行。

**決策 2：以單一 key 存 JSON `{start, end}`，而非兩個 key**
範圍是一組成對的值，存成 `JSON.stringify({ start, end })` 讀寫一致、易於擴充，避免兩個 key 不同步。讀取時以 `try/catch` 保護 `JSON.parse`，解析失敗即視為無紀錄並 fallback。
- 替代方案：兩個獨立 key（`ptcg_eor_start` / `ptcg_eor_end`）。較貼近組別的純字串風格，但兩值可能各自存在／缺失，增加 fallback 分支，故不採用。

**決策 3：僅在 `btnStart` 寫入，不在輸入時即時儲存**
組別的 `change` 事件因下拉選單值離散且立即有效，故即時儲存。桌號為自由輸入的數字，邊打邊存會記到中間的半成品值。改為在點擊「開始紀錄」、通過既有驗證後才寫入，語意上「上次使用的範圍」＝「上次實際開始的那一輪範圍」更精確。
- 替代方案：在 input 的 `change`/`input` 事件儲存，與組別完全對稱。因會污染記憶值而不採用。

**決策 4：新增 `restoreRangeSelection()`，於 `showSetupView()` 內 `setupForm.reset()` 之後呼叫**
必須在 `setupForm.reset()` 之後執行，否則 reset 會覆蓋掉還原的值——與 `restoreGroupSelection()` 的呼叫位置相同。無紀錄時沿用 HTML 既有的 `value="1"` / `value="50"` 作為 fallback（函式在無紀錄時不覆寫欄位即可）。

## Risks / Trade-offs

- [損毀或舊格式的 localStorage 值] → 讀取以 `try/catch` 包覆 `JSON.parse`，並驗證 start/end 為有效正整數，否則視為無紀錄、回退至 HTML 預設值。
- [`btnStart` 既有驗證已擋下非法範圍] → 僅在驗證通過後才寫入記憶，保證存入的範圍永遠合法，不會把錯誤值帶回下一輪。
- [PWA 快取使舊版 app.js 續用] → 更新 `sw.js` 快取版本號，確保使用者取得含新邏輯的 `app.js`。
- [既有使用者無此 key] → 首次升級後 key 不存在屬正常情形，fallback 至預設值 1 / 50，與目前行為一致，無遷移負擔。
