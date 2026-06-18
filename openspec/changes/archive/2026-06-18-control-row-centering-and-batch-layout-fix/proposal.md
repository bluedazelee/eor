## Why

兩個獨立的佈局問題需要修正：

1. **control-row 換行後左對齊**：目前 `flex-wrap` 換行後，各列按鈕靠左對齊，視覺上不平衡。同時「隱藏完成/只顯示加時」和「📋/🔍」是裸按鈕，可能在換行時被拆到不同列，破壞語意分組。

2. **批量模式雙 span 顯示 bug**：上一次 change 移除了 `.label-short { display: none }` 的 CSS 規則，但 compact strip 和 selection action bar 的按鈕仍保留 `label-long`/`label-short` 雙 span 結構，導致兩段文字同時顯示、按鈕列溢出可視範圍。修復方式為固定使用短標籤，優先保住批量模式下的 card-grid 高度佔比。

## What Changes

- **control-row 對齊**：新增 `justify-content: center`，換行時每列按鈕置中
- **按鈕語意分組**：在 `index.html` 中用 `div.btn-group` 容器將「隱藏完成/只顯示加時」和「📋/🔍」各自包裹，使 flex-wrap 以組為單位斷行
- **compact strip 短標籤**：移除 `btn-hide-completed-compact` 和 `btn-overtime-filter-compact` 的 label-long/label-short span，改為固定短文字「隱藏」「加時」
- **selection action bar 短標籤**：移除 `btn-select-all-incomplete`、`btn-select-clear`、`btn-selection-confirm` 的 label-long/label-short span，改為固定短文字「全選」「清除」「確認」

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

- `mobile-layout`：control-row 換行置中對齊；批量模式按鈕列不溢出規範
- `batch-complete`：selection action bar 按鈕標籤規範（固定短標籤）

## Impact

- `index.html`：包裝兩組裸按鈕、移除四個按鈕的 label-long/label-short span
- `style.css`：新增 `justify-content: center` 至 `.control-row`；新增 `.btn-group` 容器樣式
- 無 JS 變動
- `sw.js`：不涉及快取資源變更，無需更新版本號
