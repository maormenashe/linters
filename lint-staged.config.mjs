export default {
  '*.{js,jsx,ts,tsx,md,html,css,scss,yml}': [
    'npx prettier --write',
    'eslint --fix',
    'npx stylelint --fix',
  ],
};
