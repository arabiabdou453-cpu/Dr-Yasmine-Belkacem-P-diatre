import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { PNG } from "pngjs";

const expectedReference = {
  hash: "D300BEA2043AA55D7E2FBF1868650180B0551B3FC1EBD4E3267468B1833A73EB",
  height: 1203,
  width: 1308,
};

const defaultReference =
  "C:\\Users\\genious pc\\Downloads\\ChatGPT Image 27 juil. 2026, 04_07_40.png";
const outputDirectory = path.join(process.cwd(), "test-results", "visual");
const referencePath = process.env.REFERENCE_IMAGE ?? defaultReference;
const actualPath = process.env.ACTUAL_IMAGE ?? path.join(outputDirectory, "desktop-1308x1203.png");

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex").toUpperCase();
}

function assertExpectedReference(buffer, image) {
  const hash = sha256(buffer);
  if (hash !== expectedReference.hash) {
    throw new Error(
      `Reference SHA-256 changed: expected ${expectedReference.hash}, received ${hash}`,
    );
  }
  if (image.width !== expectedReference.width || image.height !== expectedReference.height) {
    throw new Error(
      `Reference dimensions changed: expected ${expectedReference.width}x${expectedReference.height}, received ${image.width}x${image.height}`,
    );
  }
}

function assertMatchingDimensions(reference, actual) {
  if (reference.width !== actual.width || reference.height !== actual.height) {
    throw new Error(
      `Implementation dimensions ${actual.width}x${actual.height} do not match reference ${reference.width}x${reference.height}; adjust the viewport/page instead of resizing either image.`,
    );
  }
}

function comparePixels(reference, actual) {
  const diff = new PNG({ height: reference.height, width: reference.width });
  const bounds = {
    maxX: -1,
    maxY: -1,
    minX: reference.width,
    minY: reference.height,
  };
  let differentPixels = 0;

  for (let y = 0; y < reference.height; y += 1) {
    for (let x = 0; x < reference.width; x += 1) {
      const offset = (y * reference.width + x) * 4;
      const differs =
        reference.data[offset] !== actual.data[offset] ||
        reference.data[offset + 1] !== actual.data[offset + 1] ||
        reference.data[offset + 2] !== actual.data[offset + 2] ||
        reference.data[offset + 3] !== actual.data[offset + 3];

      if (differs) {
        differentPixels += 1;
        bounds.minX = Math.min(bounds.minX, x);
        bounds.minY = Math.min(bounds.minY, y);
        bounds.maxX = Math.max(bounds.maxX, x);
        bounds.maxY = Math.max(bounds.maxY, y);
        diff.data[offset] = 255;
        diff.data[offset + 1] = 0;
        diff.data[offset + 2] = 90;
        diff.data[offset + 3] = 255;
      } else {
        const gray = Math.round(
          reference.data[offset] * 0.2126 +
            reference.data[offset + 1] * 0.7152 +
            reference.data[offset + 2] * 0.0722,
        );
        diff.data[offset] = gray;
        diff.data[offset + 1] = gray;
        diff.data[offset + 2] = gray;
        diff.data[offset + 3] = 64;
      }
    }
  }

  const totalPixels = reference.width * reference.height;
  return {
    diff,
    metrics: {
      affectedBounds:
        differentPixels === 0
          ? null
          : {
              height: bounds.maxY - bounds.minY + 1,
              maxX: bounds.maxX,
              maxY: bounds.maxY,
              minX: bounds.minX,
              minY: bounds.minY,
              width: bounds.maxX - bounds.minX + 1,
            },
      actual: {
        height: actual.height,
        path: actualPath,
        width: actual.width,
      },
      differencePercentage: Number(((differentPixels / totalPixels) * 100).toFixed(6)),
      differentPixels,
      reference: {
        format: "PNG",
        hash: expectedReference.hash,
        height: reference.height,
        path: referencePath,
        width: reference.width,
      },
      totalPixels,
    },
  };
}

async function main() {
  const [referenceBuffer, actualBuffer] = await Promise.all([
    readFile(referencePath),
    readFile(actualPath),
  ]);
  const reference = PNG.sync.read(referenceBuffer);
  const actual = PNG.sync.read(actualBuffer);

  assertExpectedReference(referenceBuffer, reference);
  assertMatchingDimensions(reference, actual);

  const { diff, metrics } = comparePixels(reference, actual);
  await mkdir(outputDirectory, { recursive: true });
  await Promise.all([
    writeFile(path.join(outputDirectory, "desktop-diff.png"), PNG.sync.write(diff)),
    writeFile(
      path.join(outputDirectory, "desktop-diff.json"),
      `${JSON.stringify(metrics, null, 2)}\n`,
      "utf8",
    ),
  ]);
  process.stdout.write(`${JSON.stringify(metrics, null, 2)}\n`);
}

await main();
