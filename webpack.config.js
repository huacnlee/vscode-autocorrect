const path = require('path');
const webpack = require('webpack');

const baseConfig = {
  mode: 'none',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },
  experiments: {
    asyncWebAssembly: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.wasm$/,
        type: 'webassembly/async',
      },
    ],
  },
  // devtool: 'nosources-source-map',
  externals: {
    vscode: 'commonjs vscode',
  },
};

const webConfig = {
  ...baseConfig,
  target: 'webworker',
  entry: {
    'extension-web': './src/extension.ts',
  },
  resolve: {
    mainFields: ['browser', 'module', 'main'],
    extensions: ['.ts', '.js'],
    fallback: { path: require.resolve('path-browserify') },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};

const nodeConfig = {
  ...baseConfig,
  target: 'node',
  entry: {
    'extension-node': './src/extension.ts',
  },
  resolve: {
    mainFields: ['module', 'main'],
    extensions: ['.ts', '.js'],
  },
};
module.exports = [webConfig, nodeConfig];
