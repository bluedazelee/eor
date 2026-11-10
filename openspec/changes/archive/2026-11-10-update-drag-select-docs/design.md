## Context

在完成 `batch-drag-select` 變更後，`#help-view` 第七節雖已加入「滑動多選」條目，但對於現場裁判實際使用時最常遇到的手勢細節（為何直接滑是捲動、按住 0.2 秒才是滑選、為何「尚未結束」與「已分配」可以一起連選而「已完成」會被跳過、往回滑可退回預覽）說明較為簡略；此外 `README.md` 亦尚未記錄滑動多選功能。

## Goals / Non-Goals

**Goals:**
- 在 `index.html` 的 `#help-view` 第七節提供清楚完整的「滑動多選」操作說明。
- 在 `README.md` 第七節同步補齊「滑動多選」表格列與批次模式資訊列控制說明。
- 遞增 `sw.js` 的 `CACHE_NAME` 版本號以確保 PWA 使用者取得更新後的 `index.html`。

**Non-Goals:**
- 不修改任何 CSS 樣式或 JavaScript 程式碼邏輯。

## Decisions

### 1. 維持 `#help-view` 既有 `.help-item` 結構
- **決策**：直接更新 `#help-view` 第七節中「滑動多選」`.help-item` 的內文，不新增額外 DOM 結構或樣式類別，保持與其他說明章節一致的視覺排版。

### 2. 同步更新 `README.md` 與 `sw.js`
- **決策**：於 `README.md`「七、批量設為已完成」表格「點選卡片」下方插入「滑動多選」列，並補充上方資訊列 `+ / −` 與篩選器說明；同時將 `sw.js` 的 `CACHE_NAME` 升版至 `ptcg-eor-v23`。

## Risks / Trade-offs

- **[Risk] 手機小螢幕上說明文字過長導致換行擁擠** → **Mitigation**：`.help-item` 已具備 `line-height: 1.6` 與彈性排版，文字分段以標點自然斷句，在手機寬度下依然清晰易讀。
