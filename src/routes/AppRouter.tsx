import { Route, Routes, useLocation } from 'react-router';
import App from '../app/App.tsx';
import { AuthProvider } from '../context/AuthProvider.tsx';
import { UserProvider } from '../context/UserProvider.tsx';
import { ROUTE } from '../shared/constants/routing.ts';
import LoginModal from './auth-modal/LoginModal.tsx';
import RegisterModal from './auth-modal/RegisterModal.tsx';
import Home from './home/Home.tsx';
import Profile from './profile/Profile.tsx';

export default function AppRouter() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location } | null;

  return (
    <AuthProvider>
      <UserProvider>
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path={'/profile/:username'} element={<Profile />} />
          </Route>
        </Routes>

        {state?.backgroundLocation && (
          <Routes>
            <Route path={ROUTE.login} element={<LoginModal />} />
            <Route path={ROUTE.register} element={<RegisterModal />} />
          </Routes>
        )}
      </UserProvider>
    </AuthProvider>
  );
}
