## MODIFIED Requirements

### Requirement: Help view displays full feature documentation
說明頁面 SHALL 涵蓋所有功能章節，並反映當前 UI 的操作方式。搜尋章節 SHALL 說明展開式 🔍 icon 的操作方式（點擊展開、再次點擊或清空關閉）。批量設為已完成章節 SHALL 說明批次模式資訊列顯示已選桌數與進度、篩選器在批次模式下仍可操作，以及短暫按住桌次卡片（約 0.2 秒）後滑動可依起點狀態連續選取或取消選取區間桌次（直接滑動維持畫面捲動、「尚未結束」與「已分配」視為同狀態並略過不同完成狀態桌次、往回滑即時退回、上下邊緣自動捲動）的操作方式。

#### Scenario: All sections are visible on the help page
- **WHEN** help-view is displayed
- **THEN** 所有章節標題均存在，頁面可捲動

#### Scenario: 搜尋章節說明展開式操作
- **WHEN** 使用者閱讀五、搜尋桌號章節
- **THEN** 說明文字 SHALL 描述點擊 🔍 按鈕展開搜尋欄位的操作方式，不描述常態顯示的輸入框

#### Scenario: 批量操作章節說明批次模式資訊列、篩選器與滑動多選完整規則
- **WHEN** 使用者閱讀七、批量設為已完成章節
- **THEN** 說明文字 SHALL 涵蓋：批次模式時資訊列顯示已選桌數、篩選器在批次模式下仍可使用，以及滑動多選的完整規則（短暫按住約 0.2 秒後滑動啟動、直接滑動維持捲動、「尚未結束」與「已分配」視為同狀態並自動略過不同完成狀態桌次、未放開前往回滑即時退回、滑至上下邊緣自動捲動列表）

#### Scenario: Table state chips are visually differentiated
- **WHEN** help-view is displayed
- **THEN** 尚未結束、已分配、已完成 各以對應顏色的色塊顯示（紅 / 橘 / 綠）
