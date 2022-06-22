
const Webpack = require('webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const path = require('path');
const publicPath = process.env.ASSET_HOST || '/';

const isProduction = process.env.NODE_ENV === 'production';

Webpack(
  {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
    entry: {
      application: './src/application.js',
    },
    plugins: [
      new WebpackManifestPlugin()
    ],
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
              ]
            }
          }
        }
      ]
    }
  },
  (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      process.exit(1);
      return;
    }
    const info = stats.toJson();
    if (stats.hasErrors()) {
      console.log('Finished running webpack with errors.');
      info.errors.forEach(e => console.error(e));
      process.exit(1);
    } else {
      console.log('Finished running webpack.');
    }
  }
);
