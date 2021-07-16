const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module:{ 
    rules: [
      { 
        test: /\.(gif|png|jpe?g|svg|xml)$/i,
        type: 'asset/resource',
     },
    ]
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
};
