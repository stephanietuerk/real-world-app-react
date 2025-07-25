import { Route, Routes, useLocation } from 'react-router';
import Home from '../routes/home/Home';
import LoginModal from '../routes/login-modal/LoginModal';
import RegisterModal from '../routes/register-modal/RegisterModal';
import { ROUTE } from '../shared/constants/routing';
import App from './App';

export default function AppRouter() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location } | null;

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          {/* <Route path="article/:slug" element={<Article />} />
          <Route path="profile/:username" element={<Profile />} /> */}
        </Route>
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path={ROUTE.login} element={<LoginModal />} />
          <Route path={ROUTE.register} element={<RegisterModal />} />
        </Routes>
      )}
    </>
  );
}
