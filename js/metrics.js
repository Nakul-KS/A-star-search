export function formatMetrics(result) {
  const { status, metrics, path } = result;
  return { status, moves: path.length ? path.length - 1 : null, pathCost: path.length ? path.length - 1 : null, ...metrics };
}
