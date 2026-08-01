# Responsive Visual Parity Design

## Objective

Repair the existing Dr. Yasmine Belkacem Next.js site without recreating it. Preserve the supplied desktop reference as the only desktop visual source of truth and derive a professional mobile layout because no mobile reference exists.

## Reference integrity

- Source: `C:\Users\genious pc\Downloads\ChatGPT Image 27 juil. 2026, 04_07_40.png`
- Format: PNG, RGB, 24 bits per pixel
- Dimensions: 1308 × 1203 pixels
- File size: 1,532,507 bytes
- DPI metadata: 96 × 96
- ICC/sRGB metadata: no embedded ICC or explicit sRGB chunk detected; comparisons treat decoded RGB values as sRGB-compatible pixels
- SHA-256: `D300BEA2043AA55D7E2FBF1868650180B0551B3FC1EBD4E3267468B1833A73EB`
- The file must remain read-only and must never be resized, cropped, compressed, re-exported, or replaced by a screenshot.

## Existing project assessment

The repository is a Next.js 16.2.12 and React 19.2.4 static marketing page. Its assets already contain the supplied doctor and hero imagery. The primary visual defect is a long cascade of conflicting calibration rules in `src/app/globals.css`. The page also renders a clinic highlight section absent from the reference. The existing Node test validates only source strings and cannot detect layout regressions.

## Desktop design

At a 1308 × 1203 Chromium viewport with device scale factor 1, render the exact section sequence shown in the reference: header, hero with trust panel, services, statistics, three information cards, and guarantee footer. Remove the clinic highlight section. Preserve all visible French copy, current approved images, icon family, contact data, gradients, and card hierarchy. The full viewport capture must contain no unexpected overflow or omitted section.

## Mobile design

The primary mobile viewport is 390 × 844. Additional validation viewports are 360 × 800 and 430 × 932. Mobile is a reflow, not a scaled desktop:

- Header uses a compact first row and an accessible collapsible navigation below it.
- Hero copy, calls to action, media, and trust items stack in reading order.
- Primary calls to action have touch-friendly dimensions.
- Trust, service, statistic, information, and guarantee items reflow without horizontal scrolling.
- The contact phone becomes a `tel:` link without changing its visible text.
- Images retain their intended crop and never expose broken-image UI or alt text.
- The document must satisfy `scrollWidth <= clientWidth` at every target viewport.

## Visual comparison environment

Use Playwright Chromium only, one pinned Playwright version, zoom 100%, device scale factor 1, and the declared viewport. Capture a production build rather than hot reload. Before capture, wait for network idle, `document.fonts.ready`, and `decode()` on every image. Disable animations and transitions through Playwright screenshot options and a capture stylesheet.

## Visual diff output

For desktop, validate the reference hash and dimensions before reading pixels. Save the implementation screenshot, a pixel-diff PNG, and a Markdown report recording total pixels, differing pixels, difference percentage, affected bounding box, structural/cosmetic/rendering classification, and next correction. Structural differences are not acceptable at completion. For mobile, where no reference exists, save screenshots and a structural report covering overflow, overlaps, broken images, element visibility, and viewport dimensions.

## Safety and verification

Keep TypeScript strict and introduce no unsafe type escapes. The appointment form remains client-side demonstration behavior and must not claim to transmit medical data. Run formatting, lint, type checking, Node tests, Playwright tests, production build, dependency audit, and a changed-file secret scan before completion.
