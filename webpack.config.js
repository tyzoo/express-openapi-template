const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/toBundle.ts',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
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