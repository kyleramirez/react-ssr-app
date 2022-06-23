const babelRegister = require('@babel/register');
babelRegister({
  ignore: [/[\\/](build|server\/server|node_modules)[\\/]/],
  presets: [['react-app', { runtime: 'automatic', useESModules: false }]],
  plugins: [
    '@babel/transform-modules-commonjs'
  ]
});
const production = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;
const { readFileSync } = require('fs');
const path = require('path');
const express = require('express');
const compress = require('compression');

let manifest;
if (production) {
  manifest = JSON.parse(readFileSync(path.resolve(__dirname, '../build/manifest.json')));
}

const handleErrors = fn => async (req, res, next) => {
  try {
    return await fn(req, res)
  } catch (error) {
    next(error);
  }
};

const waitForWebpack = async () => {
  while(true) {
    try {
      return JSON.parse(readFileSync(path.resolve(__dirname, '../build/manifest.json')));
    } catch (err) {
      console.log('Waiting for webpack ...');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
};

const app = express();
app.use(compress());
if (!production) {
  const enableHotModuleReplacement = require('./hot');
  enableHotModuleReplacement(app);
}
app.get('/', handleErrors(async (req, res) => {
  if (!production) {
    manifest = await waitForWebpack();
  }
  require('./render')(req.url, res, manifest);
}));
app.use(express.static('build'));
app.listen(PORT, () => { console.log(`Listening at ${PORT}...`); })
