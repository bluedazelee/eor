## Why

在手機觸控裝置上，CSS `:hover` 狀態在 tap 後不會自動消失，導致 tracker 頁的「全部設為已完成」、「複製資訊」、「只顯示加時桌」三個按鈕在點擊後出現 hover 亮起效果殘留，必須再次點擊才能解除，造成視覺混亂。

## What Changes

- 將 `style.css` 中的 `.btn-filter-complete:hover`、`.btn-filter-copy:hover`、`.btn-filter:hover` 三個規則包入 `@media (hover: hover)` 媒體查詢
- 觸控裝置（`hover: none`）不套用這些 `:hover` 樣式，hover 黏滯問題消除
- 滑鼠裝置（`hover: hover`）行為完全不變

## Capabilities

### New Capabilities
<!-- 無 -->

### Modified Capabilities
- `mobile-layout`: 新增按鈕觸控互動的視覺回饋規範 — 觸控裝置上的 filter 按鈕 SHALL NOT 因 `:hover` 樣式造成點擊後殘留亮起效果

## Impact

- **style.css**: 三個 `:hover` 規則包入 `@media (hover: hover)` — 純 CSS 修改，無 HTML / JS 異動
- **sw.js**: 無需更新快取版本號，style.css 已在 Service Worker 快取中，下次請求時會自動取得最新版本
