import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, createBrowserRouter } from 'react-router-dom';
import App from './app/App.tsx';
import AppRouter from './app/AppRouter.tsx';
import Home from './routes/home/Home.tsx';
import LoginModal from './routes/login-modal/LoginModal.tsx';
import RegisterModal from './routes/register-modal/RegisterModal.tsx';
import { ROUTE } from './shared/constants/routing.ts';
import './styles/index.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: ROUTE.home, element: <Home /> },
      { path: ROUTE.login, element: <LoginModal /> },
      { path: ROUTE.register, element: <RegisterModal /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </StrictMode>,
);
