## 1. 持久化基礎

- [x] 1.1 在 app.js 既有 localStorage key 常數區（`GROUP_STORAGE_KEY` 旁）新增 `RANGE_STORAGE_KEY = 'ptcg_eor_range'`
- [x] 1.2 新增寫入輔助：將當前 `startTable` / `endTable` 以 `JSON.stringify({ start, end })` 存入 `RANGE_STORAGE_KEY`
- [x] 1.3 新增 `restoreRangeSelection()`：讀取並 `JSON.parse`（`try/catch` 保護）`RANGE_STORAGE_KEY`，驗證 start/end 為有效正整數後預填 `start-table` / `end-table` 欄位；無紀錄或解析失敗則不覆寫（沿用 HTML 預設 1 / 50）

## 2. 接入流程

- [x] 2.1 在 `showSetupView()` 內 `setupForm.reset()` 之後、緊鄰 `restoreGroupSelection()` 呼叫 `restoreRangeSelection()`
- [x] 2.2 在 `btnStart` 處理常式中，通過既有桌號驗證後，呼叫寫入輔助保存當前範圍（與 `localStorage.setItem(GROUP_STORAGE_KEY, ...)` 同處）

## 3. PWA 快取

- [x] 3.1 更新 `sw.js` 的快取版本號，確保使用者取得含新邏輯的 `app.js`

## 4. 驗證

- [x] 4.1 首次使用（清空 localStorage）：起始桌號預設 1、結束桌號預設 50
- [x] 4.2 以 11~30 開始紀錄 → 確認本輪完畢返回設定畫面 → 起始 11、結束 30 已預填
- [x] 4.3 強制結束本輪亦保留範圍；預填值可手動改為 11~25 並正確建立桌次與更新記憶
- [x] 4.4 修改欄位但不點「開始紀錄」即重新整理 → 記憶值維持上次實際開始的範圍
