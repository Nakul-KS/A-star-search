export const DEFAULT_GOAL = Object.freeze([1, 2, 3, 4, 5, 6, 7, 8, 0]);

export function parseBoard(values) {
  const board = Array.from(values, (value) => value === '' ? 0 : Number(value));
  if (board.length !== 9 || board.some((tile) => !Number.isInteger(tile) || tile < 0 || tile > 8)) {
    return { valid: false, error: 'Enter each tile from 1–8 once and leave exactly one cell blank.' };
  }
  if (new Set(board).size !== 9) return { valid: false, error: 'Tiles cannot be repeated or missing.' };
  return { valid: true, board };
}

export const stateKey = (board) => board.join('');

export function getSuccessors(board) {
  const blank = board.indexOf(0);
  const row = Math.floor(blank / 3), col = blank % 3;
  const positions = [];
  if (row > 0) positions.push(blank - 3);
  if (col < 2) positions.push(blank + 1);
  if (row < 2) positions.push(blank + 3);
  if (col > 0) positions.push(blank - 1);
  return positions.map((position) => {
    const next = board.slice();
    [next[blank], next[position]] = [next[position], next[blank]];
    return next;
  });
}

export function isSolvable(board, goal) {
  const order = new Map(goal.filter((tile) => tile !== 0).map((tile, index) => [tile, index]));
  const sequence = board.filter((tile) => tile !== 0).map((tile) => order.get(tile));
  let inversions = 0;
  for (let i = 0; i < sequence.length; i += 1) {
    for (let j = i + 1; j < sequence.length; j += 1) if (sequence[i] > sequence[j]) inversions += 1;
  }
  return inversions % 2 === 0;
}

export function randomSolvableBoard(goal, random = Math.random) {
  const board = goal.slice();
  for (let i = board.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [board[i], board[j]] = [board[j], board[i]];
  }
  if (!isSolvable(board, goal)) {
    const positions = board.map((tile, index) => tile ? index : -1).filter((index) => index >= 0);
    [board[positions[0]], board[positions[1]]] = [board[positions[1]], board[positions[0]]];
  }
  return board;
}
