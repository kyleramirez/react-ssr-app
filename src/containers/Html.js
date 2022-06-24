import React from 'react';
import Application from './Application'
import DocumentTitle from '../ui/DocumentTitle';

const Html = ({ manifest, ...props }) => {
  const body = <Application {...props} />
  const title = DocumentTitle.rewind();
  console.log(title);

  return (
    <html>
      <head>
        <title>{title}</title>
      </head>
      <body>
        <div id="react-root" data-react-props={JSON.stringify(props)}>
          {body}
        </div>
        <script type="text/javascript" src={manifest['application.js']}></script>
      </body>
    </html>
  );
};

export default Html;
