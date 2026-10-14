import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  // app.js, index.html and styles.css at the repo root are the preserved v1
  // static prototype, kept as the design reference named in README.md. They are
  // not part of the Next application and are also tagged on the v1 branch.
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "app.js"])
]);
