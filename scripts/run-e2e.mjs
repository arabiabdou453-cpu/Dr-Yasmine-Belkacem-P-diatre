import { spawn, spawnSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const server = spawn(
  process.execPath,
  [path.join(root, "node_modules", "next", "dist", "bin", "next"), "start", "-p", "3100"],
  { cwd: root, stdio: "ignore", windowsHide: true },
);
server.unref();

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(`Next.js production server exited early with code ${server.exitCode}.`);
    }
    try {
      const response = await fetch("http://127.0.0.1:3100");
      if (response.ok) return;
    } catch {
      // The production server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Next.js production server did not become ready on port 3100.");
}

function stopServer() {
  if (server.pid === undefined) return;
  if (process.platform === "win32") {
    spawnSync("taskkill", ["/pid", String(server.pid), "/T", "/F"], { stdio: "ignore" });
  } else {
    server.kill("SIGTERM");
  }
}

try {
  await waitForServer();
  const playwright = spawn(
    process.execPath,
    [
      path.join(root, "node_modules", "@playwright", "test", "cli.js"),
      "test",
      ...process.argv.slice(2),
    ],
    { cwd: root, env: process.env, stdio: "inherit", windowsHide: true },
  );
  const exitCode = await new Promise((resolve) => playwright.once("exit", resolve));
  process.exitCode = typeof exitCode === "number" ? exitCode : 1;
} finally {
  stopServer();
}
