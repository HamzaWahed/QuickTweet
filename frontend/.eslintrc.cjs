module.exports = ***REMOVED***
  root: true,
  env: ***REMOVED*** browser: true, es2020: true ***REMOVED***,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
***REMOVED***
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: ***REMOVED***
    'react-refresh/only-export-components': [
      'warn',
      ***REMOVED*** allowConstantExport: true ***REMOVED***,
  ***REMOVED***
    '@typescript-eslint/no-explicit-any': 'off',
    "react-hooks/exhaustive-deps": "off"
***REMOVED***
***REMOVED***
