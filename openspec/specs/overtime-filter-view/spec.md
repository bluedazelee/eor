# Capability: overtime-filter-view

## Purpose
TBD

## Requirements

### Requirement: 只顯示加時桌切換按鈕
系統主畫面最上方 MUST 提供「只顯示加時桌」切換按鈕。按鈕有兩種狀態：停用（預設，顯示所有桌）與啟用（只顯示有加時標記的桌），點擊可在兩者之間切換。

#### Scenario: 點擊切換至只顯示加時桌
- **WHEN** 「只顯示加時桌」按鈕處於停用狀態，使用者點擊該按鈕
- **THEN** 系統 SHALL 切換按鈕至啟用狀態（視覺上有明顯區別），並重新渲染圖卡列表，僅顯示 `overtimeMinutes !== null` 的桌號圖卡

#### Scenario: 再次點擊切換回全顯示
- **WHEN** 「只顯示加時桌」按鈕處於啟用狀態，使用者點擊該按鈕
- **THEN** 系統 SHALL 切換按鈕至停用狀態，並重新渲染圖卡列表，恢復依「顯示已完成桌號」checkbox 決定可見性

#### Scenario: 無加時桌時啟用篩選顯示空列表
- **WHEN** 目前輪次中無任何桌號設有加時標記，使用者點擊「只顯示加時桌」按鈕
- **THEN** 系統 SHALL 顯示空的圖卡列表，不顯示任何圖卡
