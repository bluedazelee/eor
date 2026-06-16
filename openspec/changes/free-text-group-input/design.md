## Context

設定畫面目前使用 `<select>` 元素固定提供 11 個 PTCG 組別選項。此工具定位為通用 EoR 追蹤工具，硬編碼的組別清單限制了跨賽事的適用性。改動範圍僅限於設定畫面的單一欄位，影響面小。

## Goals / Non-Goals

**Goals:**
- 以自由文字輸入取代固定下拉選單，允許任意組別名稱
- 維持跨輪次記憶行為（localStorage key 不變）
- 向後相容：現有已儲存的組別字串可直接沿用

**Non-Goals:**
- 自動完成或歷史建議（超出範圍）
- 組別格式驗證（允許任意字串）
- `style.css` 修改（沿用現有 input 樣式）

## Decisions

### 1. 移除 `DEFAULT_GROUP` 常數

原常數 `'大師A組'` 在多處作為預設回退值。新設計中組別無預設值，首次使用時欄位為空。`loadState()` 的向後相容補丁改為：若 `state.group` 為 `undefined`，從 localStorage 還原（若無則保持空字串，等待使用者開始新一輪時填入）。`buildRangeInfo()` 直接使用 `state.group`，不需回退。

### 2. 必填驗證改由 JS 手動執行

`<input required>` 屬性對 HTML5 表單驗證有效，但開始按鈕是 `type="button"`，不觸發原生表單驗證。沿用現有 `btnStart` click handler 中的手動驗證模式（與 `roundName`、桌號範圍的驗證方式一致）。

*替代方案*：將 button 改為 `type="submit"` 以啟用原生驗證 → 需要重構整個表單提交邏輯，不值得。

### 3. 記憶時機：`input` 事件即時存入 localStorage

沿用原 `change` 事件的精神，但改為監聽 `input` 事件，讓每次按鍵都即時儲存，與其他欄位的行為保持一致。

### 4. DOM 參照更名：`groupSelect` → `groupInput`

配合元素類型改變，更名以維持語意清晰。

## Risks / Trade-offs

- **現有 localStorage 值為舊組別名稱**（如「大師A組」）→ 直接填入 text input，使用者看到上次使用的值，可自行修改，無需 migration
- **使用者可能輸入空白字串繞過驗證**（如只按空格）→ 驗證時使用 `.trim()` 確保非空
