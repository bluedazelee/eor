## 1. CSS

- [x] 1.1 在 `.overtime-badge` 樣式後新增 `.overtime-badge-low`（黃色：`rgba(245, 200, 66, 0.85)`）
- [x] 1.2 新增 `.overtime-badge-mid`（橘色：`rgba(255, 165, 2, 0.8)`，與現有 `.overtime-badge` 背景色一致）
- [x] 1.3 新增 `.overtime-badge-high`（紅色：`rgba(255, 71, 87, 0.85)`）

## 2. JS

- [x] 2.1 在 badge 產生邏輯（`app.js` 中 `badge.className = 'overtime-badge'` 處）加入等級判斷：`const tier = m <= 3 ? 'low' : m <= 6 ? 'mid' : 'high'`，並將 className 改為 `overtime-badge overtime-badge-${tier}`

## 3. 說明頁面

- [x] 3.1 檢視 help-view 中加時相關說明，視需要補充顏色等級的說明文字
