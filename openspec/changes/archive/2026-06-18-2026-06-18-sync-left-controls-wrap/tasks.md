## 1. 新增 CSS 折行樣式（style.css）

- [x] 1.1 在 `.left-controls` 區塊後新增 `.left-controls.stacked` 規則：`flex-direction: column; align-items: center`

## 2. 加入 ResizeObserver 折行偵測（app.js）

- [x] 2.1 撰寫 `syncLeftControlsLayout()` 函式：取得 `.filter-btns` 所有可見子元素，比較各元素的 `getBoundingClientRect().top`，若差異 > 2px 則對 `.left-controls` 切換 `stacked` class
- [x] 2.2 建立 `ResizeObserver` 監聽 `.filter-btns`，每次尺寸改變時呼叫 `syncLeftControlsLayout()`
- [x] 2.3 在 tracker 初始化完成後立即呼叫一次 `syncLeftControlsLayout()`，確保頁面載入時即套用正確排版

## 3. 更新 Service Worker 快取版本號（sw.js）

- [x] 3.1 更新 `sw.js` 內的快取版本號，確保已安裝 PWA 的使用者取得更新後的 `app.js` 與 `style.css`
