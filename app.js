// ==========================================================================
// PTCG EoR Tracker - Core Logic
// ==========================================================================

// Global state structure
let state = {
  roundNumber: 0,
  group: '大師A組',
  startTable: 1,
  endTable: 200,
  tables: [] // Array of { number, state, assignedTime, overtimeMinutes }
};

// UI state (not persisted)
let showOvertimeOnly = false;
let hideCompleted = false;
let longPressTriggered = false;

// Undo/Redo history (not persisted to localStorage)
const MAX_UNDO = 20;
let undoStack = [];
let redoStack = [];

// LocalStorage keys
const STORAGE_KEY = 'ptcg_eor_tracker_state';
const GROUP_STORAGE_KEY = 'ptcg_eor_group';
const RANGE_STORAGE_KEY = 'ptcg_eor_range';

// DOM Elements
const setupView = document.getElementById('setup-view');
const trackerView = document.getElementById('tracker-view');
const setupForm = document.getElementById('setup-form');
const btnStart = document.getElementById('btn-start');
const roundInput = document.getElementById('round-name');
const groupInput = document.getElementById('group-input');
const startTableInput = document.getElementById('start-table');
const endTableInput = document.getElementById('end-table');

const displayRound = document.getElementById('display-round');
const statsCompleteCount = document.getElementById('stats-complete-count');
const statsPercentage = document.getElementById('stats-percentage');
const statsRemainingCount = document.getElementById('stats-remaining-count');
const progressBarFill = document.getElementById('progress-bar-fill');
const btnHideCompleted = document.getElementById('btn-hide-completed');
const cardGrid = document.getElementById('card-grid');
const btnFinishRound = document.getElementById('btn-finish-round');
const btnForceEndRound = document.getElementById('btn-force-end-round');
const btnBatchComplete = document.getElementById('btn-batch-complete');
const helpView = document.getElementById('help-view');
const btnHelp = document.getElementById('btn-help');
const btnHelpBack = document.getElementById('btn-help-back');
const btnCopyRemaining = document.getElementById('btn-copy-remaining');
const copyMenuPopup = document.getElementById('copy-menu-popup');
const btnCopyRange = document.getElementById('btn-copy-range');
const btnCopyOvertime = document.getElementById('btn-copy-overtime');
const btnCopyRemainingCount = document.getElementById('btn-copy-remaining-count');
const btnCopyDetail = document.getElementById('btn-copy-detail');
const btnCopyClose = document.getElementById('btn-copy-close');
const btnOvertimeFilter = document.getElementById('btn-overtime-filter');
const connectionBadge = document.getElementById('connection-badge');
const btnUndo = document.getElementById('btn-undo');
const btnRedo = document.getElementById('btn-redo');

// Selection mode elements
const selectionActionBar = document.getElementById('selection-action-bar');
const selectionCount = document.getElementById('selection-count');
const btnSelectionCancel = document.getElementById('btn-selection-cancel');
const btnSelectionConfirm = document.getElementById('btn-selection-confirm');
const btnSelectAllIncomplete = document.getElementById('btn-select-all-incomplete');
const btnSelectClear = document.getElementById('btn-select-clear');
const btnSelectInvert = document.getElementById('btn-select-invert');

// Search elements
const tableSearchInput = document.getElementById('table-search-input');
const tableSearchMsg = document.getElementById('table-search-msg');
const btnSearchToggle = document.getElementById('btn-search-toggle');
const tableSearchBar = document.querySelector('.table-search-bar');

// Compact strip elements (batch mode)
const compactRound = document.getElementById('compact-round');
const compactProgress = document.getElementById('compact-progress');

// Overtime popup elements
const overtimePopup = document.getElementById('overtime-popup');
const overtimePopupTitle = document.getElementById('overtime-popup-title');
const overtimeCustomInput = document.getElementById('overtime-custom-input');
const btnOvertimeConfirm = document.getElementById('btn-overtime-confirm');
const btnOvertimeClear = document.getElementById('btn-overtime-clear');
const btnOvertimeClose = document.getElementById('btn-overtime-close');

