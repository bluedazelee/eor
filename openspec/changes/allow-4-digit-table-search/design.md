## Context

目前 `app.js` 中的數字鍵盤按鈕事件監聽器將 `searchBuffer` 的最大字元長度限制為 3 位數：
```js
if (searchBuffer.length >= 3) return;
```
當賽事規模較大或採用 4 位數區段編碼（如 `1001`～`9999`）時，使用者無法在搜尋彈窗輸入第 4 個數字。

## Goals / Non-Goals

**Goals:**
- 允許使用者在搜尋數字鍵盤中輸入最多 4 位數的桌號（1～4 位數）。
- 超過 4 位數時忽略後續數字鍵點擊。
- 更新 Service Worker 快取版本以發佈變更。

**Non-Goals:**
- 不修改數字鍵盤彈窗或桌次卡片的視覺排版與字體大小（現有寬度已足以容納 4 位數）。
- 不修改開局設定、篩選器或確認搜尋的既有流程。

## Decisions

### 1. 直接將 `searchBuffer` 長度上限調整為 4

在 `app.js` 的 `.numpad-btn[data-digit]` 點擊事件中，將 `if (searchBuffer.length >= 3) return;` 改為 `if (searchBuffer.length >= 4) return;`。
- **理由**：最小改動且直接解決問題，不引入額外複雜度。

### 2. 更新 `sw.js` 快取版本

將 `CACHE_NAME` 從 `'ptcg-eor-v20'` 更新為 `'ptcg-eor-v21'`，確保離線快取更新。

## Risks / Trade-offs

- **[Risk] 4 位數在顯示區的寬度** → `#search-numpad-display` 寬度為 `220px`、字體 `1.4rem`，4 位數字僅佔約 `60px` 寬度，無溢位風險。
