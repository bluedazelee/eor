# Spec: mobile-layout

## Purpose

定義應用程式在行動裝置（手機瀏覽器）上的版面行為規範，包含水平與垂直捲動的控制、各頁面元素的可見性保障，以及容器高度的鎖定策略。

---

## Requirements

### Requirement: 頁面不產生水平捲動

應用程式在任何視窗寬度下，整個頁面 SHALL NOT 出現水平 scrollbar，且使用者 SHALL NOT 能左右滑動頁面。所有表單欄位（input、select）SHALL 填滿其所在容器的寬度，不得溢出。

#### Scenario: Setup 頁表單欄位不溢出

- **WHEN** 使用者在任意寬度的手機瀏覽器開啟 setup 頁
- **THEN** 「起始桌號」與「結束桌號」的 input 欄位寬度 SHALL 符合其 grid cell 寬度，頁面 SHALL NOT 可水平滑動

#### Scenario: 組別下拉選單不溢出

- **WHEN** 使用者在任意寬度的手機瀏覽器開啟 setup 頁
- **THEN** 「組別」select 欄位 SHALL 填滿表單卡片的內容寬度，不超出容器邊界

---

### Requirement: 應用程式整體高度鎖定於視窗高度

應用程式容器 SHALL 被限制在視窗可視高度（viewport height）內，外層頁面 SHALL NOT 因內容高度超出視窗而產生垂直 scrollbar。各畫面的捲動行為 SHALL 由各自的 view 內部管理。

#### Scenario: Tracker 頁外層不產生垂直捲動

- **WHEN** 使用者進入 tracker 頁，且桌號卡片數量超過畫面可顯示數量
- **THEN** 外層頁面 SHALL NOT 可垂直捲動，捲動 SHALL 僅發生於卡片格子區域內部

#### Scenario: Setup 頁在內容放得下時不產生捲動

- **WHEN** 使用者在螢幕高度足夠的裝置上開啟 setup 頁
- **THEN** 頁面 SHALL NOT 出現垂直 scrollbar，setup 表單卡片 SHALL 垂直居中顯示

#### Scenario: Setup 頁在螢幕過小時允許垂直捲動

- **WHEN** 使用者在螢幕高度不足以完整顯示 setup 表單的裝置上開啟 setup 頁
- **THEN** setup 頁 SHALL 可垂直捲動，且表單頂部 SHALL 從可視區域頂端開始顯示（不被截斷）

---

### Requirement: Tracker 頁固定元素永遠可見

在 tracker 頁中，dashboard bar（統計資訊列）與 action footer（確認/強制結束按鈕）SHALL 永遠固定可見，不得因卡片數量過多而被推出可視範圍。卡片格子區域 SHALL 填滿兩者之間的剩餘空間，並在卡片超出時於內部捲動。

#### Scenario: Action footer 在大量桌號時仍可見

- **WHEN** 使用者設定了大範圍桌號（例如 1–100），進入 tracker 頁
- **THEN** 「確認本輪處理完畢」與「強制結束本輪」按鈕 SHALL 永遠顯示在畫面底部，不需捲動頁面即可點擊

#### Scenario: Dashboard bar 在大量桌號時仍可見

- **WHEN** 使用者設定了大範圍桌號，進入 tracker 頁
- **THEN** 統計數字、進度條與篩選按鈕列 SHALL 永遠顯示在畫面頂部，不因卡片過多而被推離可視範圍

#### Scenario: 卡片格子區域內部捲動

- **WHEN** 卡片數量超過卡片格子區域可顯示的行數
- **THEN** 使用者 SHALL 能在卡片格子區域內上下捲動，且此捲動 SHALL NOT 影響外層頁面位置

---

### Requirement: 觸控裝置上的 filter 按鈕不殘留 hover 樣式

tracker-view 的 filter 按鈕（全部設為已完成、複製資訊、只顯示加時桌）的 `:hover` 樣式 SHALL 僅在支援真實懸停的裝置（`@media (hover: hover)`）上套用。觸控裝置 SHALL NOT 因 tap 動作而觸發 `:hover` 樣式殘留。

#### Scenario: 觸控裝置點擊 filter 按鈕後不殘留亮起效果

- **WHEN** 使用者在觸控裝置上 tap「全部設為已完成」或「複製資訊」或「只顯示加時桌」按鈕
- **THEN** 按鈕 SHALL NOT 在點擊後保持 hover 亮起樣式，不需額外 tap 即可解除

#### Scenario: 滑鼠裝置懸停 filter 按鈕正常亮起

- **WHEN** 使用者在滑鼠裝置上將游標移至任一 filter 按鈕上方
- **THEN** 按鈕 SHALL 顯示對應的 hover 亮起樣式；游標移離後樣式 SHALL 自動消失

---

### Requirement: card-grid 最低高度佔比

在 tracker 頁中，卡片格線區域（`.card-grid`）的可用高度 SHALL 在正常模式與批次選取模式下均不低於視窗可視高度的 70%。為達成此目標，dashboard-bar 的 padding、gap、margin 及 app-header 的 padding 在 ≤ 480px 裝置上 SHALL 套用縮減版數值；dashboard-bar 的 round-indicator 與 stats 文字 SHALL 合併至同一水平行。

#### Scenario: 正常模式 card-grid 高度充足

- **WHEN** 使用者在手機（視窗高度 ≤ 900px）進入 tracker 頁，未啟用批次模式
- **THEN** 卡片格線區域的可用高度 SHALL 不低於視窗高度的 70%

#### Scenario: 批次模式 card-grid 高度充足

- **WHEN** 使用者在手機進入 tracker 頁並啟用批次選取模式
- **THEN** 卡片格線區域的可用高度 SHALL 不低於視窗高度的 70%

---

### Requirement: dashboard-bar 在手機上縮減間距

在 ≤ 480px 的裝置上，dashboard-bar 的 padding SHALL 不超過上下各 10px，gap SHALL 不超過 8px，margin-bottom SHALL 不超過 12px。app-header 的垂直 padding SHALL 不超過 10px。action-footer 內按鈕的垂直 padding SHALL 不超過 10px。

#### Scenario: 手機上 dashboard-bar 間距縮減

- **WHEN** 使用者在寬度 ≤ 480px 的裝置上開啟 tracker 頁
- **THEN** dashboard-bar SHALL 以縮減間距顯示，整體高度 SHALL 低於桌面版顯示高度

#### Scenario: 桌面版間距不受影響

- **WHEN** 使用者在寬度 > 480px 的裝置上開啟 tracker 頁
- **THEN** dashboard-bar 的 padding、gap、margin 保持原始數值不變

---

### Requirement: control-row 為單列排版

Tracker 頁的 control-row SHALL 在所有裝置上以單一水平行顯示所有控制元件，包含復原/重做按鈕、隱藏已完成按鈕（左側），以及批量完成、複製、篩選、搜尋按鈕（右側）。復原/重做按鈕的高度 SHALL 與篩選按鈕（`.btn-filter`）一致。

#### Scenario: control-row 單列顯示

- **WHEN** 使用者進入 tracker 頁（正常模式，非批次模式）
- **THEN** 復原按鈕、重做按鈕與隱藏已完成按鈕 SHALL 在同一水平行顯示，不換行為兩列
