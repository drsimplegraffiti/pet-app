import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AnimalsContextProvider } from './context/AnimalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AnimalsContextProvider>
      <App />
    </AnimalsContextProvider>
  </React.StrictMode>
);

