## ADDED Requirements

### Requirement: Setup view provides entry to help view
The system SHALL display a secondary button labelled「使用說明」in the setup-view form, below the primary「開始紀錄」button. The button SHALL have visually lower weight than the primary button to avoid drawing attention away from the main action.

#### Scenario: User enters help view from setup
- **WHEN** user taps「使用說明」button on setup-view
- **THEN** setup-view is hidden and help-view is displayed

### Requirement: Help view displays full feature documentation
The system SHALL render help-view as a scrollable page containing documentation for all eight feature areas: 開局設定、桌次狀態管理、加時桌標記、儀表板統計、篩選與顯示控制、複製資訊、結束本輪、離線與資料保存.

#### Scenario: All sections are visible on the help page
- **WHEN** help-view is displayed
- **THEN** all eight section headings are present and the page is scrollable

#### Scenario: Table state chips are visually differentiated
- **WHEN** help-view is displayed
- **THEN** 尚未結束、已分配、已完成 are each rendered as colour-coded chips matching the colours used on tracker-view cards (red / orange / green respectively)

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
