## ADDED Requirements

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
