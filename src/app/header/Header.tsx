import { Link, NavLink, useLocation } from 'react-router-dom';
import { APP_NAME } from '../../shared/constants/app';
import { ROUTE, ROUTES_NO_AUTH } from '../../shared/constants/routing';
import styles from './Header.module.scss';

export default function Header() {
  const location = useLocation();

  return (
    <nav className={styles.container}>
      <div className={styles.widthContainer}>
        <Link to={ROUTE.home}>
          <h1 className={styles.name}>{APP_NAME}</h1>
        </Link>
        <div className={styles.links}>
          {ROUTES_NO_AUTH.map((route) => {
            if (route.type === 'page') {
              return (
                <NavLink
                  to={route.path}
                  className={({ isActive }) =>
                    isActive ? styles.linkActive : styles.link
                  }
                  key={route.path}
                >
                  {route.display}
                </NavLink>
              );
            } else {
              return (
                <NavLink
                  to={route.path}
                  state={{ backgroundLocation: location }}
                  className={({ isActive }) =>
                    isActive ? styles.linkActive : styles.link
                  }
                  key={route.path}
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
