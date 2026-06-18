## MODIFIED Requirements

### Requirement: control-row 為自動換行排版
Tracker 頁的 control-row SHALL 以扁平 flex-wrap 方式排列所有控制元件，依實際可用寬度自然換行，不依賴固定像素斷點。按鈕排列順序 SHALL 為：復原/重做 → 放大/縮小 → 批量完成 → 隱藏完成 → 只顯示加時 → 複製（📋）→ 搜尋（🔍）。復原/重做按鈕的高度 SHALL 與篩選按鈕（`.btn-filter`）一致。

#### Scenario: control-row 在寬度足夠時單列顯示
- **WHEN** 使用者進入 tracker 頁，裝置寬度足以容納所有按鈕於單列
- **THEN** 所有按鈕 SHALL 在同一水平行顯示，不換行

#### Scenario: control-row 在寬度不足時自然換行
- **WHEN** 使用者進入 tracker 頁，裝置寬度不足以容納所有按鈕於單列
- **THEN** 按鈕 SHALL 依 flex-wrap 規則自然換行，不因固定斷點強制換行；按鈕的 DOM 順序 SHALL 決定換行後的排列
