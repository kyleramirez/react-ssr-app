import React from 'react';
import { renderToPipeableStream } from "react-dom/server";
import Html from "../src/containers/Html.js";

const render = (path, response, manifest) => {
  response.socket.on("error", (error) => {
    console.error("Fatal", error);
  });
  let didError = false;
  const stream = renderToPipeableStream(
    <Html manifest={manifest} path={path} />,
    {
      onShellReady() {
        response.statusCode = didError ? 500 : 200;
        response.setHeader("Content-type", "text/html");
        stream.pipe(response);
      },
      onError(error) {
        didError = true;
        console.error(error);
      }
    }
  );
  // Abort the stream if 5 seconds goes by without rendering.
  setTimeout(() => stream.abort(), 5000);
};

module.exports = render;
