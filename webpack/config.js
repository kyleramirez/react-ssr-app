const Webpack = require('webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path');
const publicPath = process.env.ASSET_HOST || '/';
const production = process.env.NODE_ENV === 'production';

let entryApplication = './src/application';
let plugins = [new WebpackManifestPlugin({ writeToFileEmit: true })];
let babelPlugins = [];
if (!production) {
  entryApplication = ['webpack-hot-middleware/client', entryApplication];
  plugins = [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NoEmitOnErrorsPlugin(),
    new ReactRefreshWebpackPlugin(),
    ...plugins
  ];
  babelPlugins.push('react-refresh/babel');
}

module.exports = {
  mode: production ? 'production' : 'development',
  watch: !production,
  watchOptions: {
    ignored: /node_modules/
  },
  devtool: production ? 'source-map' : 'cheap-module-source-map',
  entry: {
    application: entryApplication,
  },
  plugins,
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name]-[contenthash].js',
    publicPath,
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ["react-app", { "runtime": "automatic" }]
            ],
            plugins: babelPlugins
          }
        }
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, '../src'), 'node_modules']
  }
};
