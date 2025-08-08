import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import { useUser } from '../../context/UserProvider';
import { APP_NAME } from '../../shared/constants/app';
import {
  ROUTE,
  ROUTES_AUTH,
  ROUTES_NO_AUTH,
} from '../../shared/constants/routing';
import styles from './Header.module.scss';

export default function Header() {
  const location = useLocation();
  const { hasToken } = useAuth();
  const { user } = useUser();

  const routes = hasToken ? ROUTES_AUTH : ROUTES_NO_AUTH;

  return (
    <nav className={styles.container}>
      <div className={styles.widthContainer}>
        <Link to={ROUTE.home}>
          <h1 className={styles.name}>{APP_NAME}</h1>
        </Link>
        <div className={styles.links}>
          {routes.map((route) => {
            if (route.type === 'page') {
              return (
                <NavLink
                  to={
                    route.key === 'profile'
                      ? route.path(user?.username)
                      : route.path()
                  }
                  className={({ isActive }) =>
                    isActive ? styles.linkActive : styles.link
                  }
                  key={route.key}
                >
                  {route.display}
                </NavLink>
              );
            } else {
              return (
                <NavLink
                  to={route.key}
                  state={{ backgroundLocation: location }}
                  className={({ isActive }) =>
                    isActive ? styles.linkActive : styles.link
                  }
                  key={route.key}
                >
                  {route.display}
                </NavLink>
              );
            }
          })}
        </div>
      </div>
    </nav>
  );
}
