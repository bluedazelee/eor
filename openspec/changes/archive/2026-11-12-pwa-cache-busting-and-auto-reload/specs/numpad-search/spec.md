## MODIFIED Requirements

### Requirement: 數字鍵盤彈窗提供桌號輸入
tracker-view 的桌號搜尋 SHALL 透過自製數字鍵盤彈窗（`search-numpad-popup`）進行輸入，不使用系統鍵盤。彈窗 SHALL 置中固定於畫面（`position: fixed`），具備足夠大的寬度（約 `300px`，於小螢幕不超出可視範圍）與放大比例的數字按鍵（0–9、⌫ 退格鍵、確定鍵），以利單手快速點按，並包含：輸入顯示區、錯誤訊息區、右上角關閉按鈕。

#### Scenario: 點擊搜尋 icon 開啟放大比例之數字鍵盤彈窗
- **WHEN** 使用者點擊 control-row 的 🔍 按鈕
- **THEN** 數字鍵盤彈窗 SHALL 以置中固定方式顯示於畫面，具備放大的顯示區與數字按鍵尺寸，輸入顯示區為空，icon 按鈕呈啟用樣式；系統鍵盤 SHALL NOT 被喚起

#### Scenario: 按數字鍵輸入並點擊確定跳轉
- **WHEN** 使用者在彈窗中點按數字鍵後點擊「確定」
- **THEN** 系統 SHALL 跳轉至對應桌號卡片並高亮顯示

#### Scenario: 按退格鍵刪除最後一位
- **WHEN** 使用者點按 ⌫ 退格鍵
- **THEN** 系統 SHALL 移除 searchBuffer 最後一個字元並更新顯示區

#### Scenario: 點擊關閉按鈕或彈窗外關閉
- **WHEN** 使用者點按彈窗內的「✕」關閉按鈕，或點擊彈窗外區域
- **THEN** 彈窗 SHALL 隱藏，searchBuffer SHALL 清空，所有卡片高亮 SHALL 清除，icon 按鈕恢復未啟用樣式
