# Help View

## Purpose

Provides an in-app documentation page accessible from the setup view, allowing users to read feature documentation before starting a round without leaving the application.

---

## Requirements

### Requirement: Setup view provides entry to help view
The system SHALL display a secondary button labelled「使用說明」in the setup-view form, below the primary「開始紀錄」button. The button SHALL have visually lower weight than the primary button to avoid drawing attention away from the main action.

#### Scenario: User enters help view from setup
- **WHEN** user taps「使用說明」button on setup-view
- **THEN** setup-view is hidden and help-view is displayed

### Requirement: Help view displays full feature documentation
說明頁面 SHALL 涵蓋所有功能章節，並反映當前 UI 的操作方式：
- **搜尋章節**：SHALL 說明展開式 🔍 icon 的操作方式（點擊展開、再次點擊或清空關閉）。
- **批量設為已完成章節**：SHALL 說明批次模式資訊列顯示已選桌數與進度、篩選器在批次模式下仍可操作、已完成桌次在選取模式中鎖定不可選取（單點、滑選與反選皆自動跳過已完成桌次），以及短暫按住未完成桌次卡片（約 0.2 秒）後滑動可連續選取或取消選取區間內未完成桌次（直接滑動維持畫面捲動、往回滑即時退回、上下邊緣自動捲動）的操作方式。
- **巡場盤點章節**：SHALL 說明點擊「巡場盤點」進入盤點模式後，可直接點選（或滑選）場上仍在進行對戰的未完成桌次，按下「確認」即可將目前顯示範圍內其餘未選取的未完成桌次一鍵設為「已完成」（被選取的對戰中桌次維持原狀態）；若跨不同範圍標籤選取了桌次並停留在單一區段按確認，系統會彈出視窗讓使用者選擇結算「全部區段」或「僅目前區段」；並說明未選取任何桌次時點擊「確認」會跳出二次確認提示以將全部可見未完成桌次設為已完成。

#### Scenario: All sections are visible on the help page
- **WHEN** help-view is displayed
- **THEN** 所有章節標題均存在，頁面可捲動

#### Scenario: 搜尋章節說明展開式操作
- **WHEN** 使用者閱讀五、搜尋桌號章節
- **THEN** 說明文字 SHALL 描述點擊 🔍 按鈕展開搜尋欄位的操作方式，不描述常態顯示的輸入框

#### Scenario: 批量操作章節說明鎖定已完成桌次、反選跳過已完成與滑動多選規則
- **WHEN** 使用者閱讀批量設為已完成相關章節
- **THEN** 說明文字 SHALL 涵蓋：批次模式時資訊列顯示已選桌數、篩選器在批次模式下仍可使用、已完成桌次鎖定不可選取且反選僅針對未完成桌次，以及滑動多選的完整規則（短暫按住約 0.2 秒後滑動啟動、直接滑動維持捲動、自動略過已完成桌次、未放開前往回滑即時退回、滑至上下邊緣自動捲動列表）

#### Scenario: 巡場盤點章節說明反向點名對戰中桌次、跨區選取彈窗與二次確認機制
- **WHEN** 使用者閱讀巡場盤點相關說明
- **THEN** 說明文字 SHALL 涵蓋：點擊「巡場盤點」後點選場上仍在對戰的桌次、按下「確認」將目前顯示範圍內其餘未完成桌次設為已完成且已選桌次維持原狀態、跨範圍區段選取時可選擇結算「全部區段」或「僅目前區段」，以及選取 0 桌時按「確認」會跳出二次確認提示並將可見未完成桌次全部設為已完成

#### Scenario: Table state chips are visually differentiated
- **WHEN** help-view is displayed
- **THEN** 尚未結束、已分配、已完成 各以對應顏色的色塊顯示（紅 / 橘 / 綠）

### Requirement: Help view returns to setup view
The system SHALL display a「← 返回」button at the top of help-view. Tapping it SHALL hide help-view and show setup-view.

#### Scenario: User returns from help view
- **WHEN** user taps「← 返回」on help-view
- **THEN** help-view is hidden and setup-view is displayed

### Requirement: Help view is hidden during tracking
The system SHALL ensure help-view is not visible when tracker-view is active, regardless of the navigation path the user took before starting a round.

#### Scenario: Help view does not persist into tracker view
- **WHEN** user navigates help-view → setup-view → starts a round
- **THEN** tracker-view is displayed and help-view is hidden

#### Scenario: Help view does not appear after force-ending a round
- **WHEN** a round is ended (confirm or force) and setup-view is shown
- **THEN** help-view remains hidden
