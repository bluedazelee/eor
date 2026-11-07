## ADDED Requirements

### Requirement: 數字鍵盤輸入位數上限

搜尋數字鍵盤的輸入緩衝區（`searchBuffer`）SHALL 允許輸入最多 4 個數字字元。當 `searchBuffer` 長度已達 4 位數時，再次點擊任何數字鍵 SHALL 不改變 `searchBuffer` 與顯示區內容。

#### Scenario: 輸入 4 位數桌號

- **WHEN** 使用者在數字鍵盤依序點擊 4 個數字鍵（例如 `1`、`0`、`2`、`4`）
- **THEN** `searchBuffer` 與輸入顯示區 SHALL 顯示完整的 4 位數字 `1024`

#### Scenario: 超過 4 位數時忽略輸入

- **WHEN** `searchBuffer` 已包含 4 個數字字元（例如 `1024`），使用者再次點擊任一數字鍵（例如 `5`）
- **THEN** 系統 SHALL 忽略該次輸入，`searchBuffer` 與輸入顯示區維持 `1024`
