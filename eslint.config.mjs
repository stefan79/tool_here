import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.node } },
  { files: ["**/*.test.js"], // Apply Jest settings to test files
    plugins: { jest: require("eslint-plugin-jest") },
    extends: ["plugin:jest/recommended"],
    languageOptions: { globals: globals.jest }
  }

]);