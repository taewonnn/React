import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppCounter from './AppCounter.jsx';
import App from './AppPure.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
