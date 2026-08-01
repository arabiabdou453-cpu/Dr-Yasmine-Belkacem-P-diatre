# Visual Diff Report — 2026-08-01

## Fixed environment

- Browser: Playwright Chromium 149.0.7827.55 (Playwright 1.61.0)
- Zoom: 100%
- Device scale factor: 1
- Desktop viewport: 1308 × 1203
- Mobile viewports: 360 × 800, 390 × 844, 430 × 932
- Capture: production Next.js build, CSS animations/transitions disabled
- Readiness: network idle, `document.fonts.ready`, lazy-image activation, and `image.decode()` for every valid image

## Immutable reference

- Path: `C:\Users\genious pc\Downloads\ChatGPT Image 27 juil. 2026, 04_07_40.png`
- Format: PNG, RGB, 24 bits per pixel
- Dimensions: 1308 × 1203
- File size: 1,532,507 bytes
- Embedded ICC profile: none
- SHA-256: `D300BEA2043AA55D7E2FBF1868650180B0551B3FC1EBD4E3267468B1833A73EB`

## Measured reference colors

- Page/header background: RGB(254, 254, 254), `#FEFEFE`
- Primary pink gradient samples: RGB(234, 45, 118) → RGB(230, 65, 130)
- Dark navy heading interiors: approximately RGB(0, 0, 21), `#000015`
- Purple heading samples: approximately RGB(118, 71, 195), `#7647C3`
- Statistics gradient: RGB(119, 77, 194) → RGB(157, 132, 212)
- Footer background sample: RGB(246, 242, 251), `#F6F2FB`
- Card backgrounds: RGB(254, 254, 254), `#FEFEFE`

Samples were taken from interior pixels and homogeneous regions, not anti-aliased text edges or shadow boundaries.

## Desktop exact-pixel result

- Reference dimensions: 1308 × 1203
- Implementation dimensions: 1308 × 1203
- Total pixels: 1,573,524
- Exact differing pixels: 1,456,111
- Exact difference: 92.538214%
- Affected bounds: x=0..1307, y=0..1202
- Screenshot: `test-results/visual/desktop-1308x1203.png`
- Diff image: `test-results/visual/desktop-diff.png`
- Machine metrics: `test-results/visual/desktop-diff.json`

The exact metric intentionally counts every one-channel, one-level RGB difference; it is not thresholded or blurred.

## Difference classification

### Structural

- Corrected: section sequence now matches the reference. The unreferenced clinic highlight was removed.
- Corrected: header, hero, services, statistics, three-card information grid, and guarantee footer occupy the same 1308 × 1203 capture and follow the reference grid proportions.
- Remaining: `public/images/hero-pediatre.png` depicts a different doctor/child scene from the supplied reference. Its crop can be aligned, but its subjects and room cannot become identical without replacing the approved asset.
- Remaining: `public/images/doctor-pediatre.webp` depicts a different portrait/background from the supplied reference.

These remaining source-asset differences are material and must not be mislabeled as rendering-only. They remain because the approved requirements prohibit generated/replacement assets and prohibit extracting/cropping the reference image.

### Cosmetic

- Existing inline SVG icon paths differ from the icon artwork in the reference.
- Native date/time controls and font rasterization differ slightly from the reference render.
- The map is an existing CSS pattern rather than the exact map artwork shown in the reference.
- Small shadow, border, and anti-aliasing differences remain.

### Rendering-only

- Subpixel text anti-aliasing and native Chromium form glyphs account for a small subset only. The full residual difference is not classified as rendering-only.

## Mobile structural result

No mobile reference exists, so no fabricated pixel-diff percentage is reported.

| Viewport  | Horizontal overflow | Broken images | Mobile menu         | Phone link          | CTA height |
| --------- | ------------------- | ------------- | ------------------- | ------------------- | ---------- |
| 360 × 800 | none                | 0             | visible/collapsible | visible `tel:` link | ≥44 px     |
| 390 × 844 | none                | 0             | visible/collapsible | visible `tel:` link | ≥44 px     |
| 430 × 932 | none                | 0             | visible/collapsible | visible `tel:` link | ≥44 px     |

Mobile screenshots are saved under `test-results/visual/`. The layout uses real reflow: stacked hero and calls to action, responsive trust/services/statistics grids, single-column information cards, and a single-column guarantee footer.
