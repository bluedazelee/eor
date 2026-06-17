## Why

`openspec/config.yaml` 的專案脈絡已與實際程式碼脫節：工具名稱沿用舊稱「PTCG EoR Helper」、狀態欄位和主要功能描述均未反映近期多次功能迭代。不準確的 context 會讓所有後續 OpenSpec artifact 指示帶著錯誤的前提，降低生成品質。

## What Changes

- 將 `config.yaml` 中的工具名稱從「PTCG EoR Helper」改為「PTCG EoR Tracker」。
- 更新 `狀態管理` 區段：`roundName: string` → `roundNumber: number`（輪次改為數字輸入）。
- 更新 `組別選項` 說明：由固定清單改為自由輸入文字。
- 更新 `主要功能` 清單，反映目前實際功能：
  - 移除「全部設為已完成（含確認對話框）」，改為「批量設為已完成（格線選取模式）」。
  - 更新「複製剩餘桌次資訊」為「複製資訊（本輪範圍 / 加時桌次 / 剩餘桌次 / 詳細資訊）」。
  - 新增「桌號搜尋」。
  - 新增「復原 / 重做（最多 20 步）」。

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

（無 — 此 change 僅更新 OpenSpec 設定檔，不涉及應用程式規格或行為變更）

## Impact

- `openspec/config.yaml`：唯一異動檔案。
- 不影響應用程式程式碼、PWA 快取或 `sw.js`。
- 改動後所有新建 OpenSpec artifact 將使用正確的工具名稱與精確的專案脈絡。
