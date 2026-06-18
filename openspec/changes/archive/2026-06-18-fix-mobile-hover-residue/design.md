## Context

CSS `:hover` 在觸控裝置上的行為：手指 tap 時瀏覽器套用 `:hover`，手指離開後樣式**不自動移除**（sticky hover），直到使用者 tap 其他元素。`@media (hover: hover)` 僅在指標裝置支援真實懸停（滑鼠/觸控板）時成立，可完全阻止觸控裝置套用 hover 樣式。

目前 filter 按鈕（`.btn-filter`、`.btn-filter-copy`、`.btn-filter-complete`）已正確包於此 media query，但批量選取列與 action-footer 的按鈕未做保護。

## Goals / Non-Goals

**Goals:**
- 所有互動按鈕的 `:hover` 樣式均受 `@media (hover: hover)` 保護
- 觸控裝置 tap 後按鈕立即回到靜止外觀

**Non-Goals:**
- 更改任何 `:active` 樣式（tap 時的瞬間視覺回饋應保留）
- 更改桌機的 hover 行為

## Decisions

### 決策：就地包入 media query，不重構 CSS 結構

每組 `:hover` 規則各自就近包入 `@media (hover: hover) { ... }`，保持 CSS 宣告位置不變，最小化 diff。

替代方案：將所有 `@media (hover: hover)` 集中到檔案底部統一管理。否決，因為會讓樣式宣告與其對應的基礎樣式分離，增加維護難度。

### 決策：一次修正所有受影響的 hover 規則

同步修正 `btn-primary`、`btn-warning`、`btn-success` 的 hover，而非只修批量選取按鈕。原因：這三個 class 是全域基礎樣式，且 `dynamic-round-end-button` change 完成後 action-footer 的動態按鈕也會用到 `btn-warning` 和 `btn-success`，一次修正可避免遺漏。

## Risks / Trade-offs

- **[Risk] 無** — 純 CSS 改動，不影響 JS 邏輯，且所有修改在桌機上行為完全一致。
