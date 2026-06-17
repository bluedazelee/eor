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