// ==========================================================================
// Service Worker Registration
// ==========================================================================
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then(reg => {
          console.log('Service Worker 註冊成功，範圍為:', reg.scope);
        })
        .catch(err => {
          console.error('Service Worker 註冊失敗:', err);
        });
    });
  }
}

// ==========================================================================
// Connection Status Monitoring
// ==========================================================================
function updateOnlineStatus() {
  if (navigator.onLine) {
    connectionBadge.textContent = '● 在線';
    connectionBadge.className = 'badge badge-online';
  } else {
    connectionBadge.textContent = '● 離線模式';
    connectionBadge.className = 'badge badge-offline';
  }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// ==========================================================================
// LocalStorage Persistence
// ==========================================================================
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      state = JSON.parse(data);
      // Backward-compat: patch missing group field
      if (state && state.group === undefined) {
        state.group = localStorage.getItem(GROUP_STORAGE_KEY) || '';
      }
      // Backward-compat: migrate old string roundName to roundNumber
      if (state && state.roundNumber === undefined) {
        const m = state.roundName && state.roundName.match(/(\d+)/);
        state.roundNumber = m ? parseInt(m[1], 10) : 1;
      }
      if (state && state.tables && state.tables.length > 0) {
        // Backward-compat: patch missing overtimeMinutes field
        state.tables.forEach(t => {
          if (t.overtimeMinutes === undefined) t.overtimeMinutes = null;
        });
        showTrackerView();
        renderTracker();
        updateUndoRedoButtons();
      }
    } catch (e) {
      console.error('還原 LocalStorage 狀態失敗，已重設。', e);
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}

// ==========================================================================
// Undo / Redo
// ==========================================================================
function updateUndoRedoButtons() {
  btnUndo.classList.toggle('disabled', undoStack.length === 0);
  btnRedo.classList.toggle('disabled', redoStack.length === 0);
}

function commitState() {
  undoStack.push(JSON.parse(JSON.stringify(state.tables)));
  if (undoStack.length > MAX_UNDO) undoStack.shift();
  redoStack.length = 0;
  updateUndoRedoButtons();
}

function undoAction() {
  if (undoStack.length === 0) return;
  redoStack.push(JSON.parse(JSON.stringify(state.tables)));
  state.tables = undoStack.pop();
  saveState();
  renderTracker();
  updateUndoRedoButtons();
}

function redoAction() {
  if (redoStack.length === 0) return;
  undoStack.push(JSON.parse(JSON.stringify(state.tables)));
  state.tables = redoStack.pop();
  saveState();
  renderTracker();
  updateUndoRedoButtons();
}

// ==========================================================================
// View Transitions
// ==========================================================================
function showSetupView() {
  trackerView.classList.add('hidden');
  setupView.classList.remove('hidden');
  setupForm.reset();
  roundInput.value = (state.roundNumber || 0) + 1;
  restoreGroupSelection();
  restoreRangeSelection();
}

// Restore the group dropdown to the last chosen value (persisted across rounds)
function restoreGroupSelection() {
  const saved = localStorage.getItem(GROUP_STORAGE_KEY);
  groupInput.value = saved || '';
}

// Persist the group choice immediately so it survives round resets
groupInput.addEventListener('input', () => {
  localStorage.setItem(GROUP_STORAGE_KEY, groupInput.value);
});

// Persist the table range so it survives round resets (saved on round start)
function saveRangeSelection(start, end) {
  localStorage.setItem(RANGE_STORAGE_KEY, JSON.stringify({ start, end }));
}

// Pre-fill the range inputs with the last-used values as an editable default.
// Falls back to the HTML defaults when there is no (or a corrupt) saved record.
function restoreRangeSelection() {
  const raw = localStorage.getItem(RANGE_STORAGE_KEY);
  if (!raw) return;
  try {
    const { start, end } = JSON.parse(raw);
    if (Number.isInteger(start) && start >= 1) startTableInput.value = start;
    if (Number.isInteger(end) && end >= 1) endTableInput.value = end;
  } catch {
    // Corrupt value — keep the HTML defaults
  }
}

