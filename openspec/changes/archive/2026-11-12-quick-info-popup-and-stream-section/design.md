## Context

裁判在宣告 EoR 後需隨時掌握場上剩餘桌次的狀況（剩餘幾桌、有哪些直播桌、加時桌與一般桌）。目前系統只能透過點擊 `📋` 展開選單並選擇「詳細資訊」複製到剪貼簿後以原生 `alert` 預覽，操作路徑長且會覆蓋剪貼簿原有內容。此外，目前詳細資訊字串中，未完成的直播桌是直接混在加時桌或一般桌內標註為 `N(直播)`，無法一目了然看出場上所有尚未完成的直播桌次。

## Goals / Non-Goals

**Goals:**
- 在控制列 `📋`（複製選單）按鈕左側新增 `ℹ️`（`#btn-show-info`）快速查看按鈕。
- 點擊 `ℹ️` 時跳出與 App 風格一致的深色 Modal 彈窗（`#info-detail-popup`），完整呈現格式化後的詳細資訊內容，並支援點擊右上角 `✕`、底部「關閉」按鈕或點擊外部遮罩關閉。
- 更新 `buildRemainingInfo()` 產生的詳細資訊內容結構：
  - 當場上存在未完成直播桌（`t.isStream === true` 且 `t.state !== 'completed'`）時，在「剩餘加時桌：」之上獨立顯示「剩餘直播桌：」區塊。
  - 直播桌無加時顯示 `桌號`，有加時顯示 `桌號(+N分)`。
  - 加時桌與一般桌區塊排除直播桌，確保三個區塊之桌次完全互斥。
  - 若無未完成直播桌，則不顯示「剩餘直播桌：」區塊。
- 保持 `ℹ️ 顯示詳細資訊` 與 `📋 -> 詳細資訊` 共用同一份 `buildRemainingInfo()` 格式輸出。
- 同步更新使用說明畫面（`help-view`）、`README.md`，並更新 PWA 靜態快取版本至 `v26`。

**Non-Goals:**
- 不變更「本輪範圍」、「加時桌次」、「剩餘桌次」其他三種複製選項的文字輸出格式。
- 不改變直播桌在格線上的顏色徽章與二段式點擊狀態邏輯。

## Decisions

### 1. 資訊彈窗架構與互動設計
- **彈窗 DOM 結構**：
  在 `index.html` 新增 `#info-detail-overlay` 與 `#info-detail-popup`。內部結構包含：
  - 標題列：顯示「本輪詳細資訊」與關閉按鈕 `#btn-info-detail-x`。
  - 內容區：`#info-detail-content`（使用 `white-space: pre-wrap; font-family: inherit;` 完整呈現換行文字）。
  - 底部操作：`#btn-info-detail-close` 關閉按鈕。
- **開啟與關閉邏輯**：
  - 點擊 `#btn-show-info` 時，呼叫 `buildRemainingInfo()` 填入 `#info-detail-content`，移除 overlay 與 popup 的 `.hidden` 樣式。
  - 點擊 `#btn-info-detail-x`、`#btn-info-detail-close` 或 `#info-detail-overlay` 遮罩時，加入 `.hidden` 關閉彈窗。

### 2. 未完成桌次三段互斥分組邏輯
在 `buildRemainingInfo()` 中：
```js
const remaining = state.tables.filter(t => t.state !== 'completed');
const streamTables = remaining
  .filter(t => t.isStream)
  .sort((a, b) => a.number - b.number)
  .map(t => t.overtimeMinutes !== null ? `${t.number}(+${t.overtimeMinutes}分)` : `${t.number}`);

const overtimeTables = remaining
  .filter(t => !t.isStream && t.overtimeMinutes !== null)
  .sort((a, b) => a.number - b.number)
  .map(t => `${t.number}(+${t.overtimeMinutes}分)`);

const normalTables = remaining
  .filter(t => !t.isStream && t.overtimeMinutes === null)
  .sort((a, b) => a.number - b.number)
  .map(t => `${t.number}`);
```
組裝文字時：
- 首兩段固定為 `{組別} {輪次} {範圍}\n\n剩餘 {N} 桌`。
- 若 `streamTables.length > 0`，插入段落：`\n\n剩餘直播桌：\n${streamTables.join('\n')}`。
- 接續加時桌段落：`\n\n剩餘加時桌：\n${overtimeTables.length > 0 ? overtimeTables.join('\n') : '無'}`。
- 接續一般桌段落：`\n\n剩餘一般桌：\n${normalTables.length > 0 ? normalTables.join(', ') : '無'}`。

### 3. PWA 快取更新策略
- 更新 `index.html` 中的 `style.css?v=26` 與 `app.js?v=26`。
- 更新 `sw.js` 的 `CACHE_NAME = 'ptcg-eor-v26'`。

## Risks / Trade-offs

- **[Risk] 當剩餘桌次很多時，彈窗文字可能超出手機螢幕高度** → **Mitigation**：彈窗主體設定 `max-height: 80vh`，內容區 `#info-detail-content` 設定 `overflow-y: auto`，保證在小尺寸螢幕上均能順暢捲動檢視。
