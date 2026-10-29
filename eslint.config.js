const getTscLintingConfig = require('eslint-config-techsmith');
const globals = require('globals');

module.exports = [
   ...getTscLintingConfig(['dist/**', 'node_modules/**'], globals.browser),
   {
      rules: {
         'no-confusing-arrow': 'off',
         'no-return-assign': 'off',
         'linebreak-style': 'off',
         'arrow-parens': 'off',
         '@stylistic/arrow-parens': 'off',
         'arrow-body-style': 'off',
         'no-bitwise': 'off',
         'no-mixed-operators': 'off',
         '@stylistic/no-mixed-operators': 'off',
         '@stylistic/no-floating-decimal': 'off',
         'prefer-arrow/prefer-arrow-functions': 'off',
         'no-magic-numbers': 'off'
      }
   }
];
