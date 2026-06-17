## MODIFIED Requirements

### Requirement: 應用程式整體高度鎖定於視窗高度

應用程式容器 SHALL 被限制在視窗可視高度（viewport height）內，外層頁面 SHALL NOT 因內容高度超出視窗而產生垂直 scrollbar。各畫面的捲動行為 SHALL 由各自的 view 內部管理。app-header 的垂直 padding SHALL 不超過 10px（全裝置），action-footer 按鈕的垂直 padding SHALL 不超過 10px（全裝置）。

#### Scenario: Tracker 頁外層不產生垂直捲動

- **WHEN** 使用者進入 tracker 頁，且桌號卡片數量超過畫面可顯示數量
- **THEN** 外層頁面 SHALL NOT 可垂直捲動，捲動 SHALL 僅發生於卡片格子區域內部

#### Scenario: Setup 頁在內容放得下時不產生捲動

- **WHEN** 使用者在螢幕高度足夠的裝置上開啟 setup 頁
- **THEN** 頁面 SHALL NOT 出現垂直 scrollbar，setup 表單卡片 SHALL 垂直居中顯示

#### Scenario: Setup 頁在螢幕過小時允許垂直捲動

- **WHEN** 使用者在螢幕高度不足以完整顯示 setup 表單的裝置上開啟 setup 頁
- **THEN** setup 頁 SHALL 可垂直捲動，且表單頂部 SHALL 從可視區域頂端開始顯示（不被截斷）

#### Scenario: app-header 在所有裝置上高度一致

- **WHEN** 使用者在任意寬度裝置上開啟應用程式
- **THEN** app-header 的垂直 padding SHALL 為 10px，不因裝置寬度不同而改變
