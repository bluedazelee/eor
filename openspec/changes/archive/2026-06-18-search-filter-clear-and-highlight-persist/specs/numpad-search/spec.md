## ADDED Requirements

### Requirement: 搜尋目標被篩選器遮擋時自動清除並跳轉
當搜尋桌號存在於 state.tables 但因篩選器（hideCompleted、showOvertimeOnly、activeRangeTab）而不在 DOM 中時，系統 SHALL 自動偵測並清除相關篩選器，重新渲染後跳轉至目標卡片並高亮，同時在 numpad 訊息區顯示「已清除篩選，跳轉至桌號 X」。

#### Scenario: 目標被「隱藏完成」篩選遮擋時自動清除
- **WHEN** `hideCompleted` 為 true，使用者搜尋狀態為「已完成」的桌次
- **THEN** 系統 SHALL 將 `hideCompleted` 設為 false，重新渲染，跳轉並高亮目標卡片，numpad 訊息區 SHALL 顯示「已清除篩選，跳轉至桌號 X」

#### Scenario: 目標被「只顯示加時」篩選遮擋時自動清除
- **WHEN** `showOvertimeOnly` 為 true，使用者搜尋無加時標記的桌次
- **THEN** 系統 SHALL 將 `showOvertimeOnly` 設為 false，重新渲染，跳轉並高亮目標卡片，numpad 訊息區 SHALL 顯示「已清除篩選，跳轉至桌號 X」

#### Scenario: 目標被範圍標籤遮擋時自動清除
- **WHEN** activeRangeTab 已選取，使用者搜尋不在該範圍內的桌次
- **THEN** 系統 SHALL 將 `activeRangeTab` 設為 null，重新渲染，跳轉並高亮目標卡片，numpad 訊息區 SHALL 顯示「已清除篩選，跳轉至桌號 X」

### Requirement: 關閉 numpad 後高亮延遲 1 秒消失
關閉數字鍵盤彈窗時，若目前有高亮卡片，系統 SHALL 延遲 1 秒後才清除高亮，讓使用者有時間辨認目標卡片位置；若無高亮則立即清除。

#### Scenario: 關閉 numpad 時有高亮卡片
- **WHEN** 搜尋成功後使用者關閉 numpad 彈窗
- **THEN** 目標卡片的高亮樣式 SHALL 在 1 秒後自動消失

#### Scenario: 重新開啟 numpad 時立即清除高亮
- **WHEN** 使用者在 1 秒延遲期間再次開啟 numpad
- **THEN** 系統 SHALL 立即清除現有高亮並取消延遲計時器，numpad SHALL 以乾淨狀態開啟
