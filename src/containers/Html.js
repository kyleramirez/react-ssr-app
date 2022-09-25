import React from 'react';
import Application from './Application'
import DocumentTitle from '../ui/DocumentTitle';

const Html = ({ manifest, ...props }) => {
  const render = <Application {...props} />;
  console.log(DocumentTitle.rewind());
  return (
    <html>
      <head></head>
      <body>
        <div id="react-root" data-react-props={JSON.stringify(props)}>
          
        </div>
        <script type="text/javascript" src={manifest['application.js']}></script>
      </body>
    </html>
  );
};

export default Html;
