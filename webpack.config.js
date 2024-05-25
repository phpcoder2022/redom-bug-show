const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => ({
  entry: {
    index: './src/index.js',
  },
  output: {
    publicPath: '/',
    filename: '[name].[contenthash].js',
    clean: true,
  },
  devtool: env.production ? 'source-map' : 'eval-cheap-module-source-map',
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
    watchFiles: ['src/**/*'],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|avif|webp|svg|ttf|woff2?)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Demonstrate',
      favicon: './src/img/github-icon.svg',
    }),
  ],
});
