const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/toBundle.ts',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
      new CopyWebpackPlugin({
        patterns: [{
          from: 'public/css/*.css',
          to: '../../dist'
        },{
          from: 'public/js/*.js',
          to: '../../dist'
        }]
      }),
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      fallback: {
        "buffer": require.resolve("buffer")
      }
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public', 'js'),
    },
};