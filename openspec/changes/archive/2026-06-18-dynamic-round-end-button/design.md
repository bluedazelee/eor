## Context

`action-footer` 目前有兩個並排按鈕：`btn-finish-round`（綠，disabled 直到全完成）與 `btn-force-end-round`（琥珀，永遠 enabled）。兩者都呼叫 `resetAndReturnToSetup()`，差異僅在 confirm 對話框文字與啟用條件。切換邏輯集中在 `renderTrackerView()` 的最後段落。

## Goals / Non-Goals

**Goals:**
- 合併為單一按鈕，外觀與標籤隨完成狀態自動切換
- 保留兩種操作各自的 confirm 對話框文字
- 不改變任何底層狀態管理或重設流程

**Non-Goals:**
- 動畫強調切換瞬間（現有 CSS transition 已足夠）
- 新增「全部完成」以外的中間狀態外觀

## Decisions

### 決策 1：保留 `btn-finish-round` id，移除 `btn-force-end-round`

直接複用現有元素，只改 class 與 `textContent`，不增加新 id。`btnForceEndRound` 的 DOM reference 與 click handler 一併刪除。

替代方案：新增中性 id（如 `btn-end-round`）並刪除兩個舊元素。否決，因為現有 id 已被 app.js 頂部 querySelector 抓取，換名徒增修改點。

### 決策 2：`renderTrackerView()` 中以 className + textContent 切換，不用 hidden/show

兩種狀態共用同一個按鈕元素，透過替換 `className` 切換樣式（`btn btn-warning` ↔ `btn btn-success`），同時更新 `textContent`。不額外顯示/隱藏任何元素。

### 決策 3：合併 click handler，以 dataset 或即時判斷狀態分支

click 時重新計算 `completedCount === totalCount` 來決定走哪條確認路徑，不依賴 flag 或 dataset，確保與渲染邏輯一致。

## Risks / Trade-offs

- **[Risk] 使用者不察覺按鈕已切換** → Mitigation：現有 `transition: all 0.25s` 在顏色與文字變化時已有過渡效果，琥珀→綠色的色差明顯，足以傳達狀態改變。
- **[Trade-off] 全部完成後無法「強制結束」** → 已全部完成時兩者行為等效（都呼叫 `resetAndReturnToSetup()`），差異只在對話框措辭，因此移除此場景不影響功能。
