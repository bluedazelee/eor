## Why

裁判常同時負責不同分組（大師／少年／孩童）的賽事，回報剩餘桌次時需要讓對方知道是哪一組的進度。目前複製出的資訊字串沒有組別資訊，接收方無法分辨來源組別。需在入口畫面讓使用者選擇所屬組別，並把該組別帶入複製字串。

## What Changes

- 入口（設定）畫面新增「組別」下拉選單，為必填欄位
- 選項共 11 項：大師A、大師B、大師C、大師D、大師E、大師F、大師G、少年A、少年B、孩童A、孩童B
- 選單預設停在第一項「大師A」；使用者選擇後，下次進入畫面維持上次選擇（以獨立 LocalStorage key 保存，跨輪次保留）
- 所選組別納入 state 並在開始紀錄時保存
- 「複製剩餘桌次資訊」字串於首行顯示組別值（僅顯示組別本身，例如 `大師A`），其後接既有剩餘桌次資訊

## Capabilities

### New Capabilities
- `group-selection`: 入口畫面選擇所屬組別，預設第一項並記住上次選擇

### Modified Capabilities
- `copy-remaining-tables-info`: 複製字串首行新增所屬組別

## Impact

- `index.html`：入口畫面新增組別下拉選單元素
- `app.js`：組別 DOM 參考、預設／記憶上次選擇的保存與還原、`buildRemainingInfo()` 首行加入組別
- `style.css`：下拉選單樣式（沿用既有 input 風格）
