## Why

「詳細資訊」複製內容中，剩餘一般桌目前每個桌號獨立一行，桌數多時字串偏長，不利於貼到通訊軟體時的閱讀。改為逗號分隔可大幅縮短文字高度，加時桌保持逐行格式以便快速辨識。

## What Changes

- `buildRemainingInfo()` 中剩餘一般桌的桌號由 `join('\n')` 改為 `join(', ')`
- 加時桌格式維持 `join('\n')` 不變

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

- `copy-remaining-tables-info`：「詳細資訊」的剩餘一般桌格式從逐行改為逗號分隔

## Impact

- `app.js`：修改 `buildRemainingInfo()` 一行
- `sw.js`：PWA 快取版本號需更新
