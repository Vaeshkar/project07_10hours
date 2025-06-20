import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { router } from './router';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Aurora from './components/Aurora';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <AuthProvider>
         <Aurora
        colorStops={["#6153CC", "#29FF7B", "#6153CC"]}
        blend={0.2}
        amplitude={0.2}
        speed={0.2}
      />
        <RouterProvider router={router} />
      </AuthProvider>
    </ToastProvider>
  </StrictMode>,
);
