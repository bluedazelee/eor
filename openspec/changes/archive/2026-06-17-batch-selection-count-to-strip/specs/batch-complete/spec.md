## MODIFIED Requirements

### Requirement: 浮動操作列顯示

選取模式啟用時，系統 SHALL 在 tracker-view 的格線上方顯示操作列與資訊列。已選桌數（格式：「已選 N 桌」）SHALL 顯示於 compact-strip 資訊列中（位於 `R{輪次}・{完成/總計}` 與篩選按鈕之間），不再位於操作列內。操作列 SHALL 以單一水平行呈現，依序包含：取消按鈕、全選未完成按鈕、清除全選按鈕、反選按鈕（靠左），以及確認執行按鈕（靠右）。確認執行按鈕 SHALL 在已選桌數為 0 時停用。已選桌數 SHALL 即時反映 selectedTables 的大小。

#### Scenario: 已選桌數顯示於 compact-strip

- **WHEN** 使用者進入批次選取模式
- **THEN** compact-strip 資訊列 SHALL 顯示「已選 0 桌」於進度資訊與篩選按鈕之間，操作列 SHALL 不包含任何計數文字

#### Scenario: 已選桌數即時更新

- **WHEN** 使用者在選取模式中點擊卡片或使用快捷操作
- **THEN** compact-strip 中的已選桌數 SHALL 即時更新，確認執行按鈕的啟用狀態 SHALL 同步更新

#### Scenario: 無選取時確認執行停用

- **WHEN** 選取模式剛進入，或使用者清除全選後，已選桌數為 0
- **THEN** 「確認執行」按鈕 SHALL 為停用狀態，無法點擊

#### Scenario: 操作列為純按鈕行

- **WHEN** 使用者在批次選取模式中
- **THEN** 操作列 SHALL 僅包含操作按鈕（取消、全選未完成、清除全選、反選、確認執行），不含任何狀態文字元素
