## Context

目前 `icons/icon-192.png` 與 `icons/icon-512.png` 為無品牌識別的佔位圖。本變更以像素風六邊形 badge 替換，設計要素：Tracker 格線紋理 + 像素字型「EoR」，色彩沿用 app 現有紫藍系（`#4f46e5`）。

專案無打包工具，所有靜態資源直接服務。圖示檔案為純 PNG 二進位資產，需手動生成後提交至 repo。

## Goals / Non-Goals

**Goals:**
- 定義像素風圖示的視覺規格（色彩、格線、字型、構圖）
- 提供可重現的 PNG 生成方式（Canvas 腳本）
- 輸出 32×32、192×192、512×512 三個尺寸
- 確保 maskable icon 安全區合規

**Non-Goals:**
- 不引入圖形設計工具或打包流程
- 不修改現有的 PWA 行為（離線快取邏輯不變）
- 不支援深色/淺色模式切換圖示

## Decisions

### 決策 1：以 Canvas 腳本生成 PNG，而非手繪或 SVG 匯出

**選擇**：新增 `tools/generate-icons.html`——在瀏覽器中執行的獨立生成腳本，用 Canvas API 繪製設計並下載 PNG。

**理由**：
- 專案無 Node.js 依賴，Canvas 生成腳本在瀏覽器即可執行，不需安裝任何工具
- 生成邏輯與設計參數（色彩、格線間距、字型像素矩陣）集中在單一檔案，未來維護容易
- 比手繪 PNG 更可重現；比複雜的 SVG 路徑更易讀

**替代方案**：
- SVG 向量圖示：縮放品質好，但像素風需精確控制 `image-rendering: pixelated`，且 favicon 路徑需額外處理
- 外部像素工具（Piskel/Aseprite）：需人工操作，不可重現

### 決策 2：設計基礎解析度為 32×32，以整數倍放大

**選擇**：在 32×32 像素格上定義設計（含六邊形、格線、文字），輸出時用 nearest-neighbor 縮放到 192 和 512。

**理由**：
- 保留像素藝術的「顆粒感」，縮放不模糊
- 32×32 對應 favicon 原生解析度，可直接使用
- 192 = 6×，512 ≈ 16× —— 整數倍縮放，無半像素捨入問題

### 決策 3：圖示色彩直接硬編碼，不從 CSS 變數讀取

**理由**：Canvas 生成腳本是獨立工具，無法存取 `style.css` 的 CSS 變數。色彩值直接寫在腳本常數區，與 `style.css` 中的 `--accent-gradient` 色系對齊，未來若品牌色調整，兩處同步更新即可。

## 視覺規格

### 色彩

| 元素 | 色值 |
|------|------|
| 外部背景 | `#0b0b16` |
| 六邊形主色 | `#4f46e5` |
| 六邊形邊框 | `#7c3aed`（2px） |
| 格線（橫＋縱） | `#6366f1`（透明度 60%） |
| 「EoR」文字 | `#f1f2f6` |

### 像素字型矩陣（3×5，每字元；pixel unit = 2px）

"E"、"o"（小寫）、"R" 三個字母以 3 列 × 5 行布林矩陣定義。每個 bit 以 2×2px 的 pixel unit 繪製，使單一字元渲染為 6px 寬 × 10px 高，在 32×32 六邊形內清晰可辨且保有像素顆粒感。矩陣在腳本中以陣列表示，便於調整字形。

### 六邊形構圖（32×32 基礎格）

```
padding: 2px（各邊）
六邊形頂點計算：水平六邊形，中心 (16, 16)，外接圓半徑 14px
格線間距：4px（橫向與縱向各一組）
EoR 文字：垂直水平置中，字元間距 1px
```

### Maskable 安全區

PWA maskable icon 安全區為中心 80% 圓形。512×512 中安全半徑 = 204.8px。

實作採雙層六邊形：
- **外層**（border，radius 14 → 224px at 512×512）：略微超出安全區，maskable 圓形裁切後形成圓弧邊框，產生「圓角 badge」視覺效果——此為刻意設計。
- **內層**（fill，radius 12 → 192px at 512×512）及「EoR」文字：完整落在安全區內，核心視覺不受裁切影響。

## Risks / Trade-offs

- [格線在 32×32 下過密] → 格線透明度設 60% 以降低視覺雜訊；favicon（16×16）只顯示放大 0.5× 版本，格線可能消失，但文字仍清晰 → 可接受
- [nearest-neighbor 縮放在非整數比例下有鋸齒] → 192 = 6×，512 ≈ 16.0×，均為整數，不影響
- [sw.js 版本號未更新導致舊圖示被快取] → 任務清單中明確包含 bump CACHE_NAME

## Migration Plan

1. 執行 `tools/generate-icons.html`，下載三個 PNG 覆蓋 `icons/`
2. 更新 `index.html` favicon href（新增 32×32 entry）
3. Bump `sw.js` 中的 `CACHE_NAME`
4. 可選：在 `manifest.json` 新增 32×32 icon entry

回滾：git checkout 還原 `icons/` 與 `sw.js` 即可。

## Open Questions

- 無待決問題。設計方向已在 explore session 中與使用者確認。
