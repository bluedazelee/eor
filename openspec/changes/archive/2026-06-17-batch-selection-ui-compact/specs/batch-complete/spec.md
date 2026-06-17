## MODIFIED Requirements

### Requirement: 浮動操作列顯示

選取模式啟用時，系統 SHALL 在 tracker-view 的格線上方顯示操作列。操作列 SHALL 以單一水平行呈現，依序包含：取消按鈕、全選未完成按鈕、清除全選按鈕、反選按鈕、已選桌數（格式：「已選 N 桌」，`flex: 1` 居中）、確認執行按鈕。已選桌數 SHALL 即時反映 selectedTables 的大小。確認執行按鈕 SHALL 在已選桌數為 0 時停用。操作列高度 SHALL 與正常模式 control-row 一致（單行內容高度）。

#### Scenario: 已選桌數即時更新

- **WHEN** 使用者在選取模式中點擊卡片或使用快捷操作
- **THEN** 操作列 SHALL 即時顯示最新已選桌數，確認執行按鈕的啟用狀態 SHALL 同步更新

#### Scenario: 無選取時確認執行停用

- **WHEN** 選取模式剛進入，或使用者清除全選後，已選桌數為 0
- **THEN** 「確認執行」按鈕 SHALL 為停用狀態，無法點擊

#### Scenario: 操作列為單行排版

- **WHEN** 使用者在手機（寬度 ≥ 320px）進入選取模式
- **THEN** 操作列 SHALL 以單一水平行顯示所有控制元件，不換行為兩行

## ADDED Requirements

### Requirement: 批次模式下可操作篩選器

批次選取模式啟用時，compact-strip 資訊列 SHALL 包含「隱藏完成」與「只顯示加時」兩個篩選按鈕，使用者 SHALL 能在不退出批次模式的情況下切換這兩個篩選狀態。篩選按鈕的啟用（active）樣式 SHALL 與正常模式的對應按鈕保持同步。

#### Scenario: 批次模式中切換隱藏完成篩選

- **WHEN** 使用者在批次選取模式中點擊 compact-strip 的「隱藏完成」按鈕
- **THEN** 系統 SHALL 切換 hideCompleted 狀態，重新渲染格線，compact-strip 與 dashboard-bar 中的對應按鈕 active 樣式 SHALL 同步更新

#### Scenario: 批次模式中切換只顯示加時篩選

- **WHEN** 使用者在批次選取模式中點擊 compact-strip 的「只顯示加時」按鈕
- **THEN** 系統 SHALL 切換 showOvertimeOnly 狀態，重新渲染格線，compact-strip 與 dashboard-bar 中的對應按鈕 active 樣式 SHALL 同步更新

#### Scenario: 進入批次模式時 compact-strip 篩選按鈕反映當前狀態

- **WHEN** 使用者在已啟用某篩選器的情況下點擊「批量設為已完成」進入批次模式
- **THEN** compact-strip 的篩選按鈕 SHALL 立即顯示與原始按鈕相同的 active 樣式
