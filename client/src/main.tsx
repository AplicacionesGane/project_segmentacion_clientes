import { AuthProvider } from './auth/AuthContext';
import { RouterProvider } from 'react-router';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from './routes';
import axios from 'axios';

axios.defaults.withCredentials = true

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider router={BrowserRouter} />
  </AuthProvider>
)
