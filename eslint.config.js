// @ts-check

import pluginJs from "@eslint/js"
import stylisticJsx from "@stylistic/eslint-plugin-jsx"
import * as tsResolver from "eslint-import-resolver-typescript"
import * as pluginImport from "eslint-plugin-import-x"
import pluginReact from "eslint-plugin-react"
import * as pluginReactCompiler from "eslint-plugin-react-compiler"
import * as pluginReactHooks from "eslint-plugin-react-hooks"
import globals from "globals"
import * as tseslint from "typescript-eslint"

export default tseslint.config(
  // Project
  [
    {
      name: "projectConfig",
      files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
      languageOptions: {
        ecmaVersion: "latest",
        globals: globals.browser,
        sourceType: "module",
      },
    },
  ],
  // Import
  pluginImport.flatConfigs.recommended,
  pluginImport.flatConfigs.typescript,
  {
    settings: {
      "import-x/resolver": {
        name: "tsResolver",
        resolver: tsResolver,
        options: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      "import-x/consistent-type-specifier-style": ["warn", "prefer-top-level"],
      // For now, doesn't play nice with barrel files
      "import-x/export": "off",
      "import-x/first": "warn",
      "import-x/no-amd": "error",
      "import-x/no-commonjs": "error",
      "import-x/no-cycle": "error",
      "import-x/no-deprecated": "error",
      "import-x/no-extraneous-dependencies": "warn",
      "import-x/no-import-module-exports": "error",
      "import-x/no-mutable-exports": "error",
      "import-x/no-relative-packages": "error",
      "import-x/no-self-import": "error",
      "import-x/no-unassigned-import": "error",
      "import-x/no-unused-modules": "warn",
      "import-x/no-useless-path-segments": "warn",
      "import-x/unambiguous": "warn",
    },
  },
  // JS
  [
    pluginJs.configs.recommended,
    {
      name: "jsConfig",
      rules: {
        "arrow-body-style": "warn",
        eqeqeq: "error",
        "lines-between-class-members": "warn",
      },
    },
  ],
  // TS
  [
    tseslint.configs.strictTypeChecked,
    {
      name: "tsConfig",
      languageOptions: {
        parserOptions: {
          ecmaVersion: "latest",
          projectService: {
            allowDefaultProject: [
              "eslint.config.js",
              "prettier.config.js",
              "tailwind.config.ts",
            ],
          },
        },
        sourceType: "module",
      },
      rules: {
        "@typescript-eslint/consistent-type-definitions": "error",
        /** Stylistic. */
        "@typescript-eslint/member-ordering": "warn",
        /** A valid and useful type in some cases. */
        "@typescript-eslint/no-empty-object-type": "off",
        /** Explicit `any` to be used wisely and sparingly. */
        "@typescript-eslint/no-explicit-any": "off",
        /** Allow namespace declarations. */
        "@typescript-eslint/no-namespace": [
          "error",
          { allowDeclarations: true },
        ],
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
          { allowNumber: true },
        ],
      },
    },
  ],
  // React
  [
    pluginReact.configs.flat.recommended, // Plugin applied by the config
    pluginReact.configs.flat["jsx-runtime"], // Plugin applied by the config
    pluginReactCompiler.configs.recommended, // Plugin applied by the config
    { settings: { react: { version: "detect" } } },
    {
      name: "reactConfig",
      languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
      plugins: {
        "@stylistic/jsx": stylisticJsx,
        "react-hooks": pluginReactHooks,
      },
      rules: {
        ...pluginReact.configs.recommended.rules,
        ...pluginReactHooks.configs.recommended.rules,
        "@stylistic/jsx/jsx-self-closing-comp": "warn",
        "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "error",
        "react-compiler/react-compiler": "error",
      },
    },
  ],
)
