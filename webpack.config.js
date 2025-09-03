// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { execSync } = require('child_process');

const safe = (cmd, fb = '') => {
  try { return execSync(cmd, { stdio: ['ignore','pipe','ignore'] }).toString().trim(); }
  catch { return fb; }
};

module.exports = (_env, argv) => {
  const mode = argv.mode || 'production';
  const isProd = mode === 'production';
  const repoName = 'CV-Axel-Maillot';

  const GIT_BRANCH = process.env.GITHUB_REF_NAME || safe('git rev-parse --abbrev-ref HEAD','local');
  const GIT_SHA = (process.env.GITHUB_SHA || safe('git rev-parse --short HEAD','')).slice(0,7) || 'dev';

  console.log(`[webpack] mode=${mode} isProd=${isProd}`);

  return {
    entry: './src/index.tsx',
    mode,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProd ? 'assets/[name].[contenthash].js' : 'assets/[name].js',
      chunkFilename: isProd ? 'assets/[name].[contenthash].js' : 'assets/[name].js',
      publicPath: isProd ? `/${repoName}/` : '/',
      clean: true,
    },
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
        patterns: [{ from: 'public', to: '.', globOptions: { ignore: ['**/index.html'] } }]
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
      static: { directory: path.join(__dirname, 'public') },
      historyApiFallback: true,
      hot: true,
      port: 3000,
    },
  };
};