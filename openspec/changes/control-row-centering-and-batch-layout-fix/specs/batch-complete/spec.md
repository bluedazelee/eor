## ADDED Requirements

### Requirement: selection action bar 使用固定短標籤
selection action bar 的操作按鈕 SHALL 使用固定短標籤，不依賴 label-long/label-short span 切換機制：「全選」、「清除」、「反選」、「確認」。

#### Scenario: 短標籤正確顯示
- **WHEN** 使用者進入批量選取模式
- **THEN** selection action bar SHALL 顯示「全選」「清除」「反選」「確認」等短標籤，每個按鈕 SHALL 僅顯示一組文字
