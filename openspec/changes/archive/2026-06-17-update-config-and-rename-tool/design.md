## Context

`openspec/config.yaml` 是 OpenSpec 系統的全域設定檔，其 `context` 區塊的內容會注入到所有 artifact 指示中，作為 AI 生成內容的專案背景。目前內容與 `develop` 分支的實際程式碼不符，影響後續 artifact 生成的準確性。

## Goals / Non-Goals

**Goals:**
- 使 config.yaml 的 context 精確反映目前程式碼狀態。
- 統一工具名稱為 PTCG EoR Tracker。

**Non-Goals:**
- 不修改任何應用程式程式碼。
- 不修改現有 spec 檔案（spec 不含工具名稱，無需更動）。
- 不涉及 schema 或 rules 的結構調整。

## Decisions

此 change 無需架構決策，為純文字編輯作業。對照 `app.js` 與 `index.html` 的現況確認各欄位，直接更新 config.yaml。

## Risks / Trade-offs

無重大風險。config.yaml 僅供 OpenSpec CLI 讀取，不影響執行期行為。
