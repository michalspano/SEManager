/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
  ],
  env: {
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  // Workaround to prevent false positive error "eslint (vue/comment-directive)" in plain HTML:
  // https://github.com/vuejs/eslint-plugin-vue/issues/1355#issuecomment-735557202
  overrides: [
    {
      files: ['*.html'],
      processor: 'vue/.vue'
    }
  ],
  rules: {
    'space-before-function-paren': [2, { anonymous: 'always', named: 'never' }],
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/multi-word-component-names': 'off',
    // disable unused vars rule in both JS and Vue files, this is to avoid errors,
    // such as having '_' as an unused var in Vue files.
    'no-unused-vars': 'off',
    'vue/no-unused-vars': 'off',
    // Our computed properties are not pure functions, so we need to disable this rule.
    // This enables us to compute Graph-like data structures to represent the course interdependencies.
    'vue/no-side-effects-in-computed-properties': 'off'
  },
  // Ignore the dist build folder
  ignorePatterns: ['dist/']
}
