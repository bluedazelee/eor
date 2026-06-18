## MODIFIED Requirements

### Requirement: 搜尋列位置與顯示
追蹤主畫面的 control-row 最右側 SHALL 顯示一個搜尋 icon 按鈕（`#btn-search-toggle`）。點擊後 SHALL 開啟數字鍵盤彈窗（`search-numpad-popup`），icon 按鈕呈啟用樣式。再次點擊 icon 按鈕或點擊彈窗內關閉按鈕 SHALL 關閉彈窗，並清除搜尋結果與高亮狀態。批次選取模式啟用期間，若彈窗為開啟狀態 SHALL 強制關閉。

#### Scenario: 進入追蹤主畫面時彈窗預設關閉
- **WHEN** 使用者進入追蹤主畫面
- **THEN** 搜尋 icon 按鈕 SHALL 顯示於 control-row 最右側，數字鍵盤彈窗 SHALL 為隱藏狀態

#### Scenario: 點擊搜尋 icon 開啟彈窗
- **WHEN** 使用者點擊 control-row 的搜尋 icon 按鈕
- **THEN** 數字鍵盤彈窗 SHALL 開啟，icon 按鈕 SHALL 呈現啟用樣式；系統鍵盤 SHALL NOT 被喚起

#### Scenario: 再次點擊搜尋 icon 關閉彈窗
- **WHEN** 彈窗已開啟，使用者再次點擊搜尋 icon 按鈕
- **THEN** 彈窗 SHALL 關閉，所有卡片高亮 SHALL 清除，icon 按鈕恢復未啟用樣式

#### Scenario: 批次模式強制關閉彈窗
- **WHEN** 使用者進入批次選取模式，此時數字鍵盤彈窗為開啟狀態
- **THEN** 彈窗 SHALL 強制關閉，高亮狀態 SHALL 清除

#### Scenario: 批次模式結束後搜尋 icon 恢復可見
- **WHEN** 使用者退出批次選取模式
- **THEN** 搜尋 icon 按鈕 SHALL 重新可點擊，彈窗維持關閉狀態
