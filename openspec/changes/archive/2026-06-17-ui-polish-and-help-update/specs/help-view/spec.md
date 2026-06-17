## MODIFIED Requirements

### Requirement: Help view displays full feature documentation

說明頁面 SHALL 涵蓋所有功能章節，並反映當前 UI 的操作方式。搜尋章節 SHALL 說明展開式 🔍 icon 的操作方式（點擊展開、再次點擊或清空關閉）。批量設為已完成章節 SHALL 說明批次模式資訊列顯示已選桌數與進度，以及篩選器在批次模式下仍可操作。

#### Scenario: All sections are visible on the help page

- **WHEN** help-view is displayed
- **THEN** 所有章節標題均存在，頁面可捲動

#### Scenario: 搜尋章節說明展開式操作

- **WHEN** 使用者閱讀五、搜尋桌號章節
- **THEN** 說明文字 SHALL 描述點擊 🔍 按鈕展開搜尋欄位的操作方式，不描述常態顯示的輸入框

#### Scenario: 批量操作章節說明批次模式資訊列與篩選器

- **WHEN** 使用者閱讀七、批量設為已完成章節
- **THEN** 說明文字 SHALL 涵蓋：批次模式時資訊列顯示已選桌數、篩選器在批次模式下仍可使用

#### Scenario: Table state chips are visually differentiated

- **WHEN** help-view is displayed
- **THEN** 尚未結束、已分配、已完成 各以對應顏色的色塊顯示（紅 / 橘 / 綠）
