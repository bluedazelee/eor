## Context

numpad 搜尋目前採即時觸發設計（`handleTableSearch()` 在每次 digit/backspace 按下時呼叫）。當使用者輸入多位數桌號（如「25」）時，中間值「2」會先觸發搜尋，若桌 2 被篩選器隱藏，系統就在使用者完成輸入前就清除了篩選設定，這是非預期行為。

本次改動將搜尋觸發時機移至明確的使用者確認動作（按「確定」），並針對三種情境分別設計回應流程。

## Goals / Non-Goals

**Goals:**
- 只在使用者按下「確定」後才執行搜尋，消除中間輸入值觸發的副作用
- 提供清楚的三情境回應（不存在 / 可見 / 被篩選隱藏）
- 保留 numpad 開啟期間高亮持久化（跨 re-render）

**Non-Goals:**
- 修改 numpad 的視覺佈局比例或尺寸
- 支援鍵盤輸入（維持自訂 numpad 設計）
- 修改篩選器本身的行為

## Decisions

### 1. 確認觸發 vs 即時觸發

選擇確認觸發（confirm-on-demand）。

即時觸發的核心問題是副作用時機不可控——清除篩選是破壞性操作，不應在使用者輸入完成前發生。確認觸發將副作用完全集中在單一動作點，使行為可預測。

### 2. 確定後關閉 numpad（成功情境）

按確定且成功找到可見桌次 → 關閉 numpad，跳轉並高亮。

理由：搜尋完成後 numpad 繼續留在畫面上會干擾使用者查看目標卡片。若使用者想搜尋下一個桌號，重新點擊 🔍 開啟即可。

### 3. 篩選器隱藏情境使用自訂確認視窗

選擇自訂視窗而非 `window.confirm()`。

`window.confirm()` 在 iOS PWA 環境中可能被阻擋或顯示異常；且自訂視窗與現有 overtime popup 風格一致，使用相同 overlay 機制，維護成本低。

自訂確認視窗包含：說明文字、「取消」與「確認跳轉」兩個按鈕。確認後關閉視窗與 numpad，執行清除篩選 + 跳轉；取消後關閉視窗，numpad 維持開啟。

### 4. `confirmedSearchValue` 追蹤已確認搜尋值

`renderCards()` 在渲染後需重新套用高亮，因為 DOM 是動態生成的。目前使用 `searchBuffer` 判斷，但在確認制下 `searchBuffer` 反映的是輸入緩衝而非已執行搜尋的值。

新增 `confirmedSearchValue`（number 或 null）：
- 按確定且成功找到目標後設為對應桌號數字
- `renderCards()` 改用 `confirmedSearchValue` 重新套用高亮
- 開啟 numpad 時重置為 null（同時立即清除高亮）

### 5. ✕ 按鈕定位

使用 `position: absolute` 置於 numpad popup 右上角標題列內，圓形小按鈕（24px）。不改變現有 numpad grid 結構。

## Risks / Trade-offs

- [行為變更] 使用者習慣即時跳轉後需要多按一步確認 → 新增 ✕ 快速關閉降低摩擦；三情境的清楚視覺回饋補償操作步驟增加
- [Re-render 時機] 若使用者在確認後立即觸發桌次狀態變更（如點擊卡片），renderCards 會以 `confirmedSearchValue` 重新套用高亮，行為符合預期
