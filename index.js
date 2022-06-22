const express = require('express');
const React = require('react');
const { renderToPipeableStream } = require('react-dom/server');
const { Writable } = require('stream');
const fs = require('fs');

const manifest = JSON.parse(fs.readFileSync('./public/manifest.json'));
const Root = require('./public/server_rendering.js').default;

const app = express();
app.use(express.static('public'));

app.get('/', function (req, res) {
  // https://blog.bitsrc.io/using-react-suspense-for-better-server-side-rendering-310319957bdf
  // https://dev.to/roggc/react-18-streaming-ssr-with-suspense-and-data-fetching-on-the-server-how-to-39jh
  const stream = new Writable({
    write(chunk, encoding, callback) {
      res.write(chunk, callback);
    },
    final() {
      res.end();
    }
  });
  const { pipe } = renderToPipeableStream(
    React.createElement(Root, { manifest }),
    {
      onShellReady() {
        pipe(stream);
      }
    }
  );
})

app.listen(3000);
