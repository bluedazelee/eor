## MODIFIED Requirements

### Requirement: 卡片尺寸縮放控制
tracker-view 的 control-row SHALL 提供 `+` 與 `-` 兩顆按鈕，允許使用者在三個每列桌次層級之間切換。`+` 表示增加每列桌次（卡片變小），`-` 表示減少每列桌次（卡片變大）。

#### Scenario: 預設層級為最少每列（每列約 3 桌）
- **WHEN** 使用者首次進入 tracker-view 且未曾設定過尺寸偏好
- **THEN** 卡片格線 SHALL 以大尺寸顯示（minmax 110px），`-` 按鈕 SHALL 為 disabled 狀態，`+` 按鈕 SHALL 為 enabled 狀態

#### Scenario: 點擊 + 按鈕增加每列桌次至中密度
- **WHEN** 目前為每列約 3 桌，使用者點擊 `+` 按鈕
- **THEN** 卡片格線 SHALL 切換為中密度（minmax 75px，每列約 4 桌），桌號數字縮小，狀態文字與時間戳記隱藏，加時標記仍可見

#### Scenario: 點擊 + 按鈕增加每列桌次至最高密度
- **WHEN** 目前為每列約 4 桌，使用者點擊 `+` 按鈕
- **THEN** 卡片格線 SHALL 切換為高密度（minmax 60px，每列約 5 桌），`+` 按鈕 SHALL 變為 disabled 狀態

#### Scenario: 點擊 - 按鈕逐級減少每列桌次
- **WHEN** 目前為中或高密度，使用者點擊 `-` 按鈕
- **THEN** 卡片格線 SHALL 切換至上一層級，`+` 按鈕若原為 disabled 則恢復 enabled

#### Scenario: 桌號與加時資訊在所有層級均可讀
- **WHEN** 使用者切換至任一層級
- **THEN** 每個卡片的桌號數字 SHALL 可讀，若該桌有加時標記，加時資訊 SHALL 可見且可讀
