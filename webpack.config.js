const path = require('path');
const webpack = require('webpack');
const wasmPlugin = require('vscode-web-wasm-webpack-plugin');

const baseConfig = {
  mode: 'none',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },
  performance: {
    hints: false,
  },
  devtool: 'nosources-source-map',
  externals: {
    vscode: 'commonjs vscode',
  },
  experiments: {
    asyncWebAssembly: true,
  },
};

const webConfig = {
  ...baseConfig,
  target: 'webworker',
  entry: {
    'extension-web': './src/extension.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs',
    enabledWasmLoadingTypes: ['async-vscode'],
    wasmLoading: 'async-vscode',
  },
  resolve: {
    mainFields: ['browser', 'module', 'main'],
    extensions: ['.ts', '.js'],
    fallback: { path: require.resolve('path-browserify') },
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
    ],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1, // disable chunks by default since web extensions must be a single bundle
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new wasmPlugin.ReadFileVsCodeWebCompileAsyncWasmPlugin(),
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
};
module.exports = [webConfig, nodeConfig];
