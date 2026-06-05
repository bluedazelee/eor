## 1. HTML 結構

- [x] 1.1 在 setup-view 表單的 `btn-start` 下方新增 `btn-help`（`btn-secondary` 樣式）
- [x] 1.2 新增 `help-view` section（`view-panel hidden`），包含 `help-header`（標題 + `btn-help-back`）與 `help-content`
- [x] 1.3 在 `help-content` 內依序加入八個 `help-section`，各含 `help-section-title`、`help-item` 列表
- [x] 1.4 在「桌次狀態管理」區段加入三個顏色 chip（`state-chip-active`、`state-chip-assigned`、`state-chip-completed`）
- [x] 1.5 在「加時桌標記」區段加入 `overtime-badge-demo` 示意元素

## 2. CSS 樣式

- [x] 2.1 新增 `btn-secondary`：透明底、細邊框、低視覺權重，`margin-top: 8px`
- [x] 2.2 新增 help-view 佈局樣式：`help-header`、`help-content`（`overflow-y: auto`）、`btn-back`
- [x] 2.3 新增說明區塊樣式：`help-section`、`help-section-title`、`help-item`、`help-item-label`、`help-tip`
- [x] 2.4 新增視覺元件樣式：`state-chip`、`state-chip-active/assigned/completed`、`overtime-badge-demo`

## 3. JS 邏輯

- [x] 3.1 在頂部 DOM 參考區新增 `helpView`、`btnHelp`、`btnHelpBack`
- [x] 3.2 新增 `showHelpView()` 函式：隱藏 setupView 與 trackerView，顯示 helpView
- [x] 3.3 綁定 `btnHelp` click 事件 → `showHelpView()`
- [x] 3.4 綁定 `btnHelpBack` click 事件 → 隱藏 helpView、顯示 setupView
- [x] 3.5 在 `showTrackerView()` 補上 `helpView.classList.add('hidden')`，防止殘留顯示
