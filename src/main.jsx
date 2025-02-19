
import { createRoot } from 'react-dom/client'
import React from 'react';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { AuthProvider } from "./context/AuthContext";
import './App.css';


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
    </AuthProvider>
  </React.StrictMode>,
)




