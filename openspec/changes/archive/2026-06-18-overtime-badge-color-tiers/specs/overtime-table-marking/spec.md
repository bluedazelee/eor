## ADDED Requirements

### Requirement: 加時標記依分鐘數顯示對應顏色等級
加時標記（`+N分` 徽章）SHALL 依 `overtimeMinutes` 的數值顯示對應顏色：≤ 3 分為黃色、> 3 且 ≤ 6 分為橘色、> 6 分為紅色。顏色應在卡片縮小模式（每列 5 桌）下仍清晰可辨。

#### Scenario: 加時 ≤ 3 分顯示黃色徽章
- **WHEN** 某桌次的 `overtimeMinutes` 為 1、2 或 3
- **THEN** 該桌次卡片的加時徽章 SHALL 顯示為黃色

#### Scenario: 加時 > 3 且 ≤ 6 分顯示橘色徽章
- **WHEN** 某桌次的 `overtimeMinutes` 為 4、5 或 6
- **THEN** 該桌次卡片的加時徽章 SHALL 顯示為橘色

#### Scenario: 加時 > 6 分顯示紅色徽章
- **WHEN** 某桌次的 `overtimeMinutes` 為 7 以上
- **THEN** 該桌次卡片的加時徽章 SHALL 顯示為紅色
