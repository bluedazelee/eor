## Context

EoR Tracker 是純前端 PWA（vanilla JS + HTML + CSS），主要在行動裝置上使用。每張桌號圖卡目前支援點擊循環切換狀態（active → assigned → completed）。此次新增加時標記，需疊加在現有互動模型上，且不破壞點擊的狀態循環。

## Goals / Non-Goals

**Goals:**
- 長按圖卡彈出加時標記 UI，可選 +3/+6/+9 或手動輸入
- 加時值持久化至 LocalStorage（與桌號狀態一同儲存）
- 圖卡上顯示加時徽章
- 主畫面頂部新增「只顯示加時桌」切換按鈕，與現有已完成篩選獨立且可疊加

**Non-Goals:**
- 不支援多個加時值（每桌僅一個加時標記）
- 不依加時值排序或統計
- 不影響狀態循環邏輯

## Decisions

**決策 1：長按偵測使用計時器 + 移動取消**
- 選擇：`pointerdown` 啟動 500ms 計時器，`pointerup`/`pointermove`/`pointercancel` 取消；長按觸發後設 `longPressTriggered = true` 旗標，`click` 事件判斷旗標為 true 時跳過狀態循環
- 棄選：用獨立「標記模式按鈕」切換全域模式；增加操作步驟且在小螢幕上浪費空間
- 理由：行動裝置長按是直覺操作，旗標機制可在不修改 click 事件架構的前提下防止衝突

**決策 2：加時標記 UI 為錨定於圖卡的浮動彈出層（popup），非全螢幕 modal**
- 選擇：在 `document.body` 插入一個單例 `#overtime-popup` div，點擊外部或選擇後關閉
- 棄選：每張卡 inline 展開；圖卡尺寸小（minmax 110px），展開後破壞 grid 佈局
- 棄選：全螢幕 modal；操作路徑較長，且賽場環境需要快速操作
- 理由：浮動彈出層定位靈活，不影響 grid 排版，且單例設計避免多個彈出層同時存在

**決策 3：`overtimeMinutes` 欄位加入桌號資料結構，持久化至 LocalStorage**
- 選擇：在每個 table 物件加入 `overtimeMinutes: Number | null`，與現有 state 一同 `saveState()`
- 棄選：獨立 LocalStorage key；增加讀寫複雜度且難以保持同步
- 理由：統一的單一 state 物件最簡單，現有 `saveState()`/`loadState()` 無需改動架構

**決策 4：`showOvertimeOnly` 為 UI 狀態變數，不持久化**
- 選擇：模組作用域的 `let showOvertimeOnly = false`，與現有 `chkShowCompleted.checked` 同等地位
- 理由：篩選偏好是臨時操作，重新載入應還原預設視圖，與 checkbox 的現有行為一致

**決策 5：可見性規則 — 兩個篩選條件取交集（AND）**
- 規則：`visible = (showOvertimeOnly ? table.overtimeMinutes !== null : true) && (!chkShowCompleted.checked ? table.state !== 'completed' : true)`
- 理由：符合使用者描述的「只顯示未完成的加時桌」預期行為

**決策 6：清除加時標記透過彈出層內的「清除」按鈕**
- 選擇：彈出層在已有標記時額外顯示「清除標記」按鈕，將 `overtimeMinutes` 設為 `null`
- 理由：長按已標記圖卡自然進入編輯模式，行為一致

## Risks / Trade-offs

- [長按與捲動衝突] 使用者在卡片上捲動頁面時可能誤觸長按 → `pointermove` 超過 10px 閾值即取消計時器
- [iOS Safari 長按選取文字] 原生長按可能觸發選取 → CSS `user-select: none` 已在 `.table-card` 上設置，應可防止
- [彈出層定位超出視窗邊界] 靠近邊緣的圖卡彈出層可能被截斷 → 計算 popup 位置時做邊界修正（clamp to viewport）
