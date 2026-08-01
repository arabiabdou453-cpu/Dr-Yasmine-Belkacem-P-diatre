# Responsive Visual Parity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the existing pediatric site closely match the immutable 1308 × 1203 desktop reference and reflow cleanly at 360, 390, and 430 pixel mobile widths.

**Architecture:** Keep the existing Next.js App Router page and data model. Add deterministic Playwright browser tests plus a standalone exact-pixel reporter, simplify the page to reference-backed sections, and replace the conflicting stylesheet with one desktop-first responsive system.

**Tech Stack:** Next.js 16.2.12, React 19.2.4, TypeScript 5.9, CSS, Node test runner, Playwright Chromium, PNGJS.

## Global Constraints

- Never alter `C:\Users\genious pc\Downloads\ChatGPT Image 27 juil. 2026, 04_07_40.png`.
- Validate reference dimensions 1308 × 1203 and SHA-256 `D300BEA2043AA55D7E2FBF1868650180B0551B3FC1EBD4E3267468B1833A73EB` before diffing.
- Use Chromium, zoom 100%, device scale factor 1, disabled animations, decoded images, and ready fonts.
- Preserve approved text, contact data, icons, and image assets; do not add placeholders.
- Target mobile viewports 390 × 844, 360 × 800, and 430 × 932 with no horizontal overflow.
- Do not use TypeScript `any`, suppression comments, unsafe assertions, or weakened checks.

---

### Task 1: Deterministic visual test harness

**Files:**

- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `playwright.config.ts`
- Create: `tests/visual.spec.ts`
- Create: `scripts/visual-diff.mjs`

**Interfaces:**

- Consumes: production server at `http://127.0.0.1:3100` and optional `REFERENCE_IMAGE`.
- Produces: screenshots under `test-results/visual/` and exact pixel metrics from `npm run visual:diff`.

- [ ] **Step 1: Add failing browser assertions**

Create tests that require no horizontal overflow, decoded images, visible appointment and telephone links, an absent clinic highlight, and a reference-sized desktop screenshot.

- [ ] **Step 2: Verify RED**

Run `npm run test:e2e`; expect failure because Playwright configuration, the telephone link, and the corrected layout do not yet exist.

- [ ] **Step 3: Add the minimal pinned test dependencies and configuration**

Install exact `@playwright/test`, `pngjs`, and `@types/pngjs` development versions. Configure one Chromium worker, device scale factor 1, production web server, deterministic capture waits, and screenshot output paths.

- [ ] **Step 4: Add exact-pixel reporting**

Implement a Node ESM script that validates the immutable reference SHA-256 and dimensions, compares RGBA pixels without resizing either file, writes a visible diff PNG, and writes structured JSON metrics.

- [ ] **Step 5: Re-run to confirm failures now describe the page defects**

Run `npm run test:e2e`; expect assertions for the clinic section, telephone semantics, or overflow to fail rather than configuration errors.

### Task 2: Reference-backed page structure

**Files:**

- Modify: `src/app/page.tsx`
- Modify: `tests/page.test.mjs`

**Interfaces:**

- Consumes: `siteData`, `AppointmentForm`, and existing image assets.
- Produces: desktop section order matching the reference and semantic mobile navigation/contact controls.

- [ ] **Step 1: Add failing source regression assertions**

Require an accessible mobile navigation summary, a `tel:0555123456` contact link, and absence of `clinic-highlight` and `clinic-pediatre.png`.

- [ ] **Step 2: Verify RED**

Run `npm test`; expect the new assertions to fail against the current page.

- [ ] **Step 3: Apply the minimal structural correction**

Wrap navigation in a native `details`/`summary` control that is visually inert on desktop, render phone contact as a typed link based on its existing value, and remove only the unreferenced clinic section.

- [ ] **Step 4: Verify GREEN**

Run `npm test`; expect all source regression assertions to pass.

### Task 3: Consolidated desktop and mobile styling

**Files:**

- Modify: `src/app/globals.css`

**Interfaces:**

- Consumes: the stable class names emitted by `page.tsx`.
- Produces: one non-conflicting desktop cascade and responsive rules at 1100, 720, and 380 pixels.

- [ ] **Step 1: Use the failing Playwright layout checks as RED evidence**

Record failures at 1308 × 1203, 390 × 844, 360 × 800, and 430 × 932 before changing CSS.

- [ ] **Step 2: Replace accumulated overrides with a single desktop-first stylesheet**

Keep reference dimensions, seven service columns, the four-item trust panel, five statistics, three information cards, and the five-item footer. Use measured pink, purple, navy, white, border, and gradient colors.

- [ ] **Step 3: Add mobile reflow**

At 720 pixels, activate the navigation summary, stack hero content, use touch-sized CTAs, reflow grids, keep image crops controlled, and prevent all width overflow. At 380 pixels, reduce only spacing and grid count rather than scaling the page.

- [ ] **Step 4: Verify GREEN**

Run `npm run test:e2e`; expect all structural and interaction assertions to pass on the four declared viewports.

### Task 4: Visual calibration and reports

**Files:**

- Create: `docs/visual-diff/latest.md`
- Generate: `test-results/visual/desktop-1308x1203.png`
- Generate: `test-results/visual/desktop-diff.png`
- Generate: `test-results/visual/mobile-360x800.png`
- Generate: `test-results/visual/mobile-390x844.png`
- Generate: `test-results/visual/mobile-430x932.png`

**Interfaces:**

- Consumes: deterministic screenshots and immutable reference pixels.
- Produces: human-readable classification and machine-readable metrics.

- [ ] **Step 1: Capture the production page**

Run the pinned Playwright capture after fonts and images are ready with animations disabled.

- [ ] **Step 2: Run exact pixel comparison**

Run `npm run visual:diff`; record total pixels, different pixels, percentage, and affected bounds.

- [ ] **Step 3: Inspect and correct structural regions**

Use the diff image and screenshots to correct section heights, grid positions, crops, text wrapping, overflow, and missing/excess elements. Repeat capture and diff until no avoidable structural difference remains.

- [ ] **Step 4: Document residual differences**

Classify every remaining region as cosmetic or rendering-only with direct visual evidence. Document mobile structural checks separately because no mobile pixel reference exists.

### Task 5: Full verification and security gate

**Files:**

- Modify only files required to fix failures found by the commands below.

- [ ] **Step 1: Run formatting**

Run `npm run format:check`; format project-owned files if necessary and repeat until exit code 0.

- [ ] **Step 2: Run static and automated checks**

Run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run test:e2e`; require zero failures.

- [ ] **Step 3: Run production build**

Run `npm run build`; require a successful static production build.

- [ ] **Step 4: Run security checks**

Run `npm audit --omit=dev` and scan the diff for secrets and forbidden TypeScript suppressions. Do not run forced dependency upgrades as part of this visual fix.

- [ ] **Step 5: Review the final diff**

Run `git status`, `git diff`, and `git diff --check`; confirm only scoped files changed and no source reference or approved asset was modified.
