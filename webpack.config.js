const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { execSync } = require('child_process');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const git = (cmd, fallback = '') => {
  try { return execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); }
  catch { return fallback; }
};

const BRANCH = git('git rev-parse --abbrev-ref HEAD', 'dev');
const COMMITHASH = git('git rev-parse --short HEAD', '');
const isProd = process.env.NODE_ENV === 'production';

const repoName = 'CV-Axel-Maillot';

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProd ? 'assets/[name].[contenthash].js' : 'assets/[name].js',
    chunkFilename: isProd ? 'assets/[name].[contenthash].js' : 'assets/[name].js',
    publicPath: 'auto',
    clean: true
  },
  mode: isProd ? 'production' : 'development',
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
    ],
  },
  resolve: { extensions: ['.tsx', '.ts', '.js', '.css'] },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: '.', globOptions: { ignore: ['**/index.html'] } }
      ]
    }),
    new webpack.DefinePlugin({
      BRANCH: JSON.stringify(BRANCH),
      COMMITHASH: JSON.stringify(COMMITHASH),
      'process.env.TURNSTILE_SITE_KEY': JSON.stringify(process.env.TURNSTILE_SITE_KEY || '')
    }),
  ],
  optimization: { splitChunks: { chunks: 'all' }, runtimeChunk: 'single' },
  devServer: {
    static: { directory: path.join(__dirname, 'public') },
    historyApiFallback: true,
    hot: true,
    port: 3000,
  },
};