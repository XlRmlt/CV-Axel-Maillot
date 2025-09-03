// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { execSync } = require('child_process');

const safe = (cmd, fb = '') => { try { return execSync(cmd, { stdio: ['ignore','pipe','ignore'] }).toString().trim(); } catch { return fb; } };

module.exports = (_env, argv) => {
  const mode = argv.mode || 'production';
  const isProd = mode === 'production';
  const repoName = 'CV-Axel-Maillot';

  // --- infos git / ci
  const BRANCH = process.env.GITHUB_REF_NAME || safe('git rev-parse --abbrev-ref HEAD', 'local');
  const SHA7   = (process.env.GITHUB_SHA || safe('git rev-parse --short HEAD', '')).slice(0,7) || 'dev';

  // --- version: priorité aux tags GitHub → git local → package.json
  const pkg = require('./package.json');
  const ghTag   = process.env.GITHUB_REF_TYPE === 'tag' ? (process.env.GITHUB_REF_NAME || '') : '';
  const tagNorm = ghTag.replace(/^v/i, '');                           // "v1.0.0" -> "1.0.0"
  const gitTag  = safe('git describe --tags --abbrev=0', '').replace(/^v/i,''); // si tu buildes localement sur un tag
  const VERSION = (isProd && (tagNorm || gitTag)) || pkg.version || '0.0.0';

  console.log(`[webpack] mode=${mode} isProd=${isProd} version=${VERSION}`);

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
        IS_PROD: JSON.stringify(isProd),
        VERSION: JSON.stringify(VERSION),
        BRANCH: JSON.stringify(BRANCH),
        COMMITHASH: JSON.stringify(SHA7),
        ASSET_PREFIX: JSON.stringify(isProd ? `/${repoName}/` : '/'),
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