function showTrackerView() {
  setupView.classList.add('hidden');
  helpView.classList.add('hidden');
  trackerView.classList.remove('hidden');
}

function showHelpView() {
  setupView.classList.add('hidden');
  trackerView.classList.add('hidden');
  helpView.classList.remove('hidden');
}

btnHelp.addEventListener('click', showHelpView);
btnHelpBack.addEventListener('click', () => {
  helpView.classList.add('hidden');
  setupView.classList.remove('hidden');
});

function formatRound(n) { return `R${n}`; }

// ==========================================================================
// Core Tracker Workflows
// ==========================================================================

btnStart.addEventListener('click', () => {
  const roundNumber = parseInt(roundInput.value, 10);
  const startVal = parseInt(startTableInput.value, 10);
  const endVal = parseInt(endTableInput.value, 10);

  if (isNaN(roundNumber) || roundNumber < 1 || roundNumber > 20) { alert('輪次必須是 1 到 20 之間的整數！'); return; }
  if (!groupInput.value.trim()) { alert('請輸入組別！'); return; }
  if (isNaN(startVal) || startVal < 1) { alert('起始桌號必須是正整數！'); return; }
  if (isNaN(endVal) || endVal < 1) { alert('結束桌號必須是正整數！'); return; }
  if (startVal > endVal) { alert('起始桌號不能大於結束桌號！'); return; }

  state.roundNumber = roundNumber;
  state.group = groupInput.value.trim();
  localStorage.setItem(GROUP_STORAGE_KEY, groupInput.value.trim());
  state.startTable = startVal;
  state.endTable = endVal;
  saveRangeSelection(startVal, endVal);
  state.tables = [];

  for (let i = startVal; i <= endVal; i++) {
    state.tables.push({
      number: i,
      state: 'active',
      assignedTime: null,
      overtimeMinutes: null
    });
  }

  undoStack.length = 0;
  redoStack.length = 0;
  saveState();
  showTrackerView();
  updateUndoRedoButtons();
  renderTracker();
});

