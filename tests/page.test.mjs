import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

test("page contains the pediatric care sections", async () => {
  const source = await readFile(new URL("../src/app/page.tsx", import.meta.url), "utf8");
  const content = await readFile(new URL("../src/content/site-data.ts", import.meta.url), "utf8");
  const form = await readFile(
    new URL("../src/components/appointment-form.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /Yasmine Belkacem/);
  assert.match(source, /soins complets/);
  assert.match(source, /pour chaque enfant/);
  assert.match(source, /hero-pediatre\.png/);
  assert.match(content, /Suivi de croissance/);
  assert.match(form, /Réserver mon rendez-vous/);
  assert.match(source, /AppointmentForm/);
  assert.match(source, /Prendre RDV/);
  assert.match(source, /Prendre rendez-vous/);
  assert.match(source, /Nos coordonnées/);
  assert.match(source, /name="whatsapp"/);
  assert.match(source, /name="calendar"/);
  assert.match(content, /Urgences pédiatriques/);
  assert.match(form, /name="phone"/);
  assert.match(form, /Icon name="user"/);
});
