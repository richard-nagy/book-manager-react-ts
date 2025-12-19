import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
    {
        ignores: ["dist", "*.cjs", ".eslintrc.cjs"],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["**/*.{ts,tsx}"],
        plugins: {
            react,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],
            "no-console": ["error", { allow: ["warn", "error"] }],
            "react/jsx-key": "error",
            "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0, maxBOF: 0 }],
            eqeqeq: ["error", "always"],
            "default-case": "error",
            "dot-notation": "error",
            camelcase: ["error", { properties: "always" }],
            semi: "error",
            "prefer-const": "error",
        },
    },
    eslintConfigPrettier
);