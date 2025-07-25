import { Outlet, useLocation } from 'react-router-dom';
import Home from '../routes/home/Home.tsx';
import { ROUTE, ROUTES_NO_AUTH } from '../shared/constants/routing.ts';
import styles from './App.module.scss';
import Footer from './footer/Footer.tsx';
import Header from './header/Header.tsx';

export default function App() {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const currentRoute = ROUTES_NO_AUTH.find((r) => r.path === location.pathname);
  const isModal = currentRoute?.type === 'dialog' && backgroundLocation;

  // Component map for rendering background pages
  const getPageComponent = (pathname: string) => {
    switch (pathname) {
      case ROUTE.home:
        return <Home />;
      default:
        return <Home />;
    }
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
