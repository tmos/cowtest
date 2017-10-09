module.exports = {
  parser: 'babel-eslint',
  plugins: ['flowtype'],
  extends: ['airbnb-base', 'plugin:flowtype/recommended'],
  rules: {
    'no-console': 0
  },
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: true,
    },
  },
};
