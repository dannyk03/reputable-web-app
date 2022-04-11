// lint-staged.config.js
module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'yarn workspace api tsc --noEmit',

  // Lint then format TypeScript and JavaScript files
  '**/*.(ts|tsx|js)': (filenames) => [
    //`yarn workspace backend eslint --fix ${filenames.join(' ')}`,
    `yarn workspace api prettier --write ${filenames.join(' ')}`,
  ],

  // Format MarkDown and JSON
  '**/*.(md|json)': (filenames) =>
    `yarn workspace api prettier --write ${filenames.join(' ')}`,
};
