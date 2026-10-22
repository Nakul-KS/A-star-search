export function comparisonRows(astarResult) {
  return ['BFS', 'DFS', 'DLS', 'IDDLS', 'GBFS', 'A*'].map((algorithm) => ({
    algorithm,
    implemented: algorithm === 'A*',
    result: algorithm === 'A*' ? astarResult : null,
  }));
}
