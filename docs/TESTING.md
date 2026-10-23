# Testing record

## Planned coverage
- Unit: board validation, successors, arbitrary-goal inversion parity, random solvability, both heuristics, heap ordering, A* duplicate/improved-score handling and parent reconstruction.
- Correctness: solved, one-move, multi-move, unsolvable, arbitrary goal, legal adjacent path, optimal cost cross-checked with independent BFS for small cases.
- Integration/manual: input/reset, run/pause/resume/step/speed, immutable search log, comparison using same state, errors, responsive/accessibility checks.
- Performance/browser/Pages: bounded hard cases, console inspection, relative paths and Pages direct-load check after deployment.

## Actual results
- Baseline inspection only: no application or test setup existed, so no tests have yet run.
- `npm test` — PASS, 9 tests, 0 failures (Node test runner): validation, solved/one-move/multi-move cases, unsolvable and arbitrary goal, heuristics, successors, heap ordering, randomized parity, and matching optimal cost across heuristics.
- Browser smoke test via local Python static server at `http://127.0.0.1:8765/`: page loaded; PDF example board solved in 5 moves; trace showed 5 expansion events; no horizontal overflow at the tested default viewport. Manual playback control inspection was inconclusive because intervals advanced between remote browser calls; dedicated playback tests remain pending.
- GitHub Pages smoke check on 2026-10-23: `https://nakul-ks.github.io/A-star-search/` returned the application page successfully. This confirms the page was reachable at check time; it is not a comprehensive device/browser compatibility test.
- Record exact commands and outcomes here as testing is performed. Do not treat planned checks as completed.

## Known failures
- None observed; verification pending.
