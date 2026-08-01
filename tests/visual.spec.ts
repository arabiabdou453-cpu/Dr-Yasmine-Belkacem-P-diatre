import { expect, test, type Page } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const visualOutput = path.join(process.cwd(), "test-results", "visual");

interface ViewportCase {
  readonly name: string;
  readonly width: number;
  readonly height: number;
}

const mobileViewports: readonly ViewportCase[] = [
  { name: "mobile-360x800", width: 360, height: 800 },
  { name: "mobile-390x844", width: 390, height: 844 },
  { name: "mobile-430x932", width: 430, height: 932 },
];

async function preparePage(page: Page, viewport: ViewportCase): Promise<void> {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    await document.fonts.ready;
    const viewportHeight = window.innerHeight;
    for (let y = 0; y < document.documentElement.scrollHeight; y += viewportHeight) {
      window.scrollTo(0, y);
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    }
    window.scrollTo(0, 0);
    const images = Array.from(document.images);
    await Promise.all(
      images.map(async (image) => {
        if (!image.complete) {
          await new Promise<void>((resolve) => {
            image.addEventListener("load", () => resolve(), { once: true });
            image.addEventListener("error", () => resolve(), { once: true });
          });
        }
        if (image.naturalWidth > 0) {
          await image.decode();
        }
      }),
    );
  });
  await page.addStyleTag({
    content:
      "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}",
  });
}

async function expectHealthyLayout(page: Page, width: number): Promise<void> {
  const health = await page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth;
    const overflowElements = Array.from(
      document.querySelectorAll<HTMLElement>(
        "header, main, section, footer, article, nav, a, button, input, select, img",
      ),
    )
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && (rect.left < -1 || rect.right > viewportWidth + 1);
      })
      .map((element) => ({
        className: element.className,
        tagName: element.tagName,
      }));

    const desktopNavigation = document.querySelector<HTMLElement>(".desktop-navigation");
    const mobileNavigation = document.querySelector<HTMLElement>(".mobile-navigation");

    return {
      brokenImages: Array.from(document.images).filter(
        (image) => !image.complete || image.naturalWidth === 0,
      ).length,
      bodyFont: getComputedStyle(document.body).fontFamily,
      documentWidth: document.documentElement.scrollWidth,
      desktopNavigationDisplay: desktopNavigation
        ? getComputedStyle(desktopNavigation).display
        : "missing",
      mobileMediaMatches: window.matchMedia("(max-width: 720px)").matches,
      mobileNavigationDisplay: mobileNavigation
        ? getComputedStyle(mobileNavigation).display
        : "missing",
      styleSheets: Array.from(document.styleSheets).map((sheet) => sheet.href),
      overflowElements,
      viewportWidth,
    };
  });

  expect(health.viewportWidth).toBe(width);
  expect(health.brokenImages).toBe(0);
  expect(health.overflowElements, JSON.stringify(health)).toEqual([]);
  expect(health.documentWidth, JSON.stringify(health)).toBeLessThanOrEqual(width);
}

test.beforeAll(async () => {
  await mkdir(visualOutput, { recursive: true });
});

test("desktop matches the reference viewport structure", async ({ page }) => {
  const viewport = { name: "desktop-1308x1203", width: 1308, height: 1203 } as const;
  await preparePage(page, viewport);

  await expectHealthyLayout(page, viewport.width);
  await expect(page.locator(".clinic-highlight")).toHaveCount(0);
  await expect(page.locator('a[href="tel:0555123456"]')).toBeVisible();
  await expect(page.locator("summary.navigation-toggle")).toBeHidden();
  await expect(page.locator(".guarantee-footer")).toBeInViewport();

  await page.screenshot({
    animations: "disabled",
    fullPage: false,
    path: path.join(visualOutput, `${viewport.name}.png`),
    scale: "css",
  });
});

for (const viewport of mobileViewports) {
  test(`${viewport.name} has a readable reflow without overflow`, async ({ page }) => {
    await preparePage(page, viewport);

    await expectHealthyLayout(page, viewport.width);
    await expect(page.locator("summary.navigation-toggle")).toBeVisible();
    await expect(page.locator('a[href="tel:0555123456"]')).toBeVisible();

    const primaryActions = page.locator(".hero-actions .button");
    await expect(primaryActions).toHaveCount(2);
    for (let index = 0; index < 2; index += 1) {
      const box = await primaryActions.nth(index).boundingBox();
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
    }

    await page.screenshot({
      animations: "disabled",
      fullPage: true,
      path: path.join(visualOutput, `${viewport.name}.png`),
      scale: "css",
    });
  });
}
