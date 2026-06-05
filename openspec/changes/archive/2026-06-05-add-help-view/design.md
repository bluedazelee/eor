## Context

現有 SPA 由兩個 view-panel 組成（`setup-view`、`tracker-view`），以 CSS `hidden` class 切換顯示。新增使用說明頁面需要決定：如何呈現（第三個 view-panel / modal overlay / 獨立頁面），以及說明內容如何維護（靜態 HTML / Markdown 動態渲染）。

## Goals / Non-Goals

**Goals:**
- 讓使用者可從 setup-view 進入使用說明頁面，閱讀後可返回
- 說明內容涵蓋所有現有功能，以行動裝置閱讀為優先
- 不增加新的 PWA 快取資源或外部依賴

**Non-Goals:**
- 不從 tracker-view 提供說明入口（使用中不需要查閱完整說明）
- 不支援 Markdown 動態渲染或說明內容的版本管理
- 不製作互動式教學（tour / onboarding flow）

## Decisions

**1. 第三個 view-panel，而非 modal overlay 或獨立頁面**

與現有 `setup-view` / `tracker-view` 使用相同的 CSS `hidden` 切換模式。  
相較於全螢幕 modal，view-panel 語義更清晰，且不需要額外管理 overlay 層疊與 scroll 鎖定。  
相較於獨立 `help.html`，內嵌於 `index.html` 可直接受益於現有 Service Worker 快取，無需更新 `CACHE_NAME`。

**2. 說明內容以靜態 HTML 寫死在 index.html**

內容量固定（八個章節），不需要動態載入。靜態 HTML 可使用現有 CSS 變數與 chip 元件做視覺化，避免引入 Markdown parser 或額外請求。缺點是功能異動時需手動同步說明文字，可接受。

**3. 導覽僅限 setup-view ↔ help-view**

`btn-help` 放在 setup-view 表單底部作為次要按鈕（`btn-secondary` 樣式，視覺權重低於主要的「開始紀錄」）。help-view 頂部的「← 返回」固定導回 setup-view。`showTrackerView()` 補上 `helpView.classList.add('hidden')`，防止從 help-view 開始新輪次時殘留顯示。

## Risks / Trade-offs

[說明內容與實際功能脫節] → 說明內容為靜態文字，功能更新時需人工同步；文件說明需納入相關功能 PR 的 checklist

[index.html 體積增加] → 新增約 60 行 HTML；對 PWA 首次載入影響可忽略，Service Worker 快取後不再重新請求
