import React from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';

const App = () => (
  <div className="p-8 min-h-screen bg-bg-dark text-text-primary">
    <h1 className="text-3xl font-bold text-accent">Adios Dashboard</h1>
    <p className="text-text-secondary mt-4">Dashboard placeholder</p>
  </div>
);

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
