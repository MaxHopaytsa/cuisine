const path = require('node:path');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-proposal-export-namespace-from',
    [
      'module-resolver',
      {
        root: path.resolve('./'),
        alias: {
          '^shared/build(.+)': path.resolve(
            __dirname,
            '../shared/build/cjs/\\1',
          ),
          '^~(.+)': './src/\\1',
        },
      },
    ],
  ],
};
