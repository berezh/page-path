import typescript from "@rollup/plugin-typescript";
/* eslint-disable import/no-default-export */
import { obfuscator } from "rollup-obfuscator";

import pkg from "./package.json";

const plugins = [typescript()];

if (process.env.BUILD !== "dev") {
  plugins.push(obfuscator());
}

const output = [
  { file: pkg.main, format: "cjs" },
  { file: pkg.module, format: "esm" },
];

export default [
  {
    input: "src/index.ts",
    dest: "index.js",
    external: Object.keys(pkg.peerDependencies || {}),
    plugins,
    output,
  },
];
