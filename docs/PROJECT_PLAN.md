# Project plan

## 1. Repository inspection and requirements
Dependency: none. Inspect all files, Git state, and assignment PDF. Acceptance: actual baseline and assigned A* requirements recorded.
## 2. Architecture and project scaffolding
Depends on 1. Create static modules, test setup, styles, and documents. Acceptance: no server/build dependency; relative paths work.
## 3. Puzzle state model and validation
Depends on 2. Implement 9-cell validation, successors, arbitrary-goal parity, and solvable randomization. Acceptance: valid/invalid and parity tests pass.
## 4. A* search engine
Depends on 3. Heap frontier, both heuristics, g-score/parents, stale entries, cancellation/limits. Acceptance: optimal known cases and legal path tests pass.
## 5. Search event recording and visualization
Depends on 4. Record immutable expansion/successor/frontier information with bounded rendering. Acceptance: generated vs expanded is distinguishable.
## 6. Interactive puzzle UI
Depends on 3 and 5. Editable initial/goal boards, validation, random/reset. Acceptance: keyboard-usable valid inputs and clear errors.
## 7. Playback controls and animation
Depends on 5 and 6. Run/pause/resume/step/reset/speed. Acceptance: one managed timer and correct navigation.
## 8. Metrics and comparison page
Depends on 4. Actual A* metrics, honest unsupported rows. Acceptance: same immutable input instance and definitions shown.
## 9. Algorithm educational content
Depends on 4. Explain A*, assumptions, heuristics and limitations. Acceptance: claims qualified and consistent with code.
## 10. Testing and debugging
Depends on 3–9. Unit/integration/manual checks. Acceptance: recorded actual outcomes and fixes.
## 11. Responsive design and accessibility
Depends on 6–9. Mobile layouts, semantics, focus, reduced motion. Acceptance: no narrow-screen overflow and controls labeled.
## 12. README, screenshots and deployment preparation
Depends on 10–11. Document local run/Pages. Acceptance: no invented URLs/images/deployment state.
## 13. Final acceptance testing
Depends on all. Re-run tests and inspect deployment-compatible paths. Acceptance: all claimed features verified; remaining work disclosed.