// Render the entire dashboard & table grid
function renderTracker() {
  displayRound.textContent = formatRound(state.roundNumber);
  cardGrid.innerHTML = '';

  let completedCount = 0;
  let assignedCount = 0;
  let activeCount = 0;
  const totalCount = state.tables.length;

  state.tables.forEach(table => {
    if (table.state === 'completed') completedCount++;
    else if (table.state === 'assigned') assignedCount++;
    else activeCount++;

    // Compound visibility filter: overtime AND completed filters (AND)
    const passesOvertimeFilter = showOvertimeOnly ? table.overtimeMinutes !== null : true;
    const passesCompletedFilter = hideCompleted ? table.state !== 'completed' : true;
    if (!passesOvertimeFilter || !passesCompletedFilter) return;

    const card = document.createElement('div');
    card.className = `table-card state-${table.state}`;
    card.dataset.num = table.number;

    const numSpan = document.createElement('span');
    numSpan.className = 'num';
    numSpan.textContent = String(table.number).padStart(2, '0');
    card.appendChild(numSpan);

    const statusSpan = document.createElement('span');
    statusSpan.className = 'status-txt';
    if (table.state === 'active') {
      statusSpan.textContent = '尚未結束';
    } else if (table.state === 'assigned') {
      statusSpan.textContent = '已分配';
      if (table.assignedTime) {
        const timeSpan = document.createElement('span');
        timeSpan.className = 'time-stamp';
        timeSpan.textContent = table.assignedTime;
        card.appendChild(timeSpan);
      }
    } else {
      statusSpan.textContent = '已完成';
    }
    card.appendChild(statusSpan);

    // Overtime badge
    if (table.overtimeMinutes !== null) {
      const badge = document.createElement('span');
      badge.className = 'overtime-badge';
      badge.textContent = `+${table.overtimeMinutes}分`;
      card.appendChild(badge);
    }

    // Selection mode overlay
    if (isSelectionMode && selectedTables.has(table.number)) {
      card.classList.add('table-card-selected');
      const check = document.createElement('span');
      check.className = 'selection-check';
      check.textContent = '✓';
      card.appendChild(check);
    }

    // Click: toggle selection in selection mode, otherwise cycle state
    card.addEventListener('click', () => {
      if (isSelectionMode) {
        if (selectedTables.has(table.number)) {
          selectedTables.delete(table.number);
          card.classList.remove('table-card-selected');
          card.querySelector('.selection-check')?.remove();
        } else {
          selectedTables.add(table.number);
          card.classList.add('table-card-selected');
          const check = document.createElement('span');
          check.className = 'selection-check';
          check.textContent = '✓';
          card.appendChild(check);
        }
        updateSelectionBar();
        return;
      }
      if (longPressTriggered) {
        longPressTriggered = false;
        return;
      }
      cycleCardState(table.number);
    });

    // Long press: open overtime popup (disabled in selection mode)
    attachLongPress(card, table.number);

    cardGrid.appendChild(card);
  });

  // Metrics
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  statsCompleteCount.textContent = `已完成 ${completedCount} / ${totalCount} 桌`;
  statsPercentage.textContent = `(${progressPercent}%)`;
  statsRemainingCount.textContent = `剩餘 ${totalCount - completedCount} 桌`;
  progressBarFill.style.width = `${progressPercent}%`;

  if (completedCount === totalCount && totalCount > 0) {
    btnFinishRound.disabled = false;
    btnFinishRound.className = 'btn btn-success';
  } else {
    btnFinishRound.disabled = true;
    btnFinishRound.className = 'btn btn-disabled';
  }

  if (tableSearchInput && tableSearchInput.value.trim()) {
    handleTableSearch(tableSearchInput.value);
  }
}

// Cycle states: active -> assigned -> completed -> active
function cycleCardState(tableNumber) {
  const table = state.tables.find(t => t.number === tableNumber);
  if (!table) return;

  commitState();

  if (table.state === 'active') {
    table.state = 'assigned';
    const now = new Date();
    table.assignedTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  } else if (table.state === 'assigned') {
    table.state = 'completed';
  } else {
    table.state = 'active';
    table.assignedTime = null;
  }

  saveState();
  renderTracker();
}

btnHideCompleted.addEventListener('click', () => {
  hideCompleted = !hideCompleted;
  btnHideCompleted.classList.toggle('active', hideCompleted);
  renderTracker();
});

// ==========================================================================
// Long Press Detection
// ==========================================================================
function attachLongPress(cardElement, tableNumber) {
  let pressTimer = null;
  let startX = 0;
  let startY = 0;

  cardElement.addEventListener('pointerdown', e => {
    if (isSelectionMode) return;
    startX = e.clientX;
    startY = e.clientY;
    pressTimer = setTimeout(() => {
      pressTimer = null;
      longPressTriggered = true;
      showOvertimePopup(tableNumber);
    }, 500);
  });

  const cancel = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      pressTimer = null;
    }
  };

  cardElement.addEventListener('pointerup', cancel);
  cardElement.addEventListener('pointercancel', cancel);
  cardElement.addEventListener('pointermove', e => {
    if (pressTimer) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (Math.sqrt(dx * dx + dy * dy) > 10) cancel();
    }
  });
}

// ==========================================================================
// Overtime Marking
// ==========================================================================
function setOvertime(tableNumber, value) {
  const table = state.tables.find(t => t.number === tableNumber);
  if (!table) return;
  commitState();
  table.overtimeMinutes = value;
  saveState();
  renderTracker();
}

let _popupTargetTable = null;
let _outsideClickHandler = null;

