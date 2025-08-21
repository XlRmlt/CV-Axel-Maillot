const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { execSync } = require('child_process');

// Helpers : lit la sortie d'une commande Git, sinon renvoie un fallback
const git = (cmd, fallback = '') => {
  try { return execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); }
  catch { return fallback; }
};

const BRANCH = git('git rev-parse --abbrev-ref HEAD', 'dev');
const COMMITHASH = git('git rev-parse --short HEAD', '');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    // Injecte des constantes globales utilisables dans le code
    new webpack.DefinePlugin({
      BRANCH: JSON.stringify(BRANCH),
      COMMITHASH: JSON.stringify(COMMITHASH),
    }),
  ],
  devServer: {
    static: { directory: path.join(__dirname, 'public') },
    hot: true,
    port: 3000,
  },
};