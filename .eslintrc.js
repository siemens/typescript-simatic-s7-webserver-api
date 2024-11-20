module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'eslint:recommended',
    'semistandard',
    'plugin:@typescript-eslint/recommended' // TypeScript-specific rules
  ],
  plugins: ['@typescript-eslint'], // Specifies the ESLint plugin for TypeScript
  rules: {

    quotes: ['error', 'single'], // Use single quotes
    semi: ['error', 'always'], // Enforce semicolons
    'no-multiple-empty-lines': ['error', { max: 1 }], // Allow at most one empty line
    'padded-blocks': ['off'], // Turn off padding for blocks
    'object-curly-spacing': ['error', 'always'], // Require space inside curly braces
    camelcase: ['off'], // Turn off camelcase checks
    'prefer-const': ['error'], // Require const for variables that are never reassigned
    'no-trailing-spaces': ['error'], // Disallow trailing spaces
    'keyword-spacing': ['error', { before: true, after: true }], // Enforce spacing around keywords
    'eol-last': ['error', 'always'], // Require newline at the end of files
     "@typescript-eslint/no-explicit-any": "off"

  }
};