function showOvertimePopup(tableNumber) {
  _popupTargetTable = tableNumber;

  const table = state.tables.find(t => t.number === tableNumber);
  const hasMark = table && table.overtimeMinutes !== null;

  // Reset input
  overtimeCustomInput.value = '';

  // Show table number in title
  overtimePopupTitle.querySelector('span').textContent = `設定加時 · ${tableNumber} 桌`;

  // Show/hide clear button
  btnOvertimeClear.classList.toggle('hidden', !hasMark);

  // Centered via CSS (.overtime-popup), no coordinate calculation needed
  overtimePopup.classList.remove('hidden');

  // Outside click closes popup (deferred so this event doesn't immediately close it)
  setTimeout(() => {
    _outsideClickHandler = e => {
      if (!overtimePopup.contains(e.target)) {
        closeOvertimePopup();
      }
    };
    document.addEventListener('pointerdown', _outsideClickHandler);
  }, 0);
}

function closeOvertimePopup() {
  overtimePopup.classList.add('hidden');
  if (_outsideClickHandler) {
    document.removeEventListener('pointerdown', _outsideClickHandler);
    _outsideClickHandler = null;
  }
  _popupTargetTable = null;
}

// Bind popup quick-select buttons
document.querySelectorAll('.btn-overtime-quick').forEach(btn => {
  btn.addEventListener('click', () => {
    const value = parseInt(btn.dataset.value, 10);
    if (_popupTargetTable !== null) setOvertime(_popupTargetTable, value);
    closeOvertimePopup();
  });
});

// Bind confirm button
btnOvertimeConfirm.addEventListener('click', () => {
  const val = parseInt(overtimeCustomInput.value, 10);
  if (!isNaN(val) && val >= 1) {
    if (_popupTargetTable !== null) setOvertime(_popupTargetTable, val);
    closeOvertimePopup();
  }
  // Invalid: stay open
});

// Bind clear button
btnOvertimeClear.addEventListener('click', () => {
  if (_popupTargetTable !== null) setOvertime(_popupTargetTable, null);
  closeOvertimePopup();
});

btnOvertimeClose.addEventListener('click', (e) => {
  e.stopPropagation();
  closeOvertimePopup();
});

// ==========================================================================
// Undo / Redo Button Events
// ==========================================================================
btnUndo.addEventListener('click', undoAction);
btnRedo.addEventListener('click', redoAction);

// ==========================================================================
// Overtime Filter Toggle
// ==========================================================================
btnOvertimeFilter.addEventListener('click', () => {
  showOvertimeOnly = !showOvertimeOnly;
  btnOvertimeFilter.classList.toggle('active', showOvertimeOnly);
  renderTracker();
});

// ==========================================================================
// Round Completion
// ==========================================================================
function resetAndReturnToSetup() {
  state.tables = [];
  localStorage.removeItem(STORAGE_KEY);
  showSetupView();
}

btnFinishRound.addEventListener('click', () => {
  if (btnFinishRound.disabled) return;
  const confirmReset = confirm(`確定本輪 [${formatRound(state.roundNumber)}] 負責的所有桌次皆已處理完畢？\n這將會清除當前紀錄並準備進行下一輪。`);
  if (confirmReset) resetAndReturnToSetup();
});

btnForceEndRound.addEventListener('click', () => {
  const incompleteCount = state.tables.filter(t => t.state !== 'completed').length;
  const confirmForce = confirm(`確定要強制結束本輪 [${formatRound(state.roundNumber)}]？\n目前仍有 ${incompleteCount} 桌尚未完成。\n這將會清除當前紀錄並準備進行下一輪。`);
  if (confirmForce) resetAndReturnToSetup();
});


// ==========================================================================
// Batch Complete — Selection Mode
// ==========================================================================
let isSelectionMode = false;
const selectedTables = new Set();

function updateSelectionBar() {
  const n = selectedTables.size;
  selectionCount.textContent = `已選 ${n} 桌`;
  btnSelectionConfirm.disabled = n === 0;
}

