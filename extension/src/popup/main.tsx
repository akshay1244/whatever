import React from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';

const App = () => (
  <div className="p-4 w-80 h-96 bg-bg-dark text-text-primary border border-border">
    <h1 className="text-xl font-bold text-accent">Adios</h1>
    <p className="text-text-secondary mt-2">Popup placeholder</p>
  </div>
);

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
