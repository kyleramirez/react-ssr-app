const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const path = require('path');
const publicPath = process.env.ASSET_HOST || '/';

const common = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, '../public'),
    publicPath,
    clean: true,
  },
}

const serverCompiler = Webpack({
  ...common,
  watch: true,
  target: 'node',
  entry: {
    server_rendering: './src/server_rendering.js',
  },
  output: {
    ...common.output,
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
}, () => {
  console.log('Server rendering file compiled');
});

serverCompiler.watch(true, () => {
  console.log('Watching server rendering file');
});

const server = new WebpackDevServer({
  static: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
}, Webpack({
  ...common,
  entry: {
    application: './src/application.js',
  },
  plugins: [
    new WebpackManifestPlugin({
      writeToFileEmit: true
    })
  ],
  output: {
    ...common.output,
    filename: '[name]-[contenthash].js'
  }
}));

server.start();
