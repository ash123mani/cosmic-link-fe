const HtmlWebpackPlugin = require('html-webpack-plugin')
const { join, resolve } = require('path')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'

// TODO: add chaching
module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  context: resolve('src'),
  entry: {
    app: ['./polyfills', './index.js'],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.jsx?$/,
        include: join(__dirname, 'src'),
        use: ['babel-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new ESLintPlugin(),
    isDevelopment && new ReactRefreshPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src', 'index.html'),
    }),
  ].filter(Boolean),
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@common': resolve(__dirname, 'src/common/'),
      '@helpers': resolve(__dirname, 'src/helpers/'),
      '@local': resolve(__dirname, 'src/components/'),
      '@pages': resolve(__dirname, 'src/pages/'),
      '@store': resolve(__dirname, 'src/store/'),
      '@state': resolve(__dirname, 'src/state/'),
      '@api': resolve(__dirname, 'src/api/'),
      '@util': resolve(__dirname, 'src/util/'),
      '@hooks': resolve(__dirname, 'src/hooks/'),
      '@images': resolve(__dirname, 'src/images/'),
    },
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    allowedHosts: 'all', // remove this later
  },
}
