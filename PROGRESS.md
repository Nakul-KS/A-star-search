# Project progress

## Status
- Current status: Static application implemented; core tests pass; browser smoke test passed; not yet final-acceptance complete.
- Current phase: 10 — testing and debugging.
- Last verified application state: `npm test` passes 9/9; browser loaded at the tested viewport and solved the PDF example in 5 moves with 5 expansion events.
- Deployment: GitHub Pages URL `https://nakul-ks.github.io/A-star-search/` verified reachable on 2026-10-23.

## Completed
- [x] Inspected repository tree and Git status; confirmed only `.gitattributes`, Git metadata, and the assignment PDF were present.
- [x] Read `Artificial Intelligence QP 1 (1).pdf`; confirmed registration 24BCE2549 is assigned algorithm 7 (A*).
- [x] Create initial project documentation and record assignment source.
- [x] Create the static UI, A* search, arbitrary-goal puzzle rules, heuristic controls, playback, trace, metrics, and honest comparison rows.
- [x] Add automated core tests; `npm test` passed 9 tests.
- [x] Run a local browser smoke check; confirmed the PDF example solves with its paired custom goal.
- [x] Rewrote the root README after inspecting application code, tests, docs, package scripts, Git remote, and license/assets state.
- [x] Updated README with the verified GitHub Pages URL and removed its former screenshot section/placeholders.

## In progress
- [ ] Deterministic playback tests, mobile/accessibility verification, and polish.

## Pending (priority order)
- [x] Puzzle model, arbitrary-goal parity, heuristics, A*, and unit tests.
- [x] Responsive UI, search visualization, playback, and metrics (basic browser smoke test; full responsive/accessibility tests remain).
- [x] Honest comparison page and A* educational content.
- [ ] Browser/accessibility testing, documentation refinement, and GitHub Pages preparation.

## Bugs and limitations
- Editable boards currently use browser prompts and swap a selected tile with the requested tile; consider replacing with direct keyboard-editable fields.
- Search is synchronous and may block interaction while it runs; execution limits bound, but cannot instantly cancel, such a run.
- The comparison only runs A*; BFS, DFS, DLS, IDDLS, and GBFS show NOT IMPLEMENTED.
- Browser interval playback could not be conclusively verified across remote browser calls; add deterministic playback coverage.
- Assignment calls out six algorithms in comparison, but the individual assignment is A*. Unimplemented algorithms must be labeled as such.

## Tests actually executed
- `npm test` — passed 9/9 tests (Node test runner).
- Local browser smoke test: PDF example reports Solved, 5 moves, 5 events, no horizontal overflow at default viewport.
- `node --check js/main.js`, `node --check js/astar.js`, and `git diff --check` — passed.
- README verification: fenced-code delimiters balanced; all referenced local files exist; no license file exists. GitHub Pages URL was subsequently verified reachable.
- `npm test` rerun during README verification — passed 9/9 tests.

## Latest session files
- Updated root `README.md` with verified usage, structure, constraints, test instructions, configured repository link, and deployment/license/screenshot status.

## Remaining work
1. Add automated playback and comparison integration coverage; improve direct board editing.
2. Verify mobile dimensions, accessibility, console output, and playback timing.
3. Finalize Pages readiness; deployment requires user-controlled GitHub access.
