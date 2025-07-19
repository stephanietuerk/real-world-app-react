import { APP_NAME } from '../shared/constants/app';
import { ROUTES } from '../shared/constants/routing';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <nav className={styles.root}>
      <a>
        <h1 className={styles.name}>{APP_NAME}</h1>
      </a>
      <div className={styles.links}>
        {ROUTES.map((route) => (
          <a className={styles.link}>{route.display}</a>
        ))}
      </div>
    </nav>
  );
}
