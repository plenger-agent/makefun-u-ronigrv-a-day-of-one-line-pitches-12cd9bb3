// A Day of One-Line Pitches — entry program.
//
// Writes the one-sentence pitch to entry.txt in the output directory.
// The pitch speaks to a friend who has never coded: it names the app idea
// they already carry around, keeps the words plain, and makes saying yes
// feel easy — no code from them, just watching a first version appear.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PITCH =
  "That app idea you keep describing at dinner — say it in plain words on make.fun and an AI agent builds a first version you can tap through tonight, no code from you, just watching it take shape and pointing at what to fix.";

function outputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

// Empty the output directory's contents so a re-run never leaves stale
// files behind. The directory itself is a mount point in the grader and
// must never be removed — only what is inside it.
function clearContents(dir: string): void {
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function main(): void {
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  clearContents(dir);
  writeFileSync(join(dir, "entry.txt"), PITCH + "\n", "utf8");
}

main();
