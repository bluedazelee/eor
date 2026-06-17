## Context

目前 `app-header` 在桌面版使用 `padding: 18px 20px`，手機版透過 `@media (max-width: 480px)` 覆寫為 `10px 20px`。這個 app 以手機為主，桌面版的寬鬆 padding 沒有必要。`.btn` 的桌面 padding `14px 24px` 同樣偏大。

說明頁的五（搜尋）和七（批量）章節描述的是舊 UI，與目前搜尋展開式 icon、批次模式資訊列整合等變更不符。

## Goals / Non-Goals

**Goals:**
- 全裝置統一 header padding 為 10px，省去媒體查詢分支
- action-footer 按鈕在所有尺寸下高度一致縮減
- help-view 準確描述當前 UI 操作流程

**Non-Goals:**
- 不改變任何功能邏輯
- 不調整 setup-view 或其他頁面的版面
- 不更動 `.btn` 在 `@media (max-width: 480px)` 的 `10px 16px`（已夠小）

## Decisions

### CSS 全域化 header padding

```css
/* 修改前 */
.app-header { padding: 18px 20px; }
@media (max-width: 480px) { .app-header { padding: 10px 20px; } }

/* 修改後 */
.app-header { padding: 10px 20px; }
/* @media 中的 .app-header 規則移除 */
```

### .btn 全域縮減

```css
/* 修改前 */
.btn { padding: 14px 24px; }
@media (max-width: 480px) { .btn { padding: 10px 16px; } }

/* 修改後 */
.btn { padding: 10px 20px; }
@media (max-width: 480px) { .btn { padding: 10px 16px; } }  /* 維持不變 */
```

桌面版從 14px → 10px（省 8px 高度）；手機版 ≤480px 仍覆寫為 16px 水平 padding。

### Header 字型縮小

`.pokeball-icon` 1.4rem → 1.2rem，`.app-header h1` 1.25rem → 1.1rem。視覺上更緊湊，整體高度再省約 4px。

### 說明頁章節重寫

**五、搜尋桌號：**

- 搜尋欄位：「點擊按鈕列最右側 🔍 按鈕展開搜尋欄位，輸入桌號後頁面會自動捲動至該桌並高亮顯示；再次點擊 🔍 或清空欄位可關閉搜尋」
- 找不到時：維持原文不變
- Tip：「清空搜尋欄位可取消高亮；批次選取模式下 🔍 按鈕自動隱藏」

**七、批量設為已完成（新增兩項）：**

- 進入選取模式：說明同時補充「上方資訊列切換為顯示輪次、桌次進度與已選桌數」
- 新增：篩選器可用：「批次模式中仍可點擊資訊列右側的「隱藏完成」與「只顯示加時」篩選器，縮小目標範圍後再執行全選」

## Risks / Trade-offs

- `.btn` padding 縮小後，setup-view 的「開始紀錄」按鈕也會變矮——這是可接受的，setup 頁面空間充足。
- Header 字型縮小對「PTCG EoR Tracker」品牌文字有輕微影響，但 app 本身不以 header 為視覺重心。
