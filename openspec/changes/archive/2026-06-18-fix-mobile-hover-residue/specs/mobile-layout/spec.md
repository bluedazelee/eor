## ADDED Requirements

### Requirement: 批量選取列按鈕與 action-footer 按鈕不殘留 hover 樣式
批量選取模式的按鈕列（取消、選未完成、清空、反選、確認執行）及 action-footer 的結束按鈕，其 `:hover` 樣式 SHALL 僅在支援真實懸停的裝置（`@media (hover: hover)`）上套用。觸控裝置 SHALL NOT 因 tap 動作而觸發 `:hover` 樣式殘留。

#### Scenario: 觸控裝置點擊批量選取列按鈕後不殘留亮起效果
- **WHEN** 使用者在觸控裝置上進入批量選取模式，並 tap「取消」、「選未完成」、「清空」或「反選」任一按鈕
- **THEN** 被點按的按鈕 SHALL NOT 在 tap 後保持 hover 亮起樣式，不需額外 tap 即可解除

#### Scenario: 觸控裝置點擊確認執行按鈕後不殘留效果
- **WHEN** 使用者在觸控裝置上於批量選取模式中選取桌次後 tap「確認執行」按鈕
- **THEN** 按鈕 SHALL NOT 在 tap 後殘留 transform 浮起或 box-shadow 光暈效果

#### Scenario: 觸控裝置點擊 action-footer 結束按鈕後不殘留效果
- **WHEN** 使用者在觸控裝置上 tap action-footer 的強制結束或確認完畢按鈕
- **THEN** 按鈕 SHALL NOT 在 tap 後殘留 transform 浮起或 box-shadow 光暈效果

#### Scenario: 滑鼠裝置懸停批量選取列按鈕正常亮起
- **WHEN** 使用者在滑鼠裝置上將游標移至任一批量選取列按鈕上方
- **THEN** 按鈕 SHALL 顯示對應的 hover 亮起樣式；游標移離後樣式 SHALL 自動消失
