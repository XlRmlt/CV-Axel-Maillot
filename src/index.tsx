import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './components/Theme/theme.css';

// Initialiser le thème sombre par défaut
if (!localStorage.theme) {
  localStorage.theme = 'dark';
  document.documentElement.classList.add('dark');
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);