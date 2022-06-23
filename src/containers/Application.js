import React from 'react';
import Nav from './Nav';

const Application = ({ path }) => {
  return (
    <>
      <Nav />
      <h1>It works!!!</h1>
      <code>{path}</code>
    </>
  );
};

export default Application;
