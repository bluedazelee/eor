## Why

1. **快速查看詳細資訊需求**：目前若裁判只想快速在畫面上確認「剩餘幾桌、有哪些直播桌/加時桌/一般桌」，必須點擊 `📋` 展開複製選單再點「詳細資訊」，且這會一併覆寫剪貼簿並跳出原生 `alert`。在 `📋` 按鈕左側新增一個獨立的「顯示資訊（`ℹ️`）」按鈕，點擊後直接跳出深色主題的詳細資訊提示視窗，可讓裁判一鍵快速檢視完整現況而不干擾剪貼簿。
2. **詳細資訊中直播桌獨立列出**：實務上直播桌與加時桌同屬需要特別留意的特殊桌次。原本未完成的直播桌混在「剩餘加時桌」與「剩餘一般桌」中以 `N(直播)` 標註，不易一眼掌握目前有哪幾桌直播桌尚未結束；將未完成的直播桌獨立為「剩餘直播桌：」區塊（僅在場上有未完成直播桌時顯示，且排在「剩餘加時桌：」之上），能讓直播桌、加時桌、一般桌三個區塊清楚分離且互不重複。

## What Changes

- **控制列新增「顯示詳細資訊」按鈕（`#btn-show-info`）與深色主題提示彈窗（`#info-detail-popup`）**：
  - 在 `index.html` 控制列最右側 `.btn-group` 中，於 `📋`（`#btn-copy-remaining`）左側新增 `ℹ️`（`#btn-show-info`）按鈕。
  - 點擊 `ℹ️` 按鈕時，開啟深色主題置中彈窗（`#info-detail-popup` 與 `#info-detail-overlay`），直接呈現 `buildRemainingInfo()` 產生的詳細資訊文字。
  - 彈窗提供右上角 `✕` 按鈕、底部「關閉」按鈕，並支援點擊遮罩外部區域關閉。
- **更新「詳細資訊」格式（`buildRemainingInfo()`），將未完成直播桌獨立列出**：
  - 將當前輪次未完成桌次（`state !== 'completed'`）分為三個互斥集合：
    1. **剩餘直播桌**（`t.isStream === true`）：僅在存在至少 1 張未完成直播桌時顯示 `剩餘直播桌：` 區塊（位於 `剩餘加時桌：` 之上），依桌號由小到大逐行列出；無加時格式為 `桌號`，有加時格式為 `桌號(+N分)`。若無未完成直播桌，則不顯示此區塊。
    2. **剩餘加時桌**（`!t.isStream && t.overtimeMinutes !== null`）：僅列出非直播桌之未完成加時桌，依桌號由小到大逐行列出 `桌號(+N分)`；若無則顯示 `無`。
    3. **剩餘一般桌**（`!t.isStream && t.overtimeMinutes === null`）：僅列出非直播桌且無加時之未完成一般桌，依桌號由小到大以 `, ` 分隔單行輸出；若無則顯示 `無`。
  - `ℹ️` 顯示資訊彈窗與 `📋 -> 詳細資訊` 複製功能共用此 `buildRemainingInfo()` 輸出格式。
- **更新使用說明與 PWA 快取版本**：
  - 更新 `index.html` 的 `#help-view` 與 `README.md` 中的「複製與顯示資訊」說明。
  - 更新 `index.html` 靜態資源版本參數為 `?v=26` 及 `sw.js` 的 `CACHE_NAME` 為 `'ptcg-eor-v26'`。

## Capabilities

### New Capabilities
<!-- 無新增獨立 capability，功能擴充整合於 copy-remaining-tables-info 與 help-view -->

### Modified Capabilities
- `copy-remaining-tables-info`: 新增 `ℹ️` 快速顯示詳細資訊按鈕與深色主題提示彈窗；修改「詳細資訊」組裝格式，當存在未完成直播桌時於加時桌上方獨立列出「剩餘直播桌：」區塊（與加時桌、一般桌互斥）。
- `help-view`: 更新說明頁面，補充 `ℹ️` 顯示詳細資訊按鈕與詳細資訊中獨立列出直播桌的說明。

## Impact

- **`index.html`**：
  - 在 `#btn-copy-remaining` 左側新增 `#btn-show-info`（`ℹ️`）按鈕。
  - 新增 `#info-detail-overlay` 與 `#info-detail-popup` 彈窗結構。
  - 更新 `#help-view` 第九節說明文字。
  - 更新 `style.css?v=26` 與 `app.js?v=26`。
- **`style.css`**：
  - 新增 `.btn-filter-info` 與 `.info-detail-popup`、`.info-detail-content` 等深色彈窗樣式。
- **`app.js`**：
  - 更新 `buildRemainingInfo()`，將未完成直播桌獨立為選填的 `剩餘直播桌：` 區塊（位於 `剩餘加時桌：` 之上），並從加時桌與一般桌清單中排除直播桌。
  - 綁定 `#btn-show-info` 開啟/關閉 `#info-detail-popup` 彈窗邏輯。
- **`sw.js` & `README.md`**：
  - 更新 `CACHE_NAME = 'ptcg-eor-v26'` 並同步更新 `README.md`。
