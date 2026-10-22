# Agent instructions

## Purpose and requirements
Build a GitHub Pages-ready interactive 8-puzzle assignment for Artificial Intelligence. Student: Nakul K S (configurable); registration: 24BCE2549; assigned algorithm 7 is **A* Search**. The assignment PDF requires HTML/CSS/ES6, Bootstrap or Tailwind, two heuristics, puzzle/search visualization, controls, metrics, comparison and algorithm information.

## Working rules
- Read `PROGRESS.md`, `README.md`, and relevant `docs/` before continuing work. Preserve existing working code; make targeted edits.
- Keep the site static and dependency-light. Use ES modules and relative asset paths for GitHub Pages; use Bootstrap styling without requiring a build process.
- Use readable ES6, small pure-logic modules, deterministic state keys, and no global mutable state where practical.
- Board states are 9-element arrays, digits 0–8; 0 is the blank. Validate exact membership and serialize deterministically (e.g. digit string).
- A* must use a min-priority queue, best-known g scores, stale-entry skipping, parent reconstruction, legal successors, and unit edge costs. Both heuristics exclude zero and support any valid goal. Solvability is relative to arbitrary goals.
- Keep generated/discovered/expanded/explored distinctions accurate; snapshot history, cap rendered lists, and separate search events from playback position.
- Provide keyboard access, labels, focus visibility, responsive layout, reduced-motion support, explicit errors, and bounded search/runtime behavior.
- Run automated tests for changed behavior. Record only actual test commands/results; never fabricate benchmarks, screenshots, deployment, or URLs.
- Update affected docs, especially `PROGRESS.md`, `docs/TESTING.md`, and `docs/DECISIONS.md`. Maintain accurate deployment status.

## Structure and responsibility
- `index.html`, `css/`: static interface and responsive theme.
- `js/puzzle.js`: validation, successor generation, solvability, random states.
- `js/heuristics.js`, `js/astar.js`: heuristic and search engine.
- `js/visualizer.js`, `js/playback.js`, `js/metrics.js`, `js/comparison.js`, `js/main.js`: presentation, controls, reporting, and app wiring.
- `tests/`: executable algorithm/UI-logic tests; `docs/`: plans and technical records.

Use lower camelCase for functions/variables and descriptive constants. Before claiming completion, verify the app and tests; retain known limitations in documentation.
