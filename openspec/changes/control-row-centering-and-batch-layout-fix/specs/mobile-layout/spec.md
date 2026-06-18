## ADDED Requirements

### Requirement: control-row 換行時每列置中對齊
control-row 在 flex-wrap 換行後，每一列的按鈕 SHALL 以置中方式對齊，不靠左排列。語意相關的按鈕組（隱藏完成/只顯示加時；複製/搜尋）SHALL 以容器包裹，確保同組按鈕在換行時保持同列。

#### Scenario: 單列時按鈕置中
- **WHEN** 使用者進入 tracker 頁，裝置寬度足以容納所有按鈕於單列
- **THEN** 所有按鈕 SHALL 在行內置中排列

#### Scenario: 換行時每列獨立置中
- **WHEN** control-row 因寬度不足產生換行
- **THEN** 每一列的按鈕組 SHALL 各自置中，不靠左對齊

#### Scenario: 同組按鈕不被拆行
- **WHEN** control-row 換行時空間恰好在「隱藏完成」與「只顯示加時」之間，或「📋」與「🔍」之間
- **THEN** 同組的兩顆按鈕 SHALL 一起換到下一列，不被分拆至不同列

### Requirement: 批量模式按鈕列不溢出可視寬度
批量模式下的 dashboard compact strip 與 selection action bar SHALL 在 320px 以上裝置的單列內完整顯示，不產生水平溢出。篩選按鈕使用短標籤（隱藏、加時）；操作按鈕使用短標籤（全選、清除、確認）。

#### Scenario: compact strip 單列不溢出
- **WHEN** 使用者在 375px 手機上進入批量選取模式
- **THEN** dashboard compact strip SHALL 在單列內完整顯示所有元素，不產生水平 overflow

#### Scenario: selection action bar 單列不溢出
- **WHEN** 使用者在 375px 手機上進入批量選取模式
- **THEN** selection action bar SHALL 在單列內完整顯示所有按鈕，不產生水平 overflow
