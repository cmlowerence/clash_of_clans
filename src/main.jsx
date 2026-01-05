/*
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
*/
import React from 'react';
import ReactDOM from 'react-dom/client';

// Simple style to force visibility
const style = {
  color: 'red',
  fontSize: '30px',
  backgroundColor: 'white',
  padding: '20px',
  marginTop: '50px'
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <div style={style}>
    <h1>TEST SUCCESSFUL</h1>
    <p>React is working.</p>
  </div>
);
