import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["lib/main.ts", "lib/useFilter.ts"],
  sourcemap: true,
  clean: true,
  dts: true,
  minify: true,
  format: ["esm", "cjs"],
  external: ["hypercomp"],
});
