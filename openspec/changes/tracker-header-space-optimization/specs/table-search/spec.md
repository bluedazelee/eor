## MODIFIED Requirements

### Requirement: 搜尋列位置與顯示

追蹤主畫面的 control-row 最右側 SHALL 顯示一個搜尋 icon 按鈕（`#btn-search-toggle`）。搜尋輸入欄位（`.table-search-bar`）SHALL 預設隱藏；點擊 icon 按鈕後 SHALL 展開顯示於 dashboard-bar 下方，icon 按鈕 SHALL 呈現啟用樣式。再次點擊 icon 按鈕 SHALL 收起搜尋列，並清除目前搜尋結果與高亮狀態。批次選取模式啟用期間，搜尋 icon 按鈕 SHALL 隱藏，若搜尋列此時為展開狀態 SHALL 強制收起。

#### Scenario: 進入追蹤主畫面時搜尋列預設收起

- **WHEN** 使用者進入追蹤主畫面（開始紀錄或從 localStorage 還原）
- **THEN** 搜尋 icon 按鈕 SHALL 顯示於 control-row 最右側，搜尋輸入欄位 SHALL 為隱藏狀態

#### Scenario: 點擊搜尋 icon 展開搜尋列

- **WHEN** 使用者點擊 control-row 的搜尋 icon 按鈕
- **THEN** 搜尋輸入欄位 SHALL 展開顯示於 dashboard-bar 下方，搜尋欄位 SHALL 自動取得焦點，icon 按鈕 SHALL 呈現啟用樣式

#### Scenario: 再次點擊搜尋 icon 收起搜尋列

- **WHEN** 搜尋列已展開，使用者再次點擊搜尋 icon 按鈕
- **THEN** 搜尋輸入欄位 SHALL 收起隱藏，所有卡片高亮狀態 SHALL 清除，icon 按鈕恢復未啟用樣式

#### Scenario: 批次模式強制收起搜尋列

- **WHEN** 使用者點擊「批量設為已完成」進入批次選取模式，此時搜尋列為展開狀態
- **THEN** 搜尋列 SHALL 強制收起，高亮狀態 SHALL 清除，搜尋 icon 按鈕 SHALL 隱藏

#### Scenario: 批次模式結束後搜尋 icon 恢復可見

- **WHEN** 使用者退出批次選取模式（取消或確認執行）
- **THEN** 搜尋 icon 按鈕 SHALL 重新顯示於 control-row，搜尋列維持收起狀態
