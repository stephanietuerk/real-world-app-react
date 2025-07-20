import { Dialog } from 'radix-ui';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../shared/constants/app';
import { ROUTE, ROUTES_NO_AUTH } from '../shared/constants/routing';
import styles from './Header.module.scss';

export default function Header() {
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
                <Link to={route.path} className={styles.link} key={route.path}>
                  {route.display}
                </Link>
              );
            } else {
              return (
                <Dialog.Root key={route.path}>
                  <Dialog.Trigger>
                    <p className={styles.link}>{route.display}</p>
                  </Dialog.Trigger>
                  <Dialog.Portal></Dialog.Portal>
                </Dialog.Root>
              );
            }
          })}
        </div>
      </div>
    </nav>
  );
}
