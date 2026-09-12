import prettier from "eslint-config-prettier";
import path from "node:path";
import js from "@eslint/js";
import betterTailwind from "eslint-plugin-better-tailwindcss";
import svelte from "eslint-plugin-svelte";
import { defineConfig, includeIgnoreFile } from "eslint/config";
import globals from "globals";
import ts from "typescript-eslint";

const gitignorePath = path.resolve(import.meta.dirname, ".gitignore");

const tailwindRules = {
	"better-tailwindcss/no-duplicate-classes": "error",
	"better-tailwindcss/no-deprecated-classes": "error",
	"better-tailwindcss/enforce-consistent-variable-syntax": "warn",
	"better-tailwindcss/enforce-canonical-classes": "warn",
	"better-tailwindcss/enforce-shorthand-classes": "warn"
};

const tailwindSettings = {
	"better-tailwindcss": {
		cwd: process.cwd()
	}
};

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	ts.configs.recommended,
	svelte.configs.recommended,
	prettier,
	svelte.configs.prettier,
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			"no-undef": "off",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					varsIgnorePattern: "^_",
					argsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_"
				}
			]
		}
	},
	{
		files: ["**/*.ts", "**/*.tsx"],
		plugins: { "better-tailwindcss": betterTailwind },
		rules: tailwindRules,
		settings: tailwindSettings
	},
	{
		files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
		plugins: { "better-tailwindcss": betterTailwind },
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: [".svelte"],
				parser: ts.parser
			}
		},
		rules: tailwindRules,
		settings: tailwindSettings
	}
);
