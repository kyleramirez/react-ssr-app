## To run the Webpack dev server locally ...
    npm run start:webpack
    npm run start:server

## To run the production build
    npm run build:production
    npm start
The Webpack generated files are served from the `/public` directory, but in a production environment, it would be better to serve these files from a static site. Use the `ASSET_HOST` environment variable to set this:

    ASSET_HOST=https://assets.mysite.org/assets/ npm run build:production
Then once the assets are compiled, copy the files over to this static resource. Even easier would be to use a Cloudfront distribution that points back to these files.

## Features
- MacOS / Windows / Linux support
- React server-side rendering



- side effects
- real demonstrated streaming
- HMR / React Fast Refresh
