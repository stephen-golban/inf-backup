module.exports = {
  root: true,
  plugins: ['prettier'],
  extends: ['@react-native', 'plugin:prettier/prettier'],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'react-native/no-inline-styles': 'off',
  },
};
