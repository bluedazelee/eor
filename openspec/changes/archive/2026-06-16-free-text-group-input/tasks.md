## 1. HTML 結構修改

- [x] 1.1 在 `index.html` 中將 `<select id="group-select">` 及其所有 `<option>` 替換為 `<input type="text" id="group-input" placeholder="輸入組別名稱" autocomplete="off" required>`

## 2. app.js — DOM 參照與常數

- [x] 2.1 將 `app.js` 頂部的 `const DEFAULT_GROUP = '大師A組'` 常數移除
- [x] 2.2 將 `const groupSelect = document.getElementById('group-select')` 更名為 `const groupInput = document.getElementById('group-input')`

## 3. app.js — 記憶與還原邏輯

- [x] 3.1 修改 `restoreGroupSelection()`：將 `groupSelect.value = saved || DEFAULT_GROUP` 改為 `groupInput.value = saved || ''`
- [x] 3.2 修改 `groupSelect.addEventListener('change', ...)` 為 `groupInput.addEventListener('input', ...)` 並確認仍即時儲存至 `GROUP_STORAGE_KEY`
- [x] 3.3 修改 `loadState()` 中的向後相容補丁：`state.group = localStorage.getItem(GROUP_STORAGE_KEY) || ''`（移除 `DEFAULT_GROUP` 參照）

## 4. app.js — 開始紀錄驗證與狀態寫入

- [x] 4.1 在 `btnStart` click handler 中新增組別必填驗證：`if (!groupInput.value.trim()) { alert('請輸入組別！'); return; }`
- [x] 4.2 將 `state.group = groupSelect.value` 改為 `state.group = groupInput.value.trim()`
- [x] 4.3 將 `localStorage.setItem(GROUP_STORAGE_KEY, groupSelect.value)` 改為 `localStorage.setItem(GROUP_STORAGE_KEY, groupInput.value.trim())`

## 5. app.js — buildRangeInfo 清理

- [x] 5.1 將 `buildRangeInfo()` 中的 `const group = state.group || DEFAULT_GROUP` 改為 `const group = state.group`

## 6. PWA 快取更新

- [x] 6.1 在 `sw.js` 更新快取版本號
