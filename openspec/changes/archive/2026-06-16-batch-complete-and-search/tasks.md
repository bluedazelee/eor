## 1. 移除舊功能（全部設為已完成）

- [x] 1.1 從 `index.html` 移除 `btn-mark-all-completed` 按鈕元素
- [x] 1.2 從 `app.js` 移除 `btnMarkAllCompleted` DOM 參照、`markAllCompleted()` 函式及其 click 事件綁定
- [x] 1.3 從 `style.css` 移除 `.btn-filter-complete` 相關樣式（若無其他用途）

## 2. 批量操作彈窗 HTML 結構

- [x] 2.1 在 `index.html` 控制列中，以「批量設為已完成」按鈕（`btn-batch-complete`）取代原 `btn-mark-all-completed` 位置
- [x] 2.2 在 `index.html` 新增批量操作底部彈窗（`batch-complete-popup`），包含：兩個 tab 按鈕（`tab-range`、`tab-specific`）、範圍排除欄位區塊（起始桌號、結束桌號、排除桌號輸入框）、指定桌號欄位區塊（單一桌號清單輸入框）、預覽文字區（`batch-preview-text`）、取消與確認執行按鈕

## 3. 批量操作彈窗 CSS 樣式

- [x] 3.1 在 `style.css` 新增底部彈窗容器樣式（固定定位於底部、backdrop overlay、slide-up 動畫）
- [x] 3.2 在 `style.css` 新增 tab 按鈕的 active / inactive 樣式
- [x] 3.3 在 `style.css` 新增預覽文字、0 桌時的停用狀態樣式

## 4. 批量操作核心 JS 邏輯

- [x] 4.1 在 `app.js` 頂部新增批量操作相關 DOM 元素的 `querySelector` 參照（彈窗、tab、所有輸入欄位、預覽文字、確認取消按鈕）
- [x] 4.2 實作 `parseTableNums(str)` 工具函式：以空格與逗號分割字串，過濾並回傳整數陣列
- [x] 4.3 實作 `calcBatchTargets()` 函式：依當前 tab 模式，計算並回傳目標桌號陣列
- [x] 4.4 實作即時預覽更新：監聽所有輸入欄位的 `input` 事件，呼叫 `calcBatchTargets()` 更新預覽文字，並依結果數量切換確認按鈕的啟用/停用狀態
- [x] 4.5 實作 tab 切換邏輯：點擊 tab 時切換欄位顯示區塊、清空輸入、重設預覽
- [x] 4.6 實作 `executeBatchComplete()` 函式：呼叫 `commitState()`，將目標桌次狀態設為 `completed`，呼叫 `saveState()` 與 `renderTracker()`，關閉彈窗
- [x] 4.7 綁定「批量設為已完成」按鈕開啟彈窗、「取消」按鈕關閉彈窗、「確認執行」按鈕呼叫 `executeBatchComplete()`

## 5. 搜尋列 HTML 結構

- [x] 5.1 在 `index.html` 的 `card-grid` 上方新增搜尋列容器，包含：文字輸入框（`table-search-input`，placeholder「搜尋桌號...」）與錯誤/提示訊息區（`table-search-msg`，預設隱藏）

## 6. 搜尋列 CSS 樣式

- [x] 6.1 在 `style.css` 新增搜尋列容器與輸入框樣式（寬度、間距、手機友善高度）
- [x] 6.2 在 `style.css` 新增搜尋無結果時的輸入框錯誤樣式（紅色邊框）與提示訊息樣式
- [x] 6.3 在 `style.css` 新增卡片高亮樣式（`.table-card-highlight`，醒目邊框或背景色）

## 7. 搜尋跳轉 JS 邏輯

- [x] 7.1 在 `app.js` 頂部新增搜尋相關 DOM 元素的 `querySelector` 參照
- [x] 7.2 實作 `clearSearchHighlight()` 函式：移除所有卡片的 `.table-card-highlight` class，隱藏錯誤提示
- [x] 7.3 實作 `handleTableSearch(value)` 函式：解析輸入為整數桌號；若為空則呼叫 `clearSearchHighlight()`；若找到對應卡片且該卡片可見，套用 `.table-card-highlight` 並呼叫 `scrollIntoView()`；若找不到或卡片被篩選器隱藏，顯示對應提示訊息
- [x] 7.4 監聽搜尋輸入框的 `input` 事件，呼叫 `handleTableSearch()`
- [x] 7.5 在 `renderTracker()` 重新渲染後，若搜尋列有值，重新執行一次搜尋高亮（因 DOM 重建後需重新套用）

## 8. PWA 快取更新

- [x] 8.1 在 `sw.js` 更新快取版本號，確保 PWA 使用者取得包含新功能的最新資源
