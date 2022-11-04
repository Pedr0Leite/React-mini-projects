import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./assets/index.css";

const rootElement = document.getElementById("root");

// ReactDOM.render(<App />, document.getElementById('root'))
const root = ReactDOM.createRoot(rootElement);

root.render(
  <App />
);