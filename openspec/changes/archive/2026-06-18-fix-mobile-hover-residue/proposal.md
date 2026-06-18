## Why

批量選取模式的按鈕列（取消、選未完成、清空、反選、確認執行）與 action-footer 的結束按鈕，其 `:hover` 樣式未套用 `@media (hover: hover)` 保護，導致觸控裝置點按後 hover 樣式殘留，需額外點擊其他位置才會消除。filter 按鈕（複製資訊等）已正確處理此問題，應將同樣的規範擴展至其餘互動按鈕。

## What Changes

- 將 `style.css` 中以下 `:hover` 規則包入 `@media (hover: hover)`：
  - `.btn-sel-cancel:hover`
  - `.btn-sel-shortcut:hover`
  - `.btn-primary:hover`（影響批量確認按鈕，以及其他使用此 class 的按鈕）
  - `.btn-warning:hover`（影響 action-footer 的強制結束按鈕，與 `dynamic-round-end-button` change 配合）
  - `.btn-success:hover:not(:disabled)`（影響 action-footer 的確認完畢按鈕，與 `dynamic-round-end-button` change 配合）

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

- `mobile-layout`：新增批量選取列按鈕與 action-footer 按鈕的觸控 hover 殘留防護規範，與現有 filter 按鈕規範對齊

## Impact

- `style.css`：將上述 5 組 `:hover` 規則移入 `@media (hover: hover)` 區塊，無任何邏輯變更
- 桌機滑鼠使用者：行為不變
- `sw.js`：不涉及快取資源變更，無需更新版本號
