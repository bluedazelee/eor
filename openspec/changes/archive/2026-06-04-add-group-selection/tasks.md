## 1. HTML 結構

- [x] 1.1 在 `index.html` 的 `#setup-form` 中（輪次名稱欄位附近）新增「組別」下拉選單 `<select id="group-select">`，硬編 11 個 `<option>`：大師A、大師B、大師C、大師D、大師E、大師F、大師G、少年A、少年B、孩童A、孩童B，第一項「大師A」為預設選取

## 2. CSS 樣式

- [x] 2.1 在 `style.css` 中為 `#group-select` 套用與既有 `.input-group input` 一致的下拉選單樣式（背景、邊框、focus 樣式）

## 3. JavaScript 實作

- [x] 3.1 在 `app.js` 中新增 `groupSelect` DOM 參考（對應 id `group-select`）與 `GROUP_STORAGE_KEY = 'ptcg_eor_group'`
- [x] 3.2 新增 `state.group` 欄位（初始可為預設「大師A」）
- [x] 3.3 在進入入口畫面時（`showSetupView()` 與初始載入）從 `GROUP_STORAGE_KEY` 還原上次選擇並套用到 `groupSelect.value`；無紀錄時維持預設第一項
- [x] 3.4 綁定 `groupSelect` 的 `change` 事件：將目前值寫入 `GROUP_STORAGE_KEY`
- [x] 3.5 在 `btnStart` 開始紀錄流程中，將 `groupSelect.value` 快照寫入 `state.group`（並隨 `saveState()` 保存）
- [x] 3.6 在 `loadState()` 向下相容：若還原的 `state.group` 為 undefined，回填為 `GROUP_STORAGE_KEY` 值或預設「大師A」
- [x] 3.7 修改 `buildRemainingInfo()`：回傳字串首行為 `state.group`，其後空行接續既有多行剩餘桌次資訊

## 4. 驗證

- [x] 4.1 測試首次使用：入口畫面組別選單預設停在「大師A」
- [x] 4.2 測試記憶：選「少年A」開始紀錄並結束本輪後，重回入口畫面選單維持「少年A」
- [x] 4.3 測試開始紀錄沿用：選「大師C」開始後，複製剩餘桌次資訊首行為「大師C」
- [x] 4.4 測試複製字串完整格式：首行組別、空行、剩餘桌數、加時桌、一般桌多行格式皆正確
- [x] 4.5 測試向下相容：載入無 `group` 欄位的舊狀態時，複製字串首行不顯示 `undefined`
