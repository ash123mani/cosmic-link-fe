const HtmlWebpackPlugin = require('html-webpack-plugin')
const { join, resolve } = require('path')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')
const Dotenv = require('dotenv-webpack');

const isDevelopment = process.env.NODE_ENV !== 'production'

// TODO: add chaching
// TODO: Add MiniCssExtractPlugin for splitting CSS out from the main application.
module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  context: resolve('src'),
  devtool: isDevelopment ? 'inline-source-map' : 'source-map',
  entry: {
    app: ['./polyfills', './index.js'],
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: resolve(__dirname, 'dist'),
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
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                isDevelopment && require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            },
          },
        ],
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
      manifest: resolve(__dirname, 'public', 'manifest.json'),
    }),
    new CopyPlugin({
      patterns: [
        { from: resolve(__dirname, 'public') },
      ],
    }),
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      swDest: 'sw.js',
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/.*\.(jpg|png|svg|jpeg|webp|gif|avif|apng)$/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'link-images',
            expiration: {
              maxAgeSeconds: 3600 * 24 * 10,
            },
          },
        },
      ],
    }),
    new Dotenv(),
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
    static: [{ directory: resolve(__dirname, 'public') }],
    devMiddleware: {
      writeToDisk: true,
    },
  },
}
