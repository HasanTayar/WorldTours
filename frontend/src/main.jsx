import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-payment-inputs';

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(<App />);
