import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // Disable unused variables check
      "@typescript-eslint/no-explicit-any": "off", // Allow 'any' type
      "react-hooks/rules-of-hooks": "error", // Keep this strict to avoid issues
      "no-var": "off", // Disable the no-var rule
    },
  },
];

export default eslintConfig;
