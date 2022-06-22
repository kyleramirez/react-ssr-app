import React from 'react';
import Application from './Application'

const Html = ({ manifest, ...props }) => {
  return (
    <html>
      <head></head>
      <body>
        <div id="react-root" data-react-props={JSON.stringify(props)}>
          <Application {...props} />
        </div>
        <script type="text/javascript" src={manifest['application.js']}></script>
      </body>
    </html>
  );
};

export default Html;
