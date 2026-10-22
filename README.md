# Interactive 8-Puzzle Solver — A* Search

Artificial Intelligence assignment: an interactive 8-puzzle state-space solver and visualization.

**Student:** Nakul K S (editable in application configuration) · **Registration:** 24BCE2549 · **Assigned algorithm:** 7 — A* Search.

## Features
- Editable initial and goal boards, validation, and solvable random puzzles.
- A* with Misplaced Tiles or Manhattan Distance, search trace, solution playback, and metrics.
- Comparison and algorithm learning sections that identify algorithms not implemented; no invented measurements.

## Technology
HTML5, CSS3, JavaScript ES6 modules, Bootstrap CSS. Static hosting; no backend.

## Heuristics
Misplaced Tiles and Manhattan Distance exclude the blank and respect arbitrary goal configurations. See [algorithm notes](docs/ALGORITHM.md).

## Structure
`index.html`, `css/`, `js/`, `tests/`, and `docs/`. See [architecture](docs/ARCHITECTURE.md) and [project plan](docs/PROJECT_PLAN.md).

## Run locally
Use Node.js 18+ for tests: `npm test`. Open `index.html` in a modern browser supporting JavaScript modules, or use a static server (e.g. `python -m http.server 8000`) and visit `http://localhost:8000`.

## Screenshots
Screenshots will be added after the interface is implemented and verified.

## Deployment
GitHub repository URL: not yet available. GitHub Pages URL: not yet deployed/verified. Publish the repository root on the `main` branch via **Settings → Pages → Deploy from a branch** after pushing; confirm the actual URL and test it before recording it here.

## References
- Assignment source: `Artificial Intelligence QP 1 (1).pdf` in this repository.
- Russell and Norvig, *Artificial Intelligence: A Modern Approach*, informed search and heuristic search.
