# Engineering decisions

## 2026-10-22 — Static ES modules, no build system
**Context:** repository was empty except for the provided PDF; target is GitHub Pages. **Decision:** use plain HTML/CSS/ES modules and a lightweight native Node test setup if available. **Alternative:** framework/build tooling. **Rationale:** deployable static paths and minimal setup. **Consequence:** no server-side routing or framework conveniences.

## 2026-10-22 — A* remains primary; comparison is honest
**Context:** PDF requests comparison across six algorithms, but individual algorithm is A*. **Decision:** implement A* first and display other rows as not implemented unless independently built and tested. **Alternative:** fabricated example measurements or expanding scope before A*. **Consequence:** comparison page may initially show only real A* results.

## 2026-10-22 — Use the PDF's example goal in the demo
**Context:** the PDF's example initial state is not reachable from the conventional 1–8 goal but is paired with a different goal in the document. **Decision:** default the UI to the PDF's paired initial/goal boards while preserving a conventional goal in the puzzle model for examples/tests. **Consequence:** the first run demonstrates a valid arbitrary-goal case.
