# RetryCraft — API Resilience Lab

> Turn distributed-systems failure modes into visible, testable behavior.

A small, production-minded **banking engineering portfolio demo** built with plain HTML, CSS and JavaScript. The goal is to make domain decisions visible, not to imply a connection to a real financial institution.

## Run it — no installation required

1. Download or clone this repository.
2. Open `index.html` directly in a modern browser. No `npm install`, package manager, build step, backend, account or API key is required.
3. Use **Load sample data** to explore the workflow.

The app is offline-first. Demo state is stored in browser `localStorage` when the browser permits it; a session-only fallback is used otherwise. Use **Reset demo** to restore the sample scenario. Exported files are generated locally in your browser.

## What it demonstrates

- Simulate HTTP outcome sequences and bounded retries with exponential backoff.
- Demonstrate which HTTP status classes should and should not be retried.
- Explore idempotency keys, duplicate requests and payload conflicts.
- Simulate a circuit breaker opening after consecutive failures.
- Inspect a structured event trace and export it as JSON for review.

## Engineering decisions

- Zero third-party runtime dependencies; no remote fonts, CDN scripts, or external API calls.
- Domain rules live in `core.js`, separate from DOM rendering and interaction code in `app.js`.
- `tests/run.js` uses Node's built-in assertion library only. Node is not required to run the app; it is only needed to execute the optional automated tests.
- GitHub Actions runs the domain tests and JavaScript syntax checks without installing project dependencies.
- Input is treated as untrusted. CSV parsing supports quoted fields and escaped quotes; imported text is rendered as text rather than HTML.
- Responsive layout, keyboard focus, semantic labels, status text, and reduced-motion preferences are included.

## Architecture

```text
index.html       Accessible application shell
styles.css       Design tokens, components, responsive layout
core.js          Pure domain functions; independent of the DOM
app.js           View state, rendering, browser storage, file export/import
sample-data/     Fictional fixtures for exploratory use
tests/run.js     Dependency-free unit tests
```

## Data and security boundaries

- All included records are synthetic and intended for local demonstrations only.
- This project is not connected to a bank, payment processor, credit bureau, fraud vendor, or production monitoring system.
- Client-side browser storage is not secure storage for confidential data. Do not enter real customer records, account numbers, credentials, tokens, or payment data.
- Decisions and metrics are illustrative and must not be used to make production financial, compliance, fraud, or incident-response decisions.

## Test

```bash
node tests/run.js
node --check core.js
node --check app.js
```

## Deploy as a static site

The repository contains no build step. Enable GitHub Pages from the `main` branch and `/ (root)`, or serve the files from any static host. If opening through `file://`, use the bundled sample data; file selection and local-storage behavior may vary by browser. GitHub Pages provides the most consistent experience.

## Suggested next production steps

Replace local state with an authenticated API, define explicit authorization boundaries, add server-side validation and audit storage, introduce contract/integration tests, threat-model the domain, and verify accessibility and performance against the target organization's standards.

## License

MIT — see `LICENSE`.
