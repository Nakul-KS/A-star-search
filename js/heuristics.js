export function misplacedTiles(board, goal) {
  return board.reduce((total, tile, index) => total + (tile !== 0 && tile !== goal[index] ? 1 : 0), 0);
}

export function manhattanDistance(board, goal) {
  const goalPositions = new Array(9);
  goal.forEach((tile, index) => { goalPositions[tile] = index; });
  return board.reduce((total, tile, index) => {
    if (tile === 0) return total;
    const target = goalPositions[tile];
    return total + Math.abs(Math.floor(index / 3) - Math.floor(target / 3)) + Math.abs(index % 3 - target % 3);
  }, 0);
}

export const HEURISTICS = Object.freeze({ misplaced: misplacedTiles, manhattan: manhattanDistance });
