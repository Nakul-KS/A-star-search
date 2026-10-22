export function renderBoard(container, board, goal = [], solution = []) {
  container.replaceChildren();
  board.forEach((tile, index) => {
    const cell = document.createElement('div');
    cell.className = `tile${tile === 0 ? ' tile-blank' : ''}${goal[index] === tile && tile ? ' tile-goal' : ''}`;
    cell.textContent = tile === 0 ? '' : String(tile);
    cell.setAttribute('aria-label', tile === 0 ? 'Blank' : `Tile ${tile}`);
    if (solution.includes(index) && tile !== 0) cell.classList.add('tile-solution');
    container.append(cell);
  });
}

export function renderStateList(container, keys, limit = 40) {
  container.replaceChildren();
  const shown = keys.slice(-limit);
  for (const key of shown) {
    const item = document.createElement('li');
    item.textContent = key.replaceAll('0', '·');
    container.append(item);
  }
  if (keys.length > shown.length) {
    const note = document.createElement('li'); note.textContent = `${keys.length - shown.length} earlier states omitted from view`; container.prepend(note);
  }
}
