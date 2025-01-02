// @ts-check

import pluginJs from "@eslint/js"
import stylisticJsx from "@stylistic/eslint-plugin-jsx"
import pluginImportX from "eslint-plugin-import-x"
import pluginReact from "eslint-plugin-react"
import pluginReactCompiler from "eslint-plugin-react-compiler"
import pluginReactHooks from "eslint-plugin-react-hooks"
import globals from "globals"
import tseslint from "typescript-eslint"

/**
 * Applies the following basic settings:
 *
 * 1. Files: `["**\/*.{js,mjs,cjs,ts,jsx,tsx}"]`
 * 2. LanguageOptions: `{ globals: globals.browser }`
 *
 * @type {import("eslint").Linter.Config}
 */
const projectConfig = {
  name: "my-components/eslint/project",
  files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  languageOptions: {
    ecmaVersion: "latest",
    globals: globals.browser,
    sourceType: "module",
  },
}

/** @type {import("eslint").Linter.Config} */
const importConfig = {
  name: "my-components/eslint/import",
  // @ts-expect-error
  plugins: {
    ...(pluginImportX.flatConfigs.recommended.plugins ?? {}),
  },
  rules: {
    "import-x/consistent-type-specifier-style": ["error", "prefer-top-level"],
    "import-x/first": "error",
    "import-x/no-commonjs": "error",
    "import-x/no-cycle": "error",
    "import-x/no-duplicates": "error",
  },
}

/** @type {import("eslint").Linter.Config} */
const jsConfig = {
  name: "my-components/eslint/js",
  rules: {
    ...pluginJs.configs.recommended.rules,
    "arrow-body-style": "warn",
    eqeqeq: "error",
    "lines-between-class-members": "warn",
  },
}

/** @type {import("eslint").Linter.Config} */
const tsConfig = {
  name: "my-components/eslint/ts",
  languageOptions: {
    // @ts-expect-error
    parser: tseslint.parser,
    parserOptions: {
      ecmaVersion: "latest",
      parser: tseslint.parser,
      projectService: {
        allowDefaultProject: [
          "eslint.config.js",
          "prettier.config.js",
          "tailwind.config.ts",
          "vite.config.ts",
          "vitest.config.ts",
        ],
      },
    },
    sourceType: "module",
  },
  plugins: {
    // @ts-expect-error
    "@typescript-eslint": tseslint.plugin,
  },
  // @ts-expect-error
  rules: {
    ...tseslint.configs.strictTypeChecked.reduce((a, b) => {
      for (const [rule, config] of Object.entries(b.rules ?? {})) {
        if (config !== undefined) {
          a[rule] = config
        }
      }

      return a
    }, {}),
    /** Stylistic. */
    "@typescript-eslint/member-ordering": "warn",
    /** A valid and useful type in some cases. */
    "@typescript-eslint/no-empty-object-type": "off",
    /** Explicit `any` to be used wisely and sparingly. */
    "@typescript-eslint/no-explicit-any": "off",
    /** Allow namespace declarations. */
    "@typescript-eslint/no-namespace": ["error", { allowDeclarations: true }],
    /** Next five prevent use of the explicit `any` escape hatches. */
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-shadow": ["warn", { allow: ["_"] }],
    /** Strings and numbers allowed in template expressions. */
    "@typescript-eslint/restrict-template-expressions": [
      "error",
      {
        allowNumber: true,
      },
    ],
  },
}

/** @type {import("eslint").Linter.Config} */
const reactConfig = {
  name: "my-components/eslint/react",
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: {
    "@stylistic/jsx": stylisticJsx,
    react: pluginReact,
    // @ts-expect-error
    "react-hooks": pluginReactHooks,
    // @ts-expect-error
    "react-compiler": pluginReactCompiler,
  },
  // @ts-expect-error
  rules: {
    ...pluginReact.configs.recommended.rules,
    ...pluginReactHooks.configs.recommended.rules,
    "@stylistic/jsx/jsx-self-closing-comp": "warn",
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".tsx"],
      },
    ],
    "react-hooks/exhaustive-deps": [
      "error",
      {
        additionalHooks: "(useDepsChange|useMemoStable)",
      },
    ],
    "react-compiler/react-compiler": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}

/** @type {import("eslint").Linter.Config[]} */
export default [projectConfig, importConfig, jsConfig, tsConfig, reactConfig]
