## Context

`buildRemainingInfo()`（`app.js:485`）目前用 `normal.join('\n')` 產生剩餘一般桌字串。改為 `normal.join(', ')` 即可完成此變更，無其他架構影響。

## Goals / Non-Goals

**Goals:**
- 剩餘一般桌改為單行逗號分隔輸出
- 加時桌格式維持逐行不變

**Non-Goals:**
- 不修改「加時桌次」或「本輪範圍」的複製格式
- 不調整 UI

## Decisions

### 唯一決策：分隔符號

**決定**：使用 `', '`（逗號加空格）

**理由**：逗號分隔是桌號清單最常見的可讀格式；加空格讓視覺更清晰。

## Risks / Trade-offs

- 無已知風險，屬純輸出格式微調
- `sw.js` 需更新版本號以讓已安裝 PWA 取得更新的 `app.js`
