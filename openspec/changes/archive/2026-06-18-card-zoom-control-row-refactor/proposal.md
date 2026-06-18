## Why

桌次卡片目前為固定大小，在桌次數量較多的場合（如 80–100 桌）需要大量捲動才能總覽全貌。新增縮放控制讓裁判依使用情境自行調整密度。同時藉此機會重構按鈕列：現有排版依賴 `filter-break` 硬斷點 hack 製造固定 2+2 換行，改為扁平自然換行後可同時容納新增的縮放按鈕，且在各種螢幕寬度下都能自適應。

## What Changes

- **新增卡片縮放按鈕**：control-row 加入 `+` / `-` 兩顆按鈕，切換三個卡片尺寸層級：
  - 大（預設）：每列約 3 桌，`minmax(110px, 1fr)`，狀態文字可見
  - 中：每列約 4 桌，`minmax(75px, 1fr)`，狀態文字隱藏
  - 小：每列約 5 桌，`minmax(60px, 1fr)`，狀態文字隱藏
  - 桌號數字與加時標記在所有層級均可讀
  - 尺寸偏好以獨立 `localStorage` key 持久化，不納入 round state
- **control-row 扁平化重構**：移除 `left-controls` / `filter-btns` 分組結構與 `<filter-break>` DOM 元素，改為單一 `flex-wrap: wrap` 容器，所有按鈕自然換行
- **統一短標籤**：移除 `label-long` / `label-short` 切換機制，所有按鈕固定使用簡短文字
- **複製按鈕改為 emoji**：「複製資訊」文字改為 📋
- **按鈕新排列順序**：`[↩][↪]` → `[+][-]` → `[批量完成]` → `[隱藏完成][只顯示加時]` → `[📋][🔍]`

## Capabilities

### New Capabilities

- `card-zoom`: 使用者手動調整卡片顯示尺寸，偏好持久化

### Modified Capabilities

- `mobile-layout`：control-row 排版策略從固定分組改為扁平自然換行；新增縮放按鈕後的 card-grid 高度佔比仍需符合規範

## Impact

- `index.html`：重構 control-row 結構、移除 `filter-break`、調整按鈕順序、修改複製按鈕文字、新增縮放按鈕、移除 `label-long`/`label-short` span
- `style.css`：移除 `.filter-break`、`.left-controls`、`.filter-btns` 分組樣式；新增 `.card-grid.size-md` / `.size-sm` 尺寸 class；新增縮放按鈕樣式；移除 label RWD media query
- `app.js`：新增縮放按鈕 DOM reference 與 click handler；localStorage 讀寫卡片尺寸偏好；啟動時套用已儲存的尺寸 class
- `sw.js`：不涉及快取資源變更，無需更新版本號
- 說明頁面（help-view）：更新「按鈕列」相關說明
