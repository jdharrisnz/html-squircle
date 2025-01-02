/** @type {import("prettier").Config} */
export default {
  plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-jsdoc"],
  experimentalTernaries: true,
  printWidth: 80,
  proseWrap: "always",
  semi: false,
  singleAttributePerLine: true,
  tabWidth: 2,
  trailingComma: "all",

  // Import sort options
  importOrder: [
    "",
    "^react$", // React
    "<BUILTIN_MODULES>", // Node.js built-in modules
    "<THIRD_PARTY_MODULES>", // Imports not matched by other special words or groups
    "",
    "^@/", // Local imports via path aliases
    "^[.]", // Relative imports
    "",
    "<TYPES>^(node:)", // Types from node
    "<TYPES>", // Third-party types
    "",
    "<TYPES>^@/", // Local types via path aliases
    "<TYPES>^[.]", // Relative types
    "",
    ".module.(c|sc|le)ss$", // CSS modules
  ],
  importOrderCaseSensitive: true,
  importOrderTypeScriptVersion: "5.0.0",
}
