import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../footer/Footer.tsx';
import Header from '../header/Header.tsx';
import Home from '../home/Home.tsx';
import { ROUTE, ROUTES_NO_AUTH } from '../shared/constants/routing.ts';
import styles from './App.module.scss';

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
      case ROUTE.settings:
        return <Settings />;
      case ROUTE.profile(':username'):
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        {
          isModal ? (
            getPageComponent(backgroundLocation.pathname) // Show actual background page
          ) : (
            <Outlet />
          ) // Show current route normally
        }
      </main>
      <Footer />
    </>
  );
}
