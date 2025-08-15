import { Route, Routes, useLocation } from 'react-router';
import { AuthProvider } from '../context/AuthProvider.tsx';
import { UserProvider } from '../context/UserProvider.tsx';
import Article from '../features/article/Article.tsx';
import LoginModal from '../features/auth-modal/LoginModal.tsx';
import RegisterModal from '../features/auth-modal/RegisterModal.tsx';
import Home from '../features/home/Home.tsx';
import Profile from '../features/profile/Profile.tsx';
import { ROUTE } from '../shared/constants/routing.ts';
import App from './App.tsx';

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
            <Route path={'/article/:slug'} element={<Article />} />
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
