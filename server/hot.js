const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../webpack/config');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

let firstRun = false;
const enableHotModuleReplacement = app => {
  const webpackCompiler = webpack(
    webpackConfig,
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
        if (firstRun) {
          // Reloads files for server rendering update
          const srcDir = path.resolve(__dirname, '../src');
          const renderFile = require.resolve('./render');
          Object.keys(require.cache).forEach(function(key) {
            if (key.includes(srcDir) || key.includes(renderFile)) {
              delete require.cache[key];
            }
          });
        } else {
          firstRun = true;
        }
        console.log('Finished compiling webpack.');
      }
    }
  );
  const middleware = webpackMiddleware(webpackCompiler, {});
  app.use(middleware);
  app.use(webpackHotMiddleware(webpackCompiler));
}

module.exports = enableHotModuleReplacement;
