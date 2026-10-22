import { parseBoard, randomSolvableBoard, stateKey } from './puzzle.js';
import { HEURISTICS } from './heuristics.js';
import { aStar } from './astar.js';
import { createPlayback } from './playback.js';
import { renderBoard, renderStateList } from './visualizer.js';

const studentName = 'Nakul K S';
const registrationNumber = '24BCE2549';
const initial = [2, 8, 3, 1, 6, 4, 7, 0, 5];
const assignmentGoal = [1, 2, 3, 8, 0, 4, 7, 6, 5];
let goal = assignmentGoal.slice(), start = initial.slice(), result = null, playbackState = { position: 0, frames: [], state: null };
const $ = (id) => document.getElementById(id);
const playback = createPlayback((state) => { playbackState = state; updatePlayback(); });
$('student-details').innerHTML = `${studentName} <b>·</b> ${registrationNumber}`;

function makeEditableBoard(node, board, setBoard) {
  node.replaceChildren();
  board.forEach((tile, index) => {
    const button = document.createElement('button'); button.type = 'button'; button.className = `tile${tile === 0 ? ' tile-blank' : ''}`;
    button.textContent = tile || ''; button.setAttribute('aria-label', `Cell ${index + 1}: ${tile || 'blank'}. Click to edit.`);
    button.addEventListener('click', () => {
      const raw = prompt(`Enter tile 1–8, or leave blank (currently ${tile || 'blank'}):`, tile || '');
      if (raw === null) return;
      const text = raw.trim(); const value = text === '' ? 0 : Number(text);
      if (!Number.isInteger(value) || value < 0 || value > 8) return showMessage('Use a number from 1 to 8, or leave the cell blank.', 'warning');
      const next = board.slice(), other = next.indexOf(value);
      if (other >= 0) [next[index], next[other]] = [next[other], next[index]];
      setBoard(next); renderInputs(); clearResult();
    });
    node.append(button);
  });
}

function renderInputs() {
  makeEditableBoard($('initial-board'), start, (board) => { start = board; });
  makeEditableBoard($('goal-board'), goal, (board) => { goal = board; });
  $('goal-caption').textContent = stateKey(goal).replaceAll('0', '·');
}
function showMessage(message, type = 'danger') { const node = $('message'); node.className = `alert alert-${type}`; node.textContent = message; }
function clearMessage() { $('message').className = 'alert d-none'; $('message').textContent = ''; }
function clearResult() { result = null; playback.load([]); $('trace-body').innerHTML = '<tr><td colspan="8" class="empty-row">Run a search to see A*’s decisions.</td></tr>'; $('event-count').textContent = '0 EVENTS'; updateMetrics(null); }
function updateMetrics(outcome) {
  const m = outcome?.metrics;
  $('m-status').textContent = outcome ? ({ solved: 'Solved', unsolvable: 'Unsolvable', limit: 'Limit reached', cancelled: 'Cancelled', 'not-found': 'Not found' }[outcome.status]) : '—';
  $('m-moves').textContent = outcome?.path.length ? outcome.path.length - 1 : outcome?.status === 'solved' ? '0' : '—';
  $('m-generated').textContent = m?.generated ?? '—'; $('m-expanded').textContent = m?.expanded ?? '—'; $('m-depth').textContent = m?.maxDepth ?? '—';
  $('m-time').textContent = m ? `${m.elapsedMs.toFixed(1)} ms` : '—'; $('m-cost').textContent = outcome?.path.length ? outcome.path.length - 1 : '—'; $('m-memory').textContent = m ? `~${(m.approximateMemoryBytes / 1024).toFixed(1)} KB` : '—';
  $('compare-status').textContent = outcome ? outcome.status : 'Run A*'; $('compare-expanded').textContent = m?.expanded ?? '—'; $('compare-moves').textContent = outcome?.path.length ? outcome.path.length - 1 : '—';
}
function updatePlayback() {
  const state = playbackState.state ?? start;
  renderBoard($('current-board'), state, goal);
  const last = Math.max(playbackState.frames.length - 1, 0), pos = playbackState.position ?? 0;
  $('step-badge').textContent = `STEP ${pos} / ${last}`; $('progress').style.width = last ? `${pos / last * 100}%` : '0%';
  $('playback-title').textContent = playbackState.frames.length ? (pos === last ? 'Goal reached' : `Move ${pos} of ${last}`) : 'Ready to explore';
  $('move-label').textContent = playbackState.frames.length ? `${last} moves · optimal path` : 'No path loaded';
  $('play').textContent = playbackState.playing ? 'Ⅱ' : '▶'; $('play').setAttribute('aria-label', playbackState.playing ? 'Pause solution' : 'Play solution');
  $('previous').disabled = pos === 0; $('next').disabled = !playbackState.frames.length || pos >= last;
}
function populateTrace() {
  const body = $('trace-body'); body.replaceChildren();
  const events = result.events, visible = events.slice(-120);
  visible.forEach((event, index) => {
    const tr = document.createElement('tr');
    const values = [events.length - visible.length + index + 1, event.expanded, event.parent ?? '—', event.depth, event.g, event.h, event.f, event.successors.length];
    values.forEach((value) => { const td = document.createElement('td'); td.textContent = String(value); tr.append(td); }); body.append(tr);
  });
  $('event-count').textContent = `${events.length} EVENTS`;
  const last = events.at(-1); renderStateList($('frontier-list'), last?.frontier ?? []); renderStateList($('explored-list'), last?.explored ?? []);
  $('frontier-count').textContent = last?.frontier?.length ?? 0; $('explored-count').textContent = result.metrics.expanded;
}

$('run').addEventListener('click', () => {
  clearMessage();
  const initialCheck = parseBoard(start), goalCheck = parseBoard(goal);
  if (!initialCheck.valid || !goalCheck.valid) return showMessage(initialCheck.error || goalCheck.error);
  start = initialCheck.board; goal = goalCheck.board;
  const heuristic = HEURISTICS[$('heuristic').value];
  result = aStar(start, goal, heuristic, { maxExpanded: 100000, maxDurationMs: 10000 });
  updateMetrics(result); renderInputs();
  if (result.status === 'unsolvable') { playback.load([start]); showMessage('This initial state cannot reach the selected goal. Try a solvable random puzzle.', 'warning'); }
  else if (result.status === 'solved') { playback.load(result.path); showMessage(`Optimal solution found in ${result.path.length - 1} moves.`, 'success'); }
  else { playback.load([start]); showMessage(`Search stopped: ${result.status}. The configured execution limit was reached.`, 'warning'); }
  populateTrace();
});
$('random').addEventListener('click', () => { start = randomSolvableBoard(goal); renderInputs(); clearResult(); clearMessage(); });
$('reset-input').addEventListener('click', () => { start = initial.slice(); goal = assignmentGoal.slice(); renderInputs(); clearResult(); clearMessage(); });
$('play').addEventListener('click', () => playbackState.playing ? playback.pause() : playback.play());
$('previous').addEventListener('click', () => playback.previous()); $('next').addEventListener('click', () => playback.next()); $('reset-playback').addEventListener('click', () => playback.reset());
$('speed').addEventListener('change', (event) => playback.setSpeed(Number(event.target.value)));
$('heuristic').addEventListener('change', () => { $('heuristic-help').textContent = $('heuristic').value === 'manhattan' ? 'Adds each tile’s row + column distance from its goal.' : 'Counts numbered tiles outside their goal cell.'; });
renderInputs(); renderBoard($('current-board'), start, goal); updatePlayback(); updateMetrics(null);
