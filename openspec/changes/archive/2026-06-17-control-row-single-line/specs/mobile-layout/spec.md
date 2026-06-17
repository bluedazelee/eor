## ADDED Requirements

### Requirement: control-row 為單列排版

Tracker 頁的 control-row SHALL 在所有裝置上以單一水平行顯示所有控制元件，包含復原/重做按鈕、隱藏已完成按鈕（左側），以及批量完成、複製、篩選、搜尋按鈕（右側）。復原/重做按鈕的高度 SHALL 與篩選按鈕（`.btn-filter`）一致。

#### Scenario: control-row 單列顯示

- **WHEN** 使用者進入 tracker 頁（正常模式，非批次模式）
- **THEN** 復原按鈕、重做按鈕與隱藏已完成按鈕 SHALL 在同一水平行顯示，不換行為兩列
