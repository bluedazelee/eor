## Context

EoR Tracker 是純前端 PWA（vanilla JS + HTML + CSS）。入口畫面 `#setup-view` 目前有輪次名稱、起始／結束桌號三個欄位，按「開始紀錄」後建立 `state.tables` 並切到主畫面。輪次狀態存於單一 LocalStorage key（`ptcg_eor_tracker_state`），但 `resetAndReturnToSetup()` 會在每輪結束時 `removeItem` 清除該 key。需新增「組別」必填選單，且其選擇要跨輪次保留，並讓 `buildRemainingInfo()` 在字串首行帶出組別。

## Goals / Non-Goals

**Goals:**
- 入口畫面新增 11 選項的組別下拉選單，必填
- 選單預設「大師A」；選擇後跨輪次記住上次選擇
- 所選組別納入 `state` 並於複製剩餘桌次資訊字串首行顯示

**Non-Goals:**
- 不變更桌號狀態機、統計、篩選或既有複製格式（僅在首行加組別）
- 不提供自訂組別文字輸入
- 不做組別相關的多輪歷史記錄

## Decisions

**決策 1：組別選項以靜態 `<select>` 提供**
- 選擇：在 `#setup-form` 內新增 `<select id="group-select">`，硬編 11 個 `<option>`（大師A–G、少年A–B、孩童A–B），第一項 `大師A` 為預設
- 棄選：以 JS 動態生成選項；選項固定且少，靜態 HTML 最簡單直觀
- 理由：低複雜度、易讀

**決策 2：上次選擇以獨立 LocalStorage key 保存**
- 選擇：新增 `GROUP_STORAGE_KEY = 'ptcg_eor_group'`，與輪次狀態分離；於 `showSetupView()`（或載入時）讀取還原選單值，於選單 `change` 時寫入
- 棄選：把組別放進 `state` 並依賴主 STORAGE_KEY；但 `resetAndReturnToSetup()` 會清除該 key，無法跨輪次保留
- 理由：必須在輪次重設後仍記住，獨立 key 最直接

**決策 3：組別納入 `state.group` 供複製字串使用**
- 選擇：`btnStart` 開始紀錄時把選單目前值寫入 `state.group` 並隨 `state` 保存；`buildRemainingInfo()` 以 `state.group` 組出首行
- 理由：複製功能讀 `state`，組別屬於當前輪次的一部分

**決策 4：必填以預設值天然滿足**
- 選擇：選單一律有值（預設大師A 或上次選擇），故開始紀錄時必有組別，無需額外驗證或空值處理
- 理由：避免「未指定」分支，符合使用者「必填」需求且實作最少

**決策 5：`buildRemainingInfo()` 首行加組別**
- 選擇：回傳字串改為 `${state.group}\n\n` 後接現有多行內容
- 棄選：在事件處理層拼接；放在純函式內可讓輸出單一來源、易測
- 理由：維持單一字串組裝入口

## Risks / Trade-offs

- [舊資料相容] 既有 LocalStorage 狀態無 `group` 欄位 → 還原時若 `state.group` 為 undefined，`buildRemainingInfo()` 以選單目前值或預設「大師A」回填，避免顯示 `undefined`
- [雙 key 一致性] 組別存於獨立 key 與 `state.group` 兩處 → 以「選單值為單一事實來源、開始紀錄時快照入 state」界定，降低不一致
