## Context

`.overtime-badge` 目前為單一 class，背景固定 `rgba(255, 165, 2, 0.8)`（橘色）。JS 中每次渲染卡片時，若 `table.overtimeMinutes !== null` 則建立 badge 元素並設 `badge.className = 'overtime-badge'`。

## Goals / Non-Goals

**Goals:**
- 三個等級對應三種明確可辨的顏色
- 與現有設計語言（紅色=尚未結束、橘色=已分配）一致
- 在縮小卡片（60px）下顏色仍清晰可辨

**Non-Goals:**
- 改變 badge 的文字、字體、尺寸或位置
- 在加時篩選列表或複製輸出中加入顏色資訊

## Decisions

### 決策 1：顏色選擇沿用既有設計 token

| 等級 | 條件 | 顏色 | 理由 |
|------|------|------|------|
| low | ≤ 3 分 | `rgba(245, 200, 66, 0.85)` 黃色 | 新增，代表輕微 |
| mid | > 3 且 ≤ 6 分 | `rgba(255, 165, 2, 0.8)` 橘色 | 現有色，維持不變 |
| high | > 6 分 | `rgba(255, 71, 87, 0.85)` 紅色 | 沿用 `--color-active`，代表緊迫 |

### 決策 2：class 組合方式

badge 同時套用基礎 class 與等級 class：

```js
const tier = m <= 3 ? 'low' : m <= 6 ? 'mid' : 'high';
badge.className = `overtime-badge overtime-badge-${tier}`;
```

等級 class 只覆寫 `background`，字體、padding、border-radius 等由基礎 class 統一管理。

### 決策 3：說明頁面（help-view）的加時徽章示意

help-view 中有 `.overtime-badge-demo` 元素，可一併更新為展示三種顏色，讓使用者一目了然。

## Risks / Trade-offs

- **[Risk] 無** — 純 CSS class 新增與 JS className 賦值調整，無邏輯變動。
