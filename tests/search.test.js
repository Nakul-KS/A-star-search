import test from 'node:test';
import assert from 'node:assert/strict';
import { aStar, MinHeap } from '../js/astar.js';
import { DEFAULT_GOAL, getSuccessors, isSolvable, parseBoard, randomSolvableBoard, stateKey } from '../js/puzzle.js';
import { manhattanDistance, misplacedTiles } from '../js/heuristics.js';

const goal = [...DEFAULT_GOAL];
const solve = (board, target = goal, heuristic = manhattanDistance) => aStar(board, target, heuristic);

test('validates exact tile membership and rejects malformed/duplicate values', () => {
  assert.equal(parseBoard([1, 2, 3, 4, 5, 6, 7, 8, '']).valid, true);
  assert.equal(parseBoard([1, 2, 3, 4, 5, 6, 7, 7, 0]).valid, false);
  assert.equal(parseBoard([1, 2, 3]).valid, false);
});
test('solved board returns a zero-move solution', () => {
  const result = solve(goal);
  assert.equal(result.status, 'solved'); assert.equal(result.path.length, 1); assert.equal(result.metrics.expanded, 0);
});
test('one move and known multi-move boards return optimal legal paths', () => {
  for (const [start, cost] of [[[1, 2, 3, 4, 5, 6, 7, 0, 8], 1], [[1, 2, 3, 5, 0, 6, 4, 7, 8], 4]]) {
    const result = solve(start); assert.equal(result.status, 'solved'); assert.equal(result.path.length - 1, cost);
    for (let i = 1; i < result.path.length; i++) assert.ok(getSuccessors(result.path[i - 1]).some((next) => stateKey(next) === stateKey(result.path[i])));
  }
});
test('detects unreachable state and supports arbitrary goal parity', () => {
  assert.equal(isSolvable([1, 2, 3, 4, 5, 6, 8, 7, 0], goal), false);
  const target = [1, 2, 3, 4, 5, 6, 0, 7, 8];
  assert.equal(solve([1, 2, 3, 4, 5, 6, 7, 8, 0], target).path.length - 1, 2);
});
test('heuristics compute expected values and exclude blank', () => {
  assert.equal(manhattanDistance([1, 2, 3, 4, 5, 6, 7, 0, 8], goal), 1);
  assert.equal(misplacedTiles([1, 2, 3, 4, 5, 6, 7, 0, 8], goal), 1);
  assert.equal(manhattanDistance(goal, goal), 0);
});
test('successors are legal blank swaps only', () => {
  const states = getSuccessors(goal); assert.equal(states.length, 2);
  for (const state of states) assert.equal(state.filter((tile) => tile !== 0).sort().join(''), '12345678');
});
test('priority queue pops lowest f then heuristic deterministically', () => {
  const heap = new MinHeap(); heap.push({ f: 4, h: 2 }); heap.push({ f: 3, h: 2 }); heap.push({ f: 3, h: 1 });
  assert.equal(heap.pop().h, 1); assert.equal(heap.pop().f, 3); assert.equal(heap.pop().f, 4);
});
test('randomized board remains solvable relative to arbitrary goal', () => {
  const target = [1, 2, 3, 4, 5, 6, 0, 7, 8];
  for (let i = 0; i < 30; i++) assert.equal(isSolvable(randomSolvableBoard(target), target), true);
});
test('duplicate state handling yields the same optimal cost with either heuristic', () => {
  const start = [1, 2, 3, 5, 0, 6, 4, 7, 8];
  assert.equal(solve(start, goal, misplacedTiles).path.length, solve(start).path.length);
});
