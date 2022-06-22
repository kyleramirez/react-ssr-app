const Webpack = require('webpack');

const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const path = require('path');
const publicPath = process.env.ASSET_HOST || '/';

const common = {
  mode: 'production',
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
    publicPath
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
  console.log('Server rendering file compiled.');
});

serverCompiler.run(() => {
  console.log('Building server rendering file...');
  serverCompiler.close(() => {});
});

const frontendCompiler = Webpack({
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
}, () => {
  console.log('Front-end files compiled.');
});

frontendCompiler.run(() => {
  console.log('Building front-end files...');
  frontendCompiler.close(() => {});
});