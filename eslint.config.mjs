import globals from 'globals';
import pluginJs from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: [
      // '**/dev/*',
      '**/dist/*',
      '**/node_modules/*',
      // '**/tests/*',
      // 'tsconfig.json',
    ],
  },
  { files: ['**/*.js'], languageOptions: { sourceType: 'script' } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    plugins: { prettier },
    rules: {
      semi: ['error', 'always'],
      indent: ['error', 2],
      quotes: ['error', 'single'],
      'no-extra-semi': 'error',
      'no-unused-vars': 'error',
      'no-debugger': 'warn',
      'no-console': 'warn',
      'no-mixed-spaces-and-tabs': 'error',
      'prefer-const': 'error',
      eqeqeq: 'error',
      'no-var': 'error',
      'prefer-template': 'error',
      'no-eval': 'error',
      'no-new-func': 'error',
      'no-throw-literal': 'error',
      'comma-dangle': ['error', 'always-multiline'],
      'no-trailing-spaces': 'error',
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': 'error',
      'no-duplicate-imports': 'error',
      'no-useless-computed-key': 'error',
      'linebreak-style': ['error', 'unix'],
      'no-async-promise-executor': 'error',
      'no-floating-decimal': 'error',
      'no-multi-spaces': 'error',
      'no-this-before-super': 'error',
      'no-multiple-empty-lines': ['error', { max: 2 }],
      'no-useless-constructor': 'error',
      'prefer-rest-params': 'error',
      'no-dupe-class-members': 'error',
      'no-empty-function': 'error',
      'consistent-return': 'error',
    },
  },
  configPrettier,
];
