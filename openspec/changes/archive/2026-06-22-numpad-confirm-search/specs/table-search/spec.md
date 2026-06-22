## MODIFIED Requirements

### Requirement: 搜尋列位置與顯示

追蹤主畫面的 control-row 最右側 SHALL 顯示一個搜尋 icon 按鈕（`#btn-search-toggle`）。點擊後 SHALL 開啟數字鍵盤彈窗（`search-numpad-popup`），icon 按鈕呈啟用樣式。

numpad 標題列右上角 SHALL 顯示圓形小關閉按鈕（`#btn-numpad-x`）；底部按鍵列最右欄 SHALL 顯示「確定」按鈕（`#btn-numpad-confirm`）。

點擊「確定」SHALL 執行搜尋邏輯（見搜尋跳轉與高亮、搜尋結果與現有篩選器的關係）。點擊 `#btn-numpad-x`、overlay 或再次點擊 icon 按鈕 SHALL 直接關閉彈窗，若有高亮卡片則 1 秒後消失。批次選取模式啟用期間，若彈窗為開啟狀態 SHALL 強制關閉。

#### Scenario: 進入追蹤主畫面時彈窗預設關閉

- **WHEN** 使用者進入追蹤主畫面
- **THEN** 搜尋 icon 按鈕 SHALL 顯示於 control-row 最右側，數字鍵盤彈窗 SHALL 為隱藏狀態

#### Scenario: 點擊搜尋 icon 開啟彈窗

- **WHEN** 使用者點擊 control-row 的搜尋 icon 按鈕
- **THEN** 數字鍵盤彈窗 SHALL 開啟，icon 按鈕 SHALL 呈現啟用樣式；系統鍵盤 SHALL NOT 被喚起；任何既有高亮 SHALL 立即清除

#### Scenario: 點擊 ✕ 或 overlay 關閉彈窗

- **WHEN** 彈窗已開啟，使用者點擊 `#btn-numpad-x` 或彈窗外 overlay 區域
- **THEN** 彈窗 SHALL 關閉；若有高亮卡片，高亮 SHALL 在 1 秒後消失；icon 按鈕恢復未啟用樣式

#### Scenario: 再次點擊搜尋 icon 關閉彈窗

- **WHEN** 彈窗已開啟，使用者再次點擊搜尋 icon 按鈕
- **THEN** 彈窗 SHALL 關閉；若有高亮卡片，高亮 SHALL 在 1 秒後消失

#### Scenario: 批次模式強制關閉彈窗

- **WHEN** 使用者進入批次選取模式，此時數字鍵盤彈窗為開啟狀態
- **THEN** 彈窗 SHALL 強制關閉，高亮狀態 SHALL 立即清除

#### Scenario: 批次模式結束後搜尋 icon 恢復可見

- **WHEN** 使用者退出批次選取模式
- **THEN** 搜尋 icon 按鈕 SHALL 重新可點擊，彈窗維持關閉狀態

### Requirement: 搜尋跳轉與高亮

使用者按下「確定」後，系統 SHALL 在 state.tables 中精確比對整數桌號。buffer 為空時按確定 SHALL 無動作。若找到目標且目前可見，SHALL 關閉 numpad，將頁面捲動至該卡片並套用高亮樣式，高亮 SHALL 在 numpad 關閉後 1 秒消失；同時只有一張卡片可以處於高亮狀態。

#### Scenario: buffer 為空時按確定無動作

- **WHEN** 使用者未輸入任何數字時按下「確定」
- **THEN** 系統 SHALL 不執行任何動作，numpad 維持開啟

#### Scenario: 按確定且桌號可見時跳轉並關閉

- **WHEN** 使用者輸入追蹤範圍內的可見桌號後按「確定」
- **THEN** 系統 SHALL 關閉 numpad，捲動頁面使目標卡片出現於畫面中央附近，並為該卡片套用高亮樣式；高亮 SHALL 在 1 秒後消失

#### Scenario: 高亮狀態唯一性

- **WHEN** 使用者先搜尋桌號 10 並確認，再搜尋桌號 20 並確認
- **THEN** 系統 SHALL 移除第 10 桌卡片的高亮，並為第 20 桌卡片套用高亮，同時捲動至第 20 桌；numpad SHALL 關閉

#### Scenario: 搜尋桌號不在當前範圍

- **WHEN** 使用者輸入不在 state.tables 中的桌號後按「確定」
- **THEN** 系統 SHALL 在 numpad 訊息區顯示「找不到桌號 X」提示，numpad SHALL 維持開啟，不執行捲動

### Requirement: 搜尋結果與現有篩選器的關係

按下「確定」後，若目標桌號存在於 state.tables 中但目前因篩選器（hideCompleted、showOvertimeOnly、activeRangeTab）而不可見，系統 SHALL 顯示自訂確認提示視窗，告知使用者將清除相關篩選並跳轉；使用者確認後 SHALL 清除相關篩選、關閉視窗與 numpad 並跳轉高亮；使用者取消後 SHALL 僅關閉視窗，numpad 維持開啟。

#### Scenario: 搜尋目標被篩選器隱藏時顯示確認視窗

- **WHEN** 使用者啟用「隱藏已完成」篩選器，輸入一個狀態為「已完成」的桌號後按「確定」
- **THEN** 系統 SHALL 顯示確認提示視窗，說明目標桌次目前被篩選器隱藏，確認後將清除相關篩選並跳轉至桌號 X；numpad SHALL 維持開啟於背景

#### Scenario: 確認清除篩選並跳轉

- **WHEN** 確認提示視窗已顯示，使用者點擊「確認跳轉」
- **THEN** 系統 SHALL 關閉確認視窗與 numpad，清除使目標不可見的篩選設定，重新渲染，捲動至目標卡片並套用高亮；高亮 SHALL 在 1 秒後消失

#### Scenario: 取消清除篩選

- **WHEN** 確認提示視窗已顯示，使用者點擊「取消」
- **THEN** 系統 SHALL 關閉確認視窗，numpad SHALL 維持開啟，篩選設定 SHALL 不變，不執行捲動

## REMOVED Requirements

### Requirement: 清空搜尋

**Reason**: 搜尋改為確認制後，buffer 內容不再即時觸發搜尋或高亮；高亮生命週期由 numpad 開啟 / 關閉事件管理，與 buffer 是否為空無關。
**Migration**: 不適用（純 UI 行為，無資料遷移）。
