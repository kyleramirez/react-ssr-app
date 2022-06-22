import React from 'react';
import Application from './containers/Application';

import { renderToStaticMarkup } from 'react-dom/server';
const Root = ({ manifest }) => {

  const firstRender = renderToStaticMarkup(<Application />);
  return (
    <html>
      <head></head>
      <body>
        <div id="react-root" dangerouslySetInnerHTML={{ __html: firstRender }} />
        <script type="text/javascript" src={manifest['application.js']}></script>
      </body>
    </html>
  );
}

export default Root;
