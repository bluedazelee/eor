## Context

tracker-view 的三個 filter 按鈕（全部設為已完成、複製資訊、只顯示加時桌）使用 CSS `:hover` 提供滑鼠懸停的視覺回饋。在觸控裝置上，瀏覽器會在 tap 時模擬 `:hover`，但沒有等效的「離開」事件，導致 hover 樣式在點擊後持續殘留，直到使用者 tap 其他地方才解除。

## Goals / Non-Goals

**Goals:**
- 觸控裝置上的 filter 按鈕點擊後，hover 樣式立即消失，不需額外操作
- 滑鼠裝置的 hover 視覺回饋保持原樣不變

**Non-Goals:**
- 不處理其他元件的 hover 黏滯問題（如桌號卡片、popup 按鈕）
- 不為觸控裝置補充替代的按壓視覺回饋（現有 `:active` 樣式已足夠）

## Decisions

**使用 `@media (hover: hover)` 包住 `:hover` 規則，而非移除或改用其他方案**

`hover: hover` 媒體查詢精確對應「主要輸入裝置支援懸停」的裝置（滑鼠、觸控板），觸控螢幕命中 `hover: none` 因此完全不套用這些樣式。

排除的替代方案：
- 直接移除 `:hover`：PC 也失去 hover 回饋，體驗退化
- 改用 `:active`：按下/放開的瞬間回饋，無法達到 hover 懸停的持續提示效果
- JS 控制 class：為純視覺問題引入額外邏輯，過度設計

## Risks / Trade-offs

[混合輸入裝置，如附有觸控螢幕的筆電] → `hover: hover` 在大多數這類裝置上仍會命中（因滑鼠/觸控板是主要輸入），行為正確；純觸控筆電邊緣情況下可能無 hover，但不影響功能
