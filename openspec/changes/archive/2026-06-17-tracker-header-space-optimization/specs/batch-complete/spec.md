## ADDED Requirements

### Requirement: 批次模式切換 dashboard 為簡要顯示

進入選取模式時，系統 SHALL 隱藏完整的 dashboard-bar 內容（stats 文字、進度條、control-row），並顯示一個簡要資訊列（`.dashboard-compact-strip`），格式為「`R{輪次}・{已完成桌數}/{總桌數}`」（例：`R1・12/50`）。退出選取模式時，系統 SHALL 恢復完整 dashboard-bar 顯示並隱藏簡要資訊列。

#### Scenario: 進入批次模式時顯示簡要資訊列

- **WHEN** 使用者點擊「批量設為已完成」進入選取模式
- **THEN** 系統 SHALL 隱藏完整 dashboard-bar，並在其位置顯示簡要資訊列，內容格式為 `R{輪次}・{已完成桌數}/{總桌數}`，數值反映進入批次模式當下的即時狀態

#### Scenario: 退出批次模式後恢復完整 dashboard

- **WHEN** 使用者點擊「取消」或「確認執行」退出選取模式
- **THEN** 系統 SHALL 隱藏簡要資訊列，恢復顯示完整 dashboard-bar（含更新後的 stats 與進度條）

#### Scenario: 批次模式中簡要資訊列不更新

- **WHEN** 使用者在選取模式中執行快捷選取操作（全選、清除、反選）
- **THEN** 簡要資訊列的數字 SHALL 維持進入批次模式時的數值不變（反映桌次完成狀態，非選取數量）