function enterSelectionMode() {
  isSelectionMode = true;
  selectedTables.clear();

  // Close search bar if open
  if (!tableSearchBar.classList.contains('hidden')) {
    closeSearchBar();
  }

  // Update compact strip with current progress snapshot
  const completedCount = state.tables.filter(t => t.state === 'completed').length;
  compactRound.textContent = formatRound(state.roundNumber);
  compactProgress.textContent = `${completedCount}/${state.tables.length}`;

  trackerView.classList.add('selection-mode');
  selectionActionBar.classList.remove('hidden');
  updateSelectionBar();
  renderTracker();
}

function exitSelectionMode() {
  isSelectionMode = false;
  selectedTables.clear();
  trackerView.classList.remove('selection-mode');
  selectionActionBar.classList.add('hidden');
  renderTracker();
}

btnBatchComplete.addEventListener('click', enterSelectionMode);

btnSelectionCancel.addEventListener('click', exitSelectionMode);

btnSelectionConfirm.addEventListener('click', () => {
  if (selectedTables.size === 0) return;
  commitState();
  state.tables.forEach(t => { if (selectedTables.has(t.number)) t.state = 'completed'; });
  saveState();
  renderTracker();
  exitSelectionMode();
});

btnSelectAllIncomplete.addEventListener('click', () => {
  const visibleIncomplete = Array.from(cardGrid.querySelectorAll('.table-card'))
    .filter(card => !card.classList.contains('state-completed'))
    .map(card => parseInt(card.dataset.num, 10));
  visibleIncomplete.forEach(n => selectedTables.add(n));
  updateSelectionBar();
  renderTracker();
});

btnSelectClear.addEventListener('click', () => {
  selectedTables.clear();
  updateSelectionBar();
  renderTracker();
});

btnSelectInvert.addEventListener('click', () => {
  const visibleNums = Array.from(cardGrid.querySelectorAll('.table-card'))
    .map(card => parseInt(card.dataset.num, 10));
  visibleNums.forEach(n => {
    if (selectedTables.has(n)) selectedTables.delete(n);
    else selectedTables.add(n);
  });
  updateSelectionBar();
  renderTracker();
});

// ==========================================================================
// Table Search
// ==========================================================================
function clearSearchHighlight() {
  document.querySelectorAll('.table-card-highlight').forEach(el => {
    el.classList.remove('table-card-highlight');
  });
  tableSearchInput.classList.remove('search-error');
  tableSearchMsg.textContent = '';
  tableSearchMsg.classList.add('hidden');
}

function openSearchBar() {
  tableSearchBar.classList.remove('hidden');
  btnSearchToggle.classList.add('active');
  tableSearchInput.focus();
}

function closeSearchBar() {
  tableSearchBar.classList.add('hidden');
  btnSearchToggle.classList.remove('active');
  tableSearchInput.value = '';
  clearSearchHighlight();
}

btnSearchToggle.addEventListener('click', () => {
  if (tableSearchBar.classList.contains('hidden')) {
    openSearchBar();
  } else {
    closeSearchBar();
  }
});

