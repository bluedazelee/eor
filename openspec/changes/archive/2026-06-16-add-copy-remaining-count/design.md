## Context

複製選單由 `index.html` 中的 popup `div` 搭配 `app.js` 中的三個 builder 函式（`buildRangeInfo`、`buildOvertimeInfo`、`buildRemainingInfo`）實作。所有 DOM ref 集中在模組頂部宣告，事件監聽器直接綁定各按鈕。

## Goals / Non-Goals

**Goals:**
- 新增 `buildRemainingCountInfo()` builder，產生「本輪範圍 + 剩餘桌數」字串。
- 在複製選單加入第四個選項「剩餘桌次」（置於「加時桌次」與「詳細資訊」之間）。
- 將四個複製選項的 alert 提示文字改為各自對應的名稱。

**Non-Goals:**
- 不新增任何全域狀態或資料結構。
- 不變更選單的視覺樣式或動畫。
- 不涉及 PWA 快取或 `sw.js`。

## Decisions

**新 builder 複用 `buildRangeInfo()`**
`buildRemainingCountInfo()` 直接呼叫 `buildRangeInfo()` 取得首行，再附加剩餘桌數行。避免重複計算邏輯，與其他 builder 的組合方式一致。

```
buildRemainingCountInfo()
  = buildRangeInfo() + "\n\n剩餘 N 桌"
  其中 N = state.tables.filter(t => t.state !== 'completed').length
```

**Alert 文字以選項名稱為前綴**
成功：`已複製{選項名稱}：\n{複製內容}`
失敗：`複製失敗，請手動複製：\n{複製內容}`
無加時桌：保留既有 `目前無加時桌`（此情況不執行複製，無內容可顯示）。

## Risks / Trade-offs

無重大風險。異動僅限 `index.html`（加一顆按鈕）與 `app.js`（加 DOM ref、函式、監聽器、改 alert 文字），不影響既有邏輯。
