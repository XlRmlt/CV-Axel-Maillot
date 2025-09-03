const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { execSync } = require('child_process');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const safe = (cmd, fb = '') => {
  try { return execSync(cmd, { stdio: ['ignore','pipe','ignore'] }).toString().trim(); }
  catch { return fb; }
};

const GIT_BRANCH = process.env.GITHUB_REF_NAME || safe('git rev-parse --abbrev-ref HEAD', 'local');
const GIT_SHA    = (process.env.GITHUB_SHA || safe('git rev-parse --short HEAD', '')).slice(0, 7) || 'dev';
const isProd = process.env.NODE_ENV === 'production';
const repoName = 'CV-Axel-Maillot';

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProd ? 'assets/[name].[contenthash].js' : 'assets/[name].js',
    chunkFilename: isProd ? 'assets/[name].[contenthash].js' : 'assets/[name].js',
    publicPath: isProd ? `/prod/` : '/dev/',
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
      ASSET_PREFIX: JSON.stringify(isProd ? `/${repoName}/` : '/'),
      BRANCH: JSON.stringify(GIT_BRANCH),
      COMMITHASH: JSON.stringify(GIT_SHA),
      'process.env.TURNSTILE_SITE_KEY': JSON.stringify(process.env.TURNSTILE_SITE_KEY || '')
    }),
  ],
  optimization: { splitChunks: { chunks: 'all' }, runtimeChunk: 'single' },
  devServer: {
    static: { directory: path.join(__dirname, 'public'), publicPath: '/' },
    devMiddleware: { publicPath: '/' },
    historyApiFallback: true,
    hot: true,
    port: 3000,
  },
};