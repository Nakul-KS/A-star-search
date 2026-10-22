import { getSuccessors, isSolvable, stateKey } from './puzzle.js';

class MinHeap {
  constructor() { this.items = []; this.sequence = 0; }
  get size() { return this.items.length; }
  push(item) {
    item.sequence = this.sequence++;
    this.items.push(item);
    let i = this.items.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.compare(this.items[p], item) <= 0) break;
      this.items[i] = this.items[p]; i = p;
    }
    this.items[i] = item;
  }
  pop() {
    if (!this.items.length) return undefined;
    const top = this.items[0], last = this.items.pop();
    if (this.items.length) {
      let i = 0;
      while (true) {
        let child = 2 * i + 1;
        if (child >= this.items.length) break;
        if (child + 1 < this.items.length && this.compare(this.items[child + 1], this.items[child]) < 0) child += 1;
        if (this.compare(last, this.items[child]) <= 0) break;
        this.items[i] = this.items[child]; i = child;
      }
      this.items[i] = last;
    }
    return top;
  }
  compare(a, b) { return a.f - b.f || a.h - b.h || a.sequence - b.sequence; }
}

function reconstruct(parent, key, states) {
  const path = [];
  while (key !== undefined) { path.push(states.get(key).slice()); key = parent.get(key); }
  return path.reverse();
}

export function aStar(start, goal, heuristic, options = {}) {
  const startedAt = globalThis.performance?.now?.() ?? Date.now();
  const maxExpanded = options.maxExpanded ?? 100000;
  const maxDurationMs = options.maxDurationMs ?? 10000;
  const shouldCancel = options.shouldCancel ?? (() => false);
  if (!isSolvable(start, goal)) return { status: 'unsolvable', path: [], events: [], metrics: { generated: 0, expanded: 0, maxDepth: 0, elapsedMs: 0, approximateMemoryBytes: 0 } };

  const goalKey = stateKey(goal), startKey = stateKey(start), heap = new MinHeap();
  const bestG = new Map([[startKey, 0]]), parent = new Map(), states = new Map([[startKey, start.slice()]]);
  const depths = new Map([[startKey, 0]]), closed = new Set(), events = [];
  const initialH = heuristic(start, goal);
  heap.push({ key: startKey, g: 0, h: initialH, f: initialH });
  let generated = 1, expanded = 0, maxDepth = 0, status = 'not-found';
  while (heap.size) {
    if (shouldCancel()) { status = 'cancelled'; break; }
    const current = heap.pop();
    if (current.g !== bestG.get(current.key)) continue;
    if (current.key === goalKey) { status = 'solved'; break; }
    if (expanded >= maxExpanded || (globalThis.performance?.now?.() ?? Date.now()) - startedAt >= maxDurationMs) { status = 'limit'; break; }
    closed.add(current.key); expanded++;
    const successors = [];
    for (const board of getSuccessors(states.get(current.key))) {
      const key = stateKey(board), g = current.g + 1;
      generated++;
      successors.push(key);
      if (g >= (bestG.get(key) ?? Infinity)) continue;
      bestG.set(key, g); parent.set(key, current.key); states.set(key, board.slice()); depths.set(key, g);
      const h = heuristic(board, goal); heap.push({ key, g, h, f: g + h });
      maxDepth = Math.max(maxDepth, g);
    }
    events.push(Object.freeze({ expanded: current.key, state: states.get(current.key).slice(), parent: parent.get(current.key) ?? null, depth: current.g, g: current.g, h: current.h, f: current.f, successors, frontier: heap.items.map((node) => node.key).slice(0, 80), explored: [...closed].slice(-80) }));
  }
  const path = status === 'solved' ? reconstruct(parent, goalKey, states) : [];
  const endedAt = globalThis.performance?.now?.() ?? Date.now();
  return { status, path, events, metrics: { generated, expanded, maxDepth, elapsedMs: endedAt - startedAt, approximateMemoryBytes: (states.size * 9 * 8) + (bestG.size * 32) + (parent.size * 32) } };
}

export { MinHeap };
