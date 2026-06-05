## ADDED Requirements

### Requirement: 觸控裝置上的 filter 按鈕不殘留 hover 樣式
tracker-view 的 filter 按鈕（全部設為已完成、複製資訊、只顯示加時桌）的 `:hover` 樣式 SHALL 僅在支援真實懸停的裝置（`@media (hover: hover)`）上套用。觸控裝置 SHALL NOT 因 tap 動作而觸發 `:hover` 樣式殘留。

#### Scenario: 觸控裝置點擊 filter 按鈕後不殘留亮起效果
- **WHEN** 使用者在觸控裝置上 tap「全部設為已完成」或「複製資訊」或「只顯示加時桌」按鈕
- **THEN** 按鈕 SHALL NOT 在點擊後保持 hover 亮起樣式，不需額外 tap 即可解除

#### Scenario: 滑鼠裝置懸停 filter 按鈕正常亮起
- **WHEN** 使用者在滑鼠裝置上將游標移至任一 filter 按鈕上方
- **THEN** 按鈕 SHALL 顯示對應的 hover 亮起樣式；游標移離後樣式 SHALL 自動消失
