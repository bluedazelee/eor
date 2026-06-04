## Context

目前 `style.css` 的佈局依賴兩個脆弱的假設：

1. `input[type="number"]` 會自動縮限在容器寬度內 → 實際上瀏覽器有預設 intrinsic width，不設 `width: 100%` 就會溢出
2. `card-grid` 的可視高度可以用 `calc(100vh - 280px)` 魔法數字表達 → 只要 dashboard-bar 高度有任何變化（文字換行、新按鈕等）就會失準

修正目標：讓整個 CSS 佈局的高度約束來自 **flex 結構本身**，而非固定數字。

---

## Goals / Non-Goals

**Goals:**
- 修復 setup 頁水平溢出，不讓頁面可左右滾動
- tracker 頁整體鎖定在視窗高度內，外部頁面不產生 scrollbar
- 移除 `max-height: calc(100vh - 280px)` 魔法數字
- setup 頁在螢幕夠大時保持卡片居中，不夠大時允許垂直滾動

**Non-Goals:**
- 不修改 HTML 結構
- 不修改任何 JavaScript 邏輯
- 不處理橫向 (landscape) 模式的特殊最佳化
- 不新增 breakpoint（現有 `@media (max-width: 480px)` 保留）

---

## Decisions

### 1. 用 `height: 100%` 鏈取代 `min-height: 100vh`

**決定**：`html`、`body`、`.app-container` 全部改為 `height: 100%`，並在 `html` 與 `body` 加上 `overflow: hidden`。

**為何不繼續用 `min-height: 100vh`**：`min-height` 允許容器向下無限生長，內容超出時頁面就會出現 scrollbar。改成 `height: 100%` 後容器被硬性限制在視窗高度，內部的 overflow 由各 view 自行管理。

**為何要同時設 `html` 和 `body`**：部分手機瀏覽器（尤其 iOS Safari）的文件滾動由 `html` 層控制，只設 `body` 不可靠。

```
html  { height: 100%; overflow: hidden; }
body  { height: 100%; overflow: hidden; }
.app-container { height: 100%; /* 移除 min-height */ }
```

---

### 2. Tracker 頁改用 flex 填充剩餘高度

**決定**：`#tracker-view` 設為 `display: flex; flex-direction: column; height: 100%; overflow: hidden`，card-grid 設 `flex: 1; min-height: 0; overflow-y: auto`。

**為何需要 `min-height: 0`**：flex item 的預設 `min-height` 是 `auto`（等於其內容高度），這讓 flex item 無法縮小到比內容更小。設為 `0` 後 flex 才能真正壓縮 card-grid，讓它與 dashboard-bar 和 action-footer 共享有限高度。

**為何不繼續用魔法數字**：`calc(100vh - 280px)` 綁定了 dashboard-bar 的隱含高度。一旦 dashboard-bar 因任何原因（例如 filter-btns 換行）高度改變，數字就必須手動同步。flex 填充法完全解除這個耦合。

```
#tracker-view   { display: flex; flex-direction: column; height: 100%; overflow: hidden; }
.dashboard-bar  { flex-shrink: 0; }
.card-grid      { flex: 1; min-height: 0; overflow-y: auto; /* 移除 max-height */ }
.action-footer  { flex-shrink: 0; }
```

---

### 3. Setup 頁改用 `margin: auto` 居中 + `overflow-y: auto`

**決定**：`#setup-view` 移除 `justify-content: center`，改為 `overflow-y: auto`；`.setup-card` 加上 `margin: auto`。

**為何不繼續用 `justify-content: center`**：flex 容器的 `justify-content: center` 在內容溢出時會把溢出的部分均分到兩側，導致頂部內容被截斷且無法滾動到。`overflow-y: auto` 搭配 `margin: auto` 的行為：有足夠空間時 margin 撐開，卡片自然居中；空間不足時 margin 縮為零，`overflow-y: auto` 接管，允許垂直滾動。

```
#setup-view  { overflow-y: auto; /* 移除 justify-content: center */ }
.setup-card  { margin: auto; }
```

---

### 4. Input / Select 填滿容器

**決定**：`.input-group input` 與 `.input-group select` 加上 `width: 100%`。

**為何溢出**：`input[type="number"]` 與 `select` 的 intrinsic width 由瀏覽器決定（通常約 170px），不受 grid/flex 容器約束，需明確設定才會填滿欄位。

```css
.input-group input,
.input-group select {
  width: 100%;
}
```

---

## Risks / Trade-offs

- **`overflow: hidden` 在 html/body 上** → 若未來有需要讓整個頁面能垂直滾動的場景，需移除此設定。目前兩個 view 都是設計為完全佔滿視窗，此風險可接受。
- **`margin: auto` 居中在極小螢幕上** → 若 setup card 高度超過視窗，會從頂部開始顯示（無頂部 margin），這是正確的 scroll 行為，視覺上符合預期。
- **移除 `@media (max-width: 480px)` 內的 `max-height`** → 同步移除，否則小螢幕仍會套用舊魔法數字覆蓋新的 flex 設定。

---

## Migration Plan

1. 修改 `style.css`（純 CSS，不涉及 HTML / JS）
2. 更新 `sw.js` 的快取版本號（讓已安裝 PWA 的使用者拿到新版樣式）
3. 在手機瀏覽器（iOS Safari、Android Chrome）驗證兩個畫面的 scroll 行為

Rollback：還原 `style.css` 與 `sw.js` 即可，無資料層影響。

---

## Open Questions

（無）
