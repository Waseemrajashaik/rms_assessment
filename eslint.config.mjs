import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tanstackQuery from "@tanstack/eslint-plugin-query";
import packageJson from "eslint-plugin-package-json";
import jestPlugin from "eslint-plugin-jest";
import perfectionist from "eslint-plugin-perfectionist";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    ignorePatterns: [
      "node_modules/",
      "dist/",
      "build/",
      ".next/",
      ".lintstagedrc.js",
      "*.d.ts",
      "public/",
      "coverage/",
    ],
  }),
  perfectionist.configs["recommended-natural"],
  packageJson.configs.recommended,
  ...tanstackQuery.configs["flat/recommended"],
  {
    files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
    ...jestPlugin.configs["flat/recommended"],
    rules: {
      ...jestPlugin.configs["flat/recommended"].rules,
    },
  },
]

export default eslintConfig;
