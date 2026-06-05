## Context

複製選單（`#copy-menu-popup`）是一個 `position: fixed` 的浮動選單，透過 `display: none / flex` 切換顯示。目前三個選項的容器 padding 過小（`6px`）、gap 過窄（`4px`），與加時彈出框（`.overtime-popup`）的寬鬆感有明顯落差。手機裝置缺乏明確的關閉入口，現有的「點擊外部關閉」依賴 `document.addEventListener('click', hideCopyMenu)`，在手機上操作不直覺。

## Goals / Non-Goals

**Goals:**
- 調整選單容器尺寸接近 `.overtime-popup` 的視覺比例
- 新增低調的「關閉」按鈕，方便手機操作
- 更新 `sw.js` 快取版本號

**Non-Goals:**
- 不修改三個複製選項的功能邏輯
- 不改變選單的定位方式（維持 `position: fixed` 置中）
- 不引入動畫或過渡效果

## Decisions

### 1. 關閉按鈕樣式：分隔線 + 淡化

**決定**：使用 `border-top` 作分隔線，字色使用 `var(--text-sub)` 並降低 opacity，hover 時僅做微亮處理，不使用紅色或強調色。

**理由**：關閉是離開動作而非破壞性操作，不需要紅色警示。淡化處理讓視覺層級低於三個功能選項，使用者不會誤點。

**替代方案**：使用紅色系（如 overtime 的 `.btn-overtime-clear`）—— 捨棄，語意上關閉選單不是危險操作。

### 2. 關閉按鈕的 HTML 結構

**決定**：沿用 `.copy-menu-item` 基底類別，加上額外的 `.copy-menu-close` 修飾類別，透過 CSS 覆寫樣式。

**理由**：複用現有按鈕基底，僅以修飾類別差異化，不新增獨立元件，符合專案極簡架構。

### 3. 容器尺寸對齊 `.overtime-popup`

| 屬性 | 修改前 | 修改後 |
|------|--------|--------|
| `padding` | `6px` | `14px 16px` |
| `min-width` | `180px` | `200px` |
| `gap` | `4px` | `10px` |
| `max-width` | 無 | `calc(100vw - 16px)` |
| item `font-size` | `0.85rem` | `0.9rem` |

## Risks / Trade-offs

- **`sw.js` 版本號**：若未更新，PWA 已安裝的使用者短期內仍會看到舊版樣式 → 在 tasks 中包含更新版本號步驟
- 無其他已知風險（純 CSS/HTML/JS 靜態修改，無資料邏輯異動）
