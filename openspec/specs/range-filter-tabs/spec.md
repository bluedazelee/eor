# range-filter-tabs

## Purpose

tracker-view 中位於 control-row 與 card-grid 之間的範圍篩選標籤列功能。依負責桌次的 startTable/endTable 自動產生分段標籤，讓使用者快速篩選並聚焦在特定桌次範圍。

## Requirements

### Requirement: 自動產生範圍篩選標籤
tracker-view SHALL 在 control-row 與 card-grid 之間顯示範圍篩選標籤列，標籤依 startTable/endTable 自動產生。分段大小 SHALL 為 `max(25, ceil(total / 4))`。若分段數僅為 1（total ≤ 25），標籤列 SHALL 隱藏。

#### Scenario: 大範圍顯示 4 個分段標籤
- **WHEN** 負責桌次範圍為 1–200（200 桌）
- **THEN** 標籤列 SHALL 顯示「全部 (N)」及「1-50 (N)」「51-100 (N)」「101-150 (N)」「151-200 (N)」共 5 個標籤

#### Scenario: 中範圍顯示 3 個分段標籤
- **WHEN** 負責桌次範圍為 1–75（75 桌）
- **THEN** 標籤列 SHALL 顯示「全部 (N)」及「1-25 (N)」「26-50 (N)」「51-75 (N)」共 4 個標籤

#### Scenario: 26–49 桌顯示 2 個分段標籤，末段可不足 25 桌
- **WHEN** 負責桌次範圍為 1–49（49 桌）
- **THEN** 標籤列 SHALL 顯示「全部 (N)」及「1-25 (N)」「26-49 (N)」共 3 個標籤

#### Scenario: 25 桌以下不顯示標籤列
- **WHEN** 負責桌次範圍總桌數 ≤ 25
- **THEN** 標籤列 SHALL 不顯示（隱藏）

### Requirement: 標籤顯示即時未完成桌數
每個標籤 SHALL 在括號內顯示該範圍內 `state !== 'completed'` 的桌次數量，並在每次桌次狀態變更後即時更新。

#### Scenario: 桌次完成後標籤數字更新
- **WHEN** 使用者將某桌次切換為「已完成」
- **THEN** 對應範圍的標籤 SHALL 即時減少括號內的數字

#### Scenario: 全部標籤顯示全域未完成數
- **WHEN** 標籤列可見
- **THEN**「全部」標籤 SHALL 顯示所有桌次中 `state !== 'completed'` 的總數

### Requirement: 點擊標籤篩選卡片顯示範圍
點擊分段標籤後，card-grid SHALL 僅顯示該範圍內的桌次卡片，並與現有的 showOvertimeOnly、hideCompleted 篩選以 AND 邏輯複合套用。

#### Scenario: 點擊分段標籤只顯示該範圍卡片
- **WHEN** 使用者點擊「51-100 (N)」標籤
- **THEN** card-grid SHALL 僅顯示桌號 51–100 的卡片；被現有篩選隱藏的卡片仍維持隱藏

#### Scenario: 點擊全部標籤恢復完整顯示
- **WHEN** 使用者在分段標籤啟用時點擊「全部」標籤
- **THEN** card-grid SHALL 恢復顯示全部範圍的卡片（仍受其他篩選條件約束）

#### Scenario: 批量模式可用
- **WHEN** 使用者進入批量選取模式
- **THEN** 範圍篩選標籤列 SHALL 仍可見且可操作；「全選」操作 SHALL 僅選取目前顯示中（已受範圍篩選過濾）的未完成桌次

### Requirement: 範圍篩選狀態為暫態
activeRangeTab 狀態 SHALL NOT 持久化至 localStorage。結束本輪並返回 setup-view 後，下次進入 tracker-view 時 SHALL 自動重設為「全部」。

#### Scenario: 結束輪次後範圍篩選重設
- **WHEN** 使用者結束本輪（確認完畢或強制結束）後開始新一輪進入 tracker-view
- **THEN** 範圍篩選 SHALL 預設為「全部」，不保留上一輪的選取狀態
