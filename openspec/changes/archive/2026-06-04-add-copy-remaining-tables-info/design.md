## Context

EoR Tracker 是純前端 PWA（vanilla JS + HTML + CSS），可離線使用。桌號資料存於 `state.tables[]`，每筆含 `number`、`state`（`active`/`assigned`/`completed`）與 `overtimeMinutes`（`null` 或正整數）。需新增一個按鈕，把所有未完成桌號整理成可分享文字並複製到剪貼簿，方便回報給主辦／其他裁判。

## Goals / Non-Goals

**Goals:**
- 新增「複製剩餘桌次資訊」按鈕，依未完成桌號產生固定格式字串
- 將字串複製到剪貼簿，並給予複製成功／失敗回饋
- 在離線／PWA 情境下仍能可靠複製

**Non-Goals:**
- 不修改桌號狀態或既有篩選邏輯
- 不提供格式自訂選項
- 不匯出檔案（僅複製字串）

## Decisions

**決策 1：未完成定義與分組**
- 未完成 = `state !== 'completed'`（含 `active` 與 `assigned`）
- 加時桌 = `overtimeMinutes !== null`；一般桌 = `overtimeMinutes === null`
- 兩組各自依 `number` 由小到大排序
- 理由：與既有狀態模型一致，語意清楚

**決策 2：字串組裝以純函式產生**
- 選擇：新增 `buildRemainingInfo()` 讀取 `state.tables`，回傳多行格式字串：`剩餘 ${n} 桌` 後空行、`剩餘加時桌：` 換行接各加時桌（每桌一行）、空行、`剩餘一般桌：` 換行接各一般桌（每桌一行）
  - 加時桌項目格式 `${number}(+${overtimeMinutes}分)`，一般桌項目格式 `${number}`，組內以 `\n` 分隔
  - 三段之間以空行（`\n\n`）分隔
  - 任一組為空時該組內容為 `無`
- 棄選：直接在事件處理中組字串；抽成純函式較易測試與閱讀
- 理由：單一職責，輸出明確

**決策 3：複製採 Clipboard API 並含 fallback**
- 選擇：優先 `navigator.clipboard.writeText()`（在 https 與 localhost 為 secure context 可用）；若不可用或 reject，退回建立暫時 `<textarea>` + `document.execCommand('copy')`
- 棄選：只用 Clipboard API；在 `file://` 或非安全情境會失敗，PWA 離線分享情境需要 fallback
- 理由：兼顧現代 API 與離線可靠性

**決策 4：複製回饋採原生 `alert()`**
- 選擇：成功顯示 `已複製剩餘桌次資訊`，失敗顯示錯誤提示
- 棄選：自訂 toast；與既有 `alert()`/`confirm()` 慣例一致、零額外 UI 成本
- 理由：與專案現有回饋模式一致，最小變更

**決策 5：按鈕位置沿用上方控制列**
- 選擇：置於 `control-row` 的 `.filter-btns` 群組，與「全部設為已完成」「只顯示加時桌」並列
- 理由：屬於上方工具列操作，與近期新增按鈕一致；以 flex + gap 容許窄螢幕換行

## Risks / Trade-offs

- [剪貼簿權限] 某些瀏覽器需使用者手勢觸發 → 由按鈕 click 觸發，符合手勢要求；另有 execCommand fallback
- [上方按鈕變多] 控制列在窄螢幕可能擁擠 → `.filter-btns` 使用 flex 容許換行，必要時於 RWD 微調
