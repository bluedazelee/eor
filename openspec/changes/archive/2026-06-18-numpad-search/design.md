## Context

現有搜尋流程：點 🔍 → `openSearchBar()` 展開 `table-search-bar`、focus `input` → 使用者輸入 → `input` 事件觸發 `handleTableSearch(value)` → 高亮 + 捲動。`renderTracker()` 末尾有一段重新套用高亮的邏輯（`tableSearchInput.value.trim()` 非空時再次呼叫 `handleTableSearch`）。`enterSelectionMode()` 呼叫 `closeSearchBar()`。

## Goals / Non-Goals

**Goals:**
- 完全不喚起系統鍵盤
- 即時跳轉（每次按鍵後立即搜尋）
- 彈窗樣式與既有設計語言一致

**Non-Goals:**
- 同時保留 input 作為備用輸入方式
- 支援桌號以外的文字搜尋

## Decisions

### 決策 1：彈窗結構沿用加時彈窗模式

`position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%)`，搭配背景遮罩（`overlay`）。點擊遮罩關閉彈窗。此模式已在加時彈窗中驗證可行。

### 決策 2：searchBuffer 為模組頂層字串變數

```js
let searchBuffer = '';
let isSearchNumpadOpen = false;
```

每次按鍵後更新 `searchBuffer`，呼叫 `handleTableSearch(searchBuffer)`。最大長度限制 3 位（桌號不超過 999）。

### 決策 3：移除 renderTracker 中的重新高亮邏輯

原本的重新套用邏輯是為了避免 re-render 後高亮消失。改為即時搜尋後，re-render 前若 `searchBuffer` 非空，可在 `renderTracker()` 末尾加一行 `if (isSearchNumpadOpen && searchBuffer) handleTableSearch(searchBuffer)`，維持高亮持續性。

### 決策 4：handleTableSearch 改為操作彈窗 DOM

移除對 `tableSearchInput.classList` 的依賴，改為：
- 正常：更新顯示區文字，清除錯誤樣式
- 錯誤：在彈窗內的訊息區顯示錯誤文字

### 決策 5：彈窗按鈕佈局

```
[ 顯示區：123 ]
[ 錯誤訊息 ]
[  1  ][ 2  ][ 3  ]
[  4  ][ 5  ][ 6  ]
[  7  ][ 8  ][ 9  ]
[  ⌫  ][ 0  ][關閉]
```

「關閉」在右下角（拇指易達位置），⌫ 在左下角。

## Risks / Trade-offs

- **[Trade-off] 按鍵數較多**：輸入「150」需按 3 次，不如鍵盤快速。但避免鍵盤跳動的體驗提升更重要。
- **[Risk] 即時搜尋中間狀態**：輸入「15」時若桌號 15 不存在會短暫顯示錯誤，繼續輸入「150」才成功。可接受，屬於即時搜尋的正常行為。
