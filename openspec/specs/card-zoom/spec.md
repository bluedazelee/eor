# Spec: card-zoom

## Purpose

定義 tracker-view 中卡片尺寸縮放控制的行為規範，包含縮放按鈕操作、三個尺寸層級切換，以及使用者偏好的持久化儲存。

---

## Requirements

### Requirement: 卡片尺寸縮放控制

tracker-view 的 control-row SHALL 提供 `+` 與 `-` 兩顆縮放按鈕，允許使用者在三個尺寸層級之間切換卡片顯示大小。

#### Scenario: 預設尺寸為大（每列約 3 桌）

- **WHEN** 使用者首次進入 tracker-view 且未曾設定過尺寸偏好
- **THEN** 卡片格線 SHALL 以大尺寸顯示（minmax 110px），`+` 按鈕 SHALL 為 disabled 狀態，`-` 按鈕 SHALL 為 enabled 狀態

#### Scenario: 點擊縮小按鈕切換至中尺寸

- **WHEN** 目前為大尺寸，使用者點擊 `-` 按鈕
- **THEN** 卡片格線 SHALL 切換為中尺寸（minmax 75px，每列約 4 桌），桌號數字縮小，狀態文字與時間戳記隱藏，加時標記仍可見

#### Scenario: 點擊縮小按鈕切換至小尺寸

- **WHEN** 目前為中尺寸，使用者點擊 `-` 按鈕
- **THEN** 卡片格線 SHALL 切換為小尺寸（minmax 60px，每列約 5 桌），`-` 按鈕 SHALL 變為 disabled 狀態

#### Scenario: 點擊放大按鈕逐級放大

- **WHEN** 目前為小或中尺寸，使用者點擊 `+` 按鈕
- **THEN** 卡片格線 SHALL 切換至上一層級，`-` 按鈕若原為 disabled 則恢復 enabled

#### Scenario: 桌號與加時資訊在所有層級均可讀

- **WHEN** 使用者切換至任一尺寸層級
- **THEN** 每個卡片的桌號數字 SHALL 可讀，若該桌有加時標記，加時資訊 SHALL 可見且可讀

---

### Requirement: 卡片尺寸偏好持久化

使用者選擇的卡片尺寸 SHALL 以獨立 localStorage key 儲存，與 round state 無關。

#### Scenario: 偏好跨 session 保留

- **WHEN** 使用者設定卡片尺寸後關閉並重新開啟應用程式
- **THEN** 應用程式 SHALL 在 tracker-view 載入時自動套用上次儲存的尺寸

#### Scenario: 重置輪次不影響尺寸偏好

- **WHEN** 使用者結束本輪（確認完畢或強制結束）並返回 setup-view
- **THEN** 卡片尺寸偏好 SHALL 保持不變，下一輪進入 tracker-view 時自動套用
