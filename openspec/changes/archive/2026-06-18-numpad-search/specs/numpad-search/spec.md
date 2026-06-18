## ADDED Requirements

### Requirement: 數字鍵盤彈窗提供桌號輸入
tracker-view 的桌號搜尋 SHALL 透過自製數字鍵盤彈窗（`search-numpad-popup`）進行輸入，不使用系統鍵盤。彈窗 SHALL 置中固定於畫面（`position: fixed`），包含：輸入顯示區、錯誤訊息區、0–9 數字按鈕、⌫ 退格鍵、關閉按鈕。

#### Scenario: 點擊搜尋 icon 開啟數字鍵盤彈窗
- **WHEN** 使用者點擊 control-row 的 🔍 按鈕
- **THEN** 數字鍵盤彈窗 SHALL 以置中固定方式顯示於畫面，輸入顯示區為空，icon 按鈕呈啟用樣式；系統鍵盤 SHALL NOT 被喚起

#### Scenario: 按數字鍵即時跳轉
- **WHEN** 使用者在彈窗中點按數字鍵
- **THEN** 系統 SHALL 將該數字追加至 searchBuffer，立即以新的 searchBuffer 值執行搜尋跳轉高亮；顯示區 SHALL 即時更新顯示目前輸入的數字

#### Scenario: 按退格鍵刪除最後一位並即時重搜
- **WHEN** 使用者點按 ⌫ 退格鍵
- **THEN** 系統 SHALL 移除 searchBuffer 最後一個字元，立即以新值重新搜尋；若 buffer 清空則清除高亮與錯誤提示

#### Scenario: 點擊關閉按鈕或彈窗外關閉
- **WHEN** 使用者點按彈窗內的「關閉」按鈕，或點擊彈窗外區域
- **THEN** 彈窗 SHALL 隱藏，searchBuffer SHALL 清空，所有卡片高亮 SHALL 清除，icon 按鈕恢復未啟用樣式
