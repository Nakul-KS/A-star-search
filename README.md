# AI 8-Puzzle Visualizer — A* Search

### Explore how a heuristic guides a puzzle solver.

An interactive 8-puzzle assignment project that runs **A* Search** with Misplaced Tiles or Manhattan Distance, displays its search trace and metrics, and lets you step through the resulting solution.

<p align="center">
  <a href="https://nakul-ks.github.io/A-star-search/"><strong>🚀 Live Demo</strong></a>
</p>

**Repository:** [Nakul-KS/A-star-search](https://github.com/Nakul-KS/A-star-search) · **Live application:** [nakul-ks.github.io/A-star-search](https://nakul-ks.github.io/A-star-search/)

> **Assignment:** Artificial Intelligence · **Student:** Nakul K S · **Registration:** 24BCE2549 · **Assigned algorithm:** A* Search (Algorithm 7)

---

## Overview

The 8-puzzle consists of a 3×3 board with numbered tiles 1–8 and one blank. A legal move slides a tile next to the blank into that space. A solver is given an **initial state** and a **goal state**, then searches for a sequence of legal moves connecting them.

This project models each board as a state in a search space. It demonstrates more than the final answer: the A* expansion log records the states expanded, their parent and costs, and successor counts; frontier and explored snapshots help inspect the search; and a separate playback control steps through the reconstructed solution.

## Features

### Puzzle and search
- Edit initial and goal boards by selecting a cell and swapping its tile with another tile (or the blank).
- Generate a random board solvable relative to the selected goal; reset to the assignment example.
- Run A* with **Manhattan Distance** or **Misplaced Tiles**, supporting arbitrary valid goal configurations.
- Check solvability before search using inversion parity relative to the selected goal.
- Inspect expanded states, parent, depth, `g`, `h`, `f`, generated-successor counts, and capped frontier/explored snapshots.
- Step, play/pause, reset, and change the speed of the **solution-path** playback.
- View generated/expanded counts, maximum discovered depth, elapsed time, path cost, moves, and approximate memory.

### Interface and comparison
- Responsive page layout, keyboard-focusable puzzle cells and controls, visible focus treatment, and reduced-motion styling.
- A comparison table reports results for A* only. BFS, DFS, DLS, IDDLS, and GBFS are explicitly marked **Not implemented**; no sample measurements are presented as results.
- Educational section describing A*'s cost function and heuristics.

## How A* search works

A* prioritizes a state `n` by its estimated total solution cost:

```text
f(n) = g(n) + h(n)
```

| Term | Meaning in this puzzle |
| --- | --- |
| `g(n)` | Number of unit-cost moves from the initial board to `n`. |
| `h(n)` | Estimated remaining moves from `n` to the selected goal. |
| `f(n)` | Estimated cost of a solution path through `n`. |

The **frontier** (open set) is a min-priority queue. A* removes its lowest-priority current entry, checks whether it is the goal, and otherwise generates the legal blank-tile swaps. A best-known `g` score prevents inferior routes from replacing better ones; stale queue entries are skipped. Parent links retain the best route found to each state and are followed backwards to reconstruct the solution.

Two goal-relative heuristics are implemented:

- **Misplaced Tiles:** counts numbered tiles not currently in their goal positions.
- **Manhattan Distance:** sums each numbered tile's horizontal plus vertical distance from its goal cell.

Both exclude the blank. For the standard 3×3 unit-cost puzzle, both are admissible and consistent. The explored/closed set records states that have been expanded; the application may expand a state again if a better path is later found.

For a finite state space, non-negative unit move costs, an admissible heuristic, and correct best-path graph-search handling, A* is complete and returns an optimal path. These guarantees do not mean every search finishes within a particular time or memory budget. This app has limits of 100,000 expansions and 10 seconds, and the search runs synchronously, so a difficult run can temporarily block the page until it stops.

Further details and pseudocode: [A* algorithm notes](docs/ALGORITHM.md).

## Technologies

| Technology | Use |
| --- | --- |
| HTML5 | Static page structure and accessible controls. |
| CSS3 | Responsive layout, board styling, and reduced-motion rules. |
| JavaScript ES modules | Puzzle model, A* engine, heuristics, rendering, and playback. |
| Bootstrap 5.3.3 CSS | Base layout and form/button styles, loaded from jsDelivr CDN. |
| Node.js built-in test runner | Runs the algorithm tests; no third-party npm packages are required. |
| Google Fonts | DM Sans, Manrope, and DM Mono typography, loaded from Google Fonts. |

## Project structure

```text
.
├── .gitattributes
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── astar.js
│   ├── comparison.js
│   ├── heuristics.js
│   ├── main.js
│   ├── metrics.js
│   ├── playback.js
│   ├── puzzle.js
│   └── visualizer.js
├── tests/
│   └── search.test.js
├── docs/
│   ├── ALGORITHM.md
│   ├── ARCHITECTURE.md
│   ├── DECISIONS.md
│   ├── PROJECT_PLAN.md
│   └── TESTING.md
├── AGENTS.md
├── package.json
├── PROGRESS.md
├── README.md
└── Artificial Intelligence QP 1 (1).pdf
```

| File | Responsibility |
| --- | --- |
| `js/puzzle.js` | Board parsing/validation, deterministic state keys, successors, relative solvability, random solvable boards. |
| `js/heuristics.js` | Misplaced Tiles and Manhattan Distance. |
| `js/astar.js` | Min-heap, A* search, best-cost and parent tracking, event trace, result metrics. |
| `js/visualizer.js` | Board and capped state-list rendering. |
| `js/playback.js` | Independent solution-frame playback controls and timer. |
| `js/metrics.js` | Metric formatting helper. |
| `js/comparison.js` | Comparison row model; not all algorithms are implemented. |
| `js/main.js` | UI wiring, editable boards, search execution, and displayed results. |
| `tests/search.test.js` | Node tests for puzzle logic, heuristics, heap behavior, and A* cases. |
| `docs/` | Architecture, algorithm, plan, decisions, and testing records. |

## Getting started

### Requirements

- A modern browser with JavaScript module support.
- Node.js with the built-in `node:test` runner (Node.js 18 or newer recommended) to run tests.
- Network access for Bootstrap CSS and Google Fonts. The application logic itself has no npm runtime dependencies.

### Clone and run

The configured public repository is `Nakul-KS/A-star-search`:

```bash
git clone https://github.com/Nakul-KS/A-star-search.git
cd A-star-search
python -m http.server 8000
```

Open <http://localhost:8000> in your browser. Since the page loads JavaScript as ES modules, use a local HTTP server rather than relying on `file://` behavior.

### Run tests

From the repository root:

```bash
npm test
```

This uses Node's built-in test runner and requires no `npm install` step.

## Using the application

1. In **Problem setup**, select a cell in either board. Enter a tile from 1 to 8, or leave the prompt blank for the blank; the chosen value swaps with its current location.
2. Select **Random solvable** to shuffle a start state that is reachable from the currently selected goal, or choose **Reset boards** to restore the assignment example.
3. Choose **Manhattan Distance** or **Misplaced Tiles** under **Heuristic Function**.
4. Select **Run A* Search**. The application validates reachability and then runs A* to completion or until an execution limit is reached.
5. Review the **Expansion log**. Each row describes an expanded state and its successors count; the **Frontier & explored** panel shows capped snapshots from the last recorded expansion. The trace is populated after the synchronous search completes, not streamed live.
6. In **Solution path**, use the play button to play/pause, the arrows to move forward/back, the reset button to return to step zero, and **Speed** to change playback timing. This playback is the reconstructed solution, not the internal expansion order.
7. Review the status, moves, generated and expanded counts, maximum depth, elapsed time, path cost, and approximate memory figures below the boards.
8. The **Compare the search** table updates the A* result for the same current board. Other algorithms remain marked **Not implemented**.

## Performance metrics

| Metric | Meaning |
| --- | --- |
| **Nodes generated** | Starts at one for the initial state and adds each legal successor considered, including duplicate successors. |
| **Nodes expanded** | Non-goal states removed from the frontier and expanded. |
| **Maximum depth** | Greatest best-known discovered path depth during the search. |
| **Execution time** | Elapsed search time measured with `performance.now()` when available, otherwise `Date.now()`. |
| **Moves / path cost** | Number of edges in the reconstructed solution; each legal move costs one. |
| **Approximate memory** | An estimate from tracked state arrays and map entries. JavaScript does not expose reliable per-object memory usage; this is not a browser heap measurement. |

## Testing and correctness

The current suite is `tests/search.test.js`, run with `npm test`. It covers input validation, solved/one-move/multi-move boards, an unreachable state, arbitrary goals, both heuristics, legal successors, priority-queue ordering, random-board solvability, and agreement of optimal solution length across the two heuristics for a small case.

**Recorded result:** 9 tests passed, 0 failed, using `npm test` (Node test runner). The suite does not yet include dedicated playback tests, a broad UI integration suite, or an independent BFS oracle; see [the testing record](docs/TESTING.md) for current verification limits.

## Deployment

The static site is deployed through GitHub Pages and the live page was verified at:

[🚀 https://nakul-ks.github.io/A-star-search/](https://nakul-ks.github.io/A-star-search/)

The project has no build step or backend. To configure or update deployment, publish the repository root from the `main` branch under **Settings → Pages → Build and deployment → Deploy from a branch**. After changing Pages settings or publishing updates, check the deployment status in GitHub and verify the resulting page and module requests.

## Student and assignment

| Field | Details |
| --- | --- |
| Course | Artificial Intelligence |
| Assignment | Interactive 8-Puzzle Problem Solver using AI Search Algorithms |
| Student | Nakul K S |
| Registration number | 24BCE2549 |
| Assigned algorithm | A* Search, Algorithm 7 |

## Learning outcomes

This implementation demonstrates board-state representation and legal transitions, goal-relative solvability, informed search with heuristic functions, parent-based reconstruction of an optimal path under stated assumptions, and the interpretation of search counters and resource estimates.

## References and acknowledgements

- Assignment requirements and algorithm allocation: [`Artificial Intelligence QP 1 (1).pdf`](<Artificial Intelligence QP 1 (1).pdf>).
- Russell, Stuart J., and Peter Norvig. *Artificial Intelligence: A Modern Approach*. Reference for informed search and heuristic-search concepts.
- Bootstrap CSS 5.3.3 is loaded from jsDelivr; DM Sans, Manrope, and DM Mono are loaded from Google Fonts. No other third-party runtime or search libraries are used.

## License

No license has been specified in this repository. All rights remain with their respective holders unless a license is added; reuse and redistribution permissions are therefore not granted by this README.
