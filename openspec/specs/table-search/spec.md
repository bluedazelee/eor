# Capability: table-search

## Purpose
在追蹤主畫面提供搜尋功能，讓使用者可快速依桌號跳轉至對應卡片並套用高亮，支援篩選器狀態下的提示。

## Requirements

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

### Requirement: 搜尋跳轉與高亮
使用者輸入桌號後，系統 SHALL 在 state.tables 中精確比對整數桌號，若找到對應卡片，SHALL 將頁面捲動至該卡片並套用高亮樣式；同時只有一張卡片可以處於高亮狀態。

#### Scenario: 輸入有效桌號後跳轉並高亮
- **WHEN** 使用者在搜尋列輸入追蹤範圍內的桌號（例如「47」）
- **THEN** 系統 SHALL 捲動頁面使第 47 桌卡片出現於畫面中央附近，並為該卡片套用高亮樣式

#### Scenario: 高亮狀態唯一性
- **WHEN** 使用者先搜尋桌號 10，再搜尋桌號 20
- **THEN** 系統 SHALL 移除第 10 桌卡片的高亮，並為第 20 桌卡片套用高亮，同時捲動至第 20 桌

#### Scenario: 搜尋桌號不在當前範圍
- **WHEN** 使用者輸入不在 state.tables 中的桌號（例如目前追蹤 1~50，輸入「99」）
- **THEN** 系統 SHALL 在搜尋列下方顯示「找不到桌號 99」提示，輸入框以錯誤樣式標示，不做捲動

### Requirement: 清空搜尋
使用者清空搜尋列後，系統 SHALL 移除所有卡片的高亮樣式並清除錯誤提示，回到正常顯示狀態。

#### Scenario: 清空搜尋列
- **WHEN** 使用者刪除搜尋列中的所有文字，使輸入框回到空白
- **THEN** 系統 SHALL 移除所有卡片的高亮樣式，隱藏錯誤提示訊息

### Requirement: 搜尋結果與現有篩選器的關係
搜尋跳轉 SHALL 僅在目標卡片目前可見（未被篩選器隱藏）時才執行捲動與高亮。若目標卡片因篩選器（例如「隱藏已完成」）而不在畫面中，SHALL 顯示「桌號 X 目前被篩選器隱藏」提示。

#### Scenario: 搜尋目標被篩選器隱藏
- **WHEN** 使用者啟用「隱藏已完成」篩選器，搜尋一個狀態為「已完成」的桌號
- **THEN** 系統 SHALL 顯示「桌號 X 目前被篩選器隱藏」提示，不執行捲動
