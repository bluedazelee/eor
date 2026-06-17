## Why

批次選取模式啟用後，兩個常用篩選器（隱藏已完成桌號、只顯示加時桌）因整個 dashboard-bar 被隱藏而無法操作，導致使用者無法在批次操作前先縮小目標範圍。同時，selection-action-bar 目前為兩行排版，高度明顯大於正常模式的 control-row，視覺不一致且佔用額外卡片空間。

## What Changes

- **compact-strip 加入篩選按鈕**：在批次模式的 `.dashboard-compact-strip` 內加入「隱藏完成」與「只顯示加時」兩個按鈕，委派觸發原始按鈕邏輯，並同步 `active` 樣式
- **selection-action-bar 單行化**：移除現有的 `.selection-bar-main` / `.selection-bar-shortcuts` 雙層結構，改為單一 flex row，排列順序為：[取消] [全選] [清除] [反選] 已選N桌 [確認]
- **「確認執行」加短標籤**：加入 `.label-short`「確認」，避免手機上按鈕過寬
- **padding / gap 縮減**：selection-action-bar 的 padding 與按鈕高度縮減至與 `.btn-filter` 相同（上下約 5px），使整體高度與 control-row 一致

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

- `batch-complete`：新增「批次模式下可操作篩選器」行為；selection-action-bar 佈局從雙行改為單行

## Impact

- `index.html`：`.dashboard-compact-strip` 新增兩個 `data-filter` 按鈕；`#selection-action-bar` 內部結構重組為單一 flex row；`#btn-selection-confirm` 加入雙 span
- `style.css`：compact-strip filter 按鈕樣式；selection-action-bar 從 flex-direction:column 改為 row；調整 padding/gap/按鈕尺寸
- `app.js`：compact filter 按鈕事件委派；在 `hideCompleted` / `showOvertimeOnly` toggle 後同步 compact 按鈕 active 狀態；更新 `enterSelectionMode` 初始化 compact filter 按鈕狀態
- `sw.js`：版本號 bump
