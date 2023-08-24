module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'eslint-config-prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: {
    react: { version: '18.2' },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx'],
      },
    },
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react-hooks/exhaustive-deps': 'off', // Devs can figure out what to pass to useEffect.
    // NOT SURE NEEDED
    // Allow us to never have to import React
    // 'react/jsx-uses-react': 'off',
    // 'react/react-in-jsx-scope': 'off',
    // --------- OTHER RULES ---------

    // React fules
    'react/jsx-filename-extension': 'on', // We use the JSX extension
    'react/forbid-prop-types': 'off',
    'react/jsx-no-bind': 'on',
    'react/require-default-props': 'off',
    'react/jsx-fragments': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/no-unescaped-entities': 'on',
    'react/jsx-wrap-multilines': 'off',
    'react/jsx-props-no-spreading': 'off',

    // My rules
    'no-plusplus': 'on',
    'no-nested-ternary': 'on',
    'no-confusing-arrow': 'off', // I'll be the judge of that is confusing ;)
    'jsx-a11y/anchor-is-valid': 'off', // TODO: revisit
    'jsx-a11y/iframe-has-title': 'off',
    'no-return-await': 'off',
    'no-underscore-dangle': 'off',

    // handled by prettier
    indent: 'off',
    'object-curly-spacing': 'off',
    'comma-dangle': 'off',
    'object-curly-newline': 'off',
    'generator-star-spacing': 'off',
    'react/jsx-curly-newline': 'off',
    'function-paren-newline': 'off',
    'array-bracket-spacing': 'off',
    quotes: 'off',
    'space-before-function-paren': 'off',
    'react/jsx-indent': 'off',
    semi: 'off',

    // show as warnings
    'prefer-template': 'warn',
    'object-shorthand': 'warn',
    'react/jsx-boolean-value': 'warn',
    'react/jsx-curly-brace-presence': 'warn',
    'react/no-array-index-key': 'warn',
    'prefer-destructuring': 'warn',
    'react/destructuring-assignment': 'warn',
    'no-param-reassign': 'off', // TODO: turn this to "warn" after figuring out how to exclude slice files.
    'no-unused-vars': 'off', // disallow declaration of variables that are not used in the code
    'no-useless-computed-key': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'max-len': [
      2,
      {
        code: 80,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreTrailingComments: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignorePattern: '^import .*',
      },
    ], // specify the maximum length of a line in your program (off by default)
    // MUI
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@mui/*/*/*'],
      },
    ],
  },
};