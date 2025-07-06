module.exports = [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: ["@next/eslint-plugin-next"],
    rules: {
      "no-unused-vars": "warn",
      "@next/next/no-html-link-for-pages": "off",
    },
  },
];
