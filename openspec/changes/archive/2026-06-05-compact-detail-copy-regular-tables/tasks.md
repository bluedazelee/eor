## 1. 修改複製邏輯

- [x] 1.1 在 `app.js` 的 `buildRemainingInfo()`（第 499 行附近），將 `normal.join('\n')` 改為 `normal.join(', ')`

## 2. PWA 快取更新

- [x] 2.1 在 `sw.js` 更新 `CACHE_NAME` 版本號（遞增），確保已安裝的 PWA 使用者取得最新的 `app.js`
