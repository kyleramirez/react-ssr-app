import { createRoot } from 'react-dom/client';
import React from 'react';
import Application from './containers/Application';

const reactRoot = createRoot(document.getElementById('react-root'));

reactRoot.render(<Application />);