function handleTableSearch(value) {
  clearSearchHighlight();
  const trimmed = value.trim();
  if (!trimmed) return;

  const num = parseInt(trimmed, 10);
  if (isNaN(num)) return;

  const table = state.tables.find(t => t.number === num);
  if (!table) {
    tableSearchInput.classList.add('search-error');
    tableSearchMsg.textContent = `找不到桌號 ${num}`;
    tableSearchMsg.classList.remove('hidden');
    return;
  }

  const card = cardGrid.querySelector(`[data-num="${num}"]`);
  if (!card) {
    tableSearchMsg.textContent = `桌號 ${num} 目前被篩選器隱藏`;
    tableSearchMsg.classList.remove('hidden');
    return;
  }

  card.classList.add('table-card-highlight');
  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

tableSearchInput.addEventListener('input', e => handleTableSearch(e.target.value));

// ==========================================================================
// Copy Remaining Tables Info
// ==========================================================================

function buildRangeInfo() {
  const group = state.group;
  return `${group} ${formatRound(state.roundNumber)} ${state.startTable}~${state.endTable}`;
}

function buildRemainingCountInfo() {
  const remaining = state.tables.filter(t => t.state !== 'completed');
  return `${buildRangeInfo()}\n\n剩餘 ${remaining.length} 桌`;
}

// Returns overtime-tables string, or null if none exist
function buildOvertimeInfo() {
  const overtime = state.tables
    .filter(t => t.state !== 'completed' && t.overtimeMinutes !== null)
    .sort((a, b) => a.number - b.number)
    .map(t => `${t.number}(+${t.overtimeMinutes}分)`);
  return overtime.length > 0 ? overtime.join('\n') : null;
}

// Build the remaining-tables info string from incomplete tables
function buildRemainingInfo() {
  const remaining = state.tables.filter(t => t.state !== 'completed');

  const overtime = remaining
    .filter(t => t.overtimeMinutes !== null)
    .sort((a, b) => a.number - b.number)
    .map(t => `${t.number}(+${t.overtimeMinutes}分)`);

  const normal = remaining
    .filter(t => t.overtimeMinutes === null)
    .sort((a, b) => a.number - b.number)
    .map(t => `${t.number}`);

  const overtimeStr = overtime.length > 0 ? overtime.join('\n') : '無';
  const normalStr = normal.length > 0 ? normal.join(', ') : '無';

  return `${buildRangeInfo()}\n\n剩餘 ${remaining.length} 桌\n\n剩餘加時桌：\n${overtimeStr}\n\n剩餘一般桌：\n${normalStr}`;
}

// Copy text to clipboard with fallback for non-secure / offline contexts
async function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      // fall through to legacy fallback
    }
  }
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch (e) {
    return false;
  }
}

function showCopyMenu() {
  copyMenuPopup.style.display = 'flex';
}

function hideCopyMenu() {
  copyMenuPopup.style.display = 'none';
}

btnCopyRemaining.addEventListener('click', (e) => {
  e.stopPropagation();
  if (copyMenuPopup.style.display === 'none') {
    showCopyMenu();
  } else {
    hideCopyMenu();
  }
});

btnCopyRange.addEventListener('click', async (e) => {
  e.stopPropagation();
  const info = buildRangeInfo();
  const ok = await copyToClipboard(info);
  if (ok) {
    alert(`已複製本輪範圍：\n${info}`);
  } else {
    alert(`複製失敗，請手動複製：\n${info}`);
  }
  hideCopyMenu();
});

btnCopyOvertime.addEventListener('click', async (e) => {
  e.stopPropagation();
  const info = buildOvertimeInfo();
  if (info === null) {
    alert('目前無加時桌');
  } else {
    const ok = await copyToClipboard(info);
    if (ok) {
      alert(`已複製加時桌次：\n${info}`);
    } else {
      alert(`複製失敗，請手動複製：\n${info}`);
    }
  }
  hideCopyMenu();
});

btnCopyRemainingCount.addEventListener('click', async (e) => {
  e.stopPropagation();
  const info = buildRemainingCountInfo();
  const ok = await copyToClipboard(info);
  if (ok) {
    alert(`已複製剩餘桌次：\n${info}`);
  } else {
    alert(`複製失敗，請手動複製：\n${info}`);
  }
  hideCopyMenu();
});

btnCopyDetail.addEventListener('click', async (e) => {
  e.stopPropagation();
  const info = buildRemainingInfo();
  const ok = await copyToClipboard(info);
  if (ok) {
    alert(`已複製詳細資訊：\n${info}`);
  } else {
    alert(`複製失敗，請手動複製：\n${info}`);
  }
  hideCopyMenu();
});

btnCopyClose.addEventListener('click', (e) => {
  e.stopPropagation();
  hideCopyMenu();
});

document.addEventListener('click', () => {
  hideCopyMenu();
});

// ==========================================================================
// Initialization
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  updateOnlineStatus();
  loadState();
  restoreGroupSelection();
  registerServiceWorker();
});
