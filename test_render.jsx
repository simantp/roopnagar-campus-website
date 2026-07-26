import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './src/App.jsx';

try {
  const html = ReactDOMServer.renderToString(<App />);
  console.log('--- REACT SSR RENDER SUCCESS ---');
  console.log('Rendered HTML length:', html.length);
  console.log('HTML Preview:', html.slice(0, 500));
} catch (err) {
  console.error('--- REACT RUNTIME ERROR DETECTED ---');
  console.error(err);
}
