## Why

目前的組別下拉選單硬編碼了 11 個 PTCG 固定選項，無法適應不同賽事的組別命名需求。將其改為自由文字輸入可讓此工具在任何賽事環境中通用，不再受限於特定組別結構。

## What Changes

- **移除** 組別固定下拉選單（`<select>`）及其 11 個硬編碼選項
- **新增** 組別自由文字輸入欄位（`<input type="text">`），預設為空字串，必填
- **修改** 組別記憶行為：儲存並還原使用者上次輸入的任意字串（維持現有 localStorage key `ptcg_eor_group`）
- **移除** `DEFAULT_GROUP` 常數（`'大師A組'`）及 `app.js` 中所有硬編碼預設組別字串
- `sw.js` 版本號需更新以確保 PWA 使用者取得最新資源

## Capabilities

### New Capabilities

（無新 capability）

### Modified Capabilities

- `group-selection`：組別欄位從固定下拉選單改為自由文字輸入；預設值從「大師A組」改為空字串；必填驗證改由 JS 手動執行；記憶行為維持不變

## Impact

- `index.html`：`<select id="group-select">` 及 11 個 `<option>` 替換為 `<input type="text" id="group-input">`
- `app.js`：DOM 參照更名（`groupSelect` → `groupInput`）、移除 `DEFAULT_GROUP` 常數、調整 `restoreGroupSelection()`、新增必填驗證、`buildRangeInfo()` 微調
- `style.css`：不需改動（text input 沿用現有 input 樣式）
- `sw.js`：更新快取版本號
