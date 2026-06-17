## ADDED Requirements

### Requirement: card-grid 最低高度佔比

在 tracker 頁中，卡片格線區域（`.card-grid`）的可用高度 SHALL 在正常模式與批次選取模式下均不低於視窗可視高度的 70%。為達成此目標，dashboard-bar 的 padding、gap、margin 及 app-header 的 padding 在 ≤ 480px 裝置上 SHALL 套用縮減版數值；dashboard-bar 的 round-indicator 與 stats 文字 SHALL 合併至同一水平行。

#### Scenario: 正常模式 card-grid 高度充足

- **WHEN** 使用者在手機（視窗高度 ≤ 900px）進入 tracker 頁，未啟用批次模式
- **THEN** 卡片格線區域的可用高度 SHALL 不低於視窗高度的 70%

#### Scenario: 批次模式 card-grid 高度充足

- **WHEN** 使用者在手機進入 tracker 頁並啟用批次選取模式
- **THEN** 卡片格線區域的可用高度 SHALL 不低於視窗高度的 70%

---

### Requirement: dashboard-bar 在手機上縮減間距

在 ≤ 480px 的裝置上，dashboard-bar 的 padding SHALL 不超過上下各 10px，gap SHALL 不超過 8px，margin-bottom SHALL 不超過 12px。app-header 的垂直 padding SHALL 不超過 10px。action-footer 內按鈕的垂直 padding SHALL 不超過 10px。

#### Scenario: 手機上 dashboard-bar 間距縮減

- **WHEN** 使用者在寬度 ≤ 480px 的裝置上開啟 tracker 頁
- **THEN** dashboard-bar SHALL 以縮減間距顯示，整體高度 SHALL 低於桌面版顯示高度

#### Scenario: 桌面版間距不受影響

- **WHEN** 使用者在寬度 > 480px 的裝置上開啟 tracker 頁
- **THEN** dashboard-bar 的 padding、gap、margin 保持原始數值不變
