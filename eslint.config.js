export default [
  {
    files: ["**/*.{js,jsx}"],
    ignores: ["node_modules/**", "dist/**", ".husky/**"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        window: false,
        document: false,
        require: "readonly",
        module: "writable",
        process: "readonly",
        console: "readonly"
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
    },
    rules: {
      // Recommended cleanliness rules
      "no-console": "warn",
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "no-undef": "error"
    }
  }
];
