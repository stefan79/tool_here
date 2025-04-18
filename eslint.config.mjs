import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import jestPlugin from "eslint-plugin-jest";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"] 
  },
  { 
    files: ["**/*.js"], 
    languageOptions: { sourceType: "commonjs" } 
  },
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    languageOptions: { globals: globals.node } 
  },
  { 
    files: ["**/*.test.js"],
    // Register the jest plugin properly
    plugins: { 
      jest: jestPlugin 
    },
    // Use the plugin's recommended config directly
    rules: {
      ...jestPlugin.configs.recommended.rules
    },
    languageOptions: { 
      globals: globals.jest 
    }
  }
]);