# A* Search

## Model and transitions
A state is a row-major nine-element array containing each integer 0–8 exactly once; zero denotes the blank. The user supplies both initial and goal configurations. A successor swaps zero with one orthogonally adjacent tile; every move costs one.

## Search
The frontier is a min-priority queue ordered by `f(n)=g(n)+h(n)` with deterministic tie-breaking. `g` is the unit-move path cost, `h` estimates remaining cost, and `f` ranks candidates. A best-g map suppresses inferior discoveries; parent links reconstruct the path. Lazy improved queue entries are allowed, with stale entries skipped. The goal is accepted when removed from the frontier. Closed states may be reopened when a strictly better g is found, preserving graph-search correctness.

Misplaced Tiles counts numbered tiles not in their goal positions. Manhattan Distance sums each numbered tile's row and column displacement from its selected goal position. Both exclude blank and work for arbitrary goals. For ordinary unit-cost sliding moves they are admissible and consistent.

## Solvability
For odd-width boards, remove the blank and count inversions relative to the goal's ordering of numbered tiles. A state is reachable iff its inversion parity matches the goal's. This supports arbitrary valid goals.

## Guarantees and limits
With finite branching, non-negative unit costs, an admissible heuristic, and correct best-g graph-search handling, A* is complete and returns an optimal path. Time and space are exponential in solution depth in the worst case (often written O(b^d)); memory is a practical constraint. Execution limits/cancellation may stop a run before a solution and must be reported distinctly. An inconsistent heuristic requires reopening improved closed states; the two supplied heuristics are consistent.

## Pseudocode
```text
push(start, g=0, f=h(start)); bestG[start]=0
while frontier not empty and not cancelled/limited:
  n = pop minimum; skip if queued g != bestG[n]
  if n is goal: return reconstruct(parent, n)
  expand n
  for each legal successor s:
    candidate = bestG[n] + 1
    if candidate < bestG[s]:
      bestG[s]=candidate; parent[s]=n
      push(s, candidate, candidate+h(s))
return no solution / stopped status
```

## Worked example
With goal `123/456/780` and start `123/456/708`, tile 8 is one move from its goal cell: Manhattan h=1 and misplaced h=1. The only needed blank swap reaches the goal with g=1, so f=1 and the optimal path cost is one.
