module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    semi: [2, "never"],
    '@typescript-eslint/no-use-before-define': "off" ,
    '@typescript-eslint/no-unused-vars': ["error", { "argsIgnorePattern": "^_" }] ,
    '@typescript-eslint/member-delimiter-style': [
      2,
      {
        "multiline": {
          "delimiter": "none",
          "requireLast": true
        },
        "singleline": {
          "delimiter": "semi",
          "requireLast": false
        }
      }
    ],
  }
};