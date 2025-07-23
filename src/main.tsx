import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './app/App.tsx';
import Home from './home/Home.tsx';
import { ROUTE } from './shared/constants/routing.ts';
import SignIn from './sign-in/SignIn.tsx';
import SignUp from './sign-up/SignUp.tsx';
import './styles/index.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: ROUTE.home, element: <Home /> },
      { path: ROUTE.login, element: <SignIn /> },
      { path: ROUTE.register, element: <SignUp /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
