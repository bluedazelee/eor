## REMOVED Requirements

### Requirement: 全部設為已完成
**Reason**: 由更靈活的「批量設為已完成」功能（`batch-complete` capability）取代，新功能支援「範圍排除」與「指定桌號」兩種模式，覆蓋原功能的所有場景（將排除清單留空即等同原有的「全部設為已完成」）。
**Migration**: 移除 `btn-mark-all-completed` 按鈕及其事件綁定與 `markAllCompleted()` 函式；改用新增的批量操作入口按鈕。
