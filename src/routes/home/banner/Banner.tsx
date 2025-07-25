import { APP_NAME } from '../../../shared/constants/app';
import styles from './Banner.module.scss';

export default function Banner() {
  return (
    <div className={styles.container}>
      <p className={styles.name}>{APP_NAME}</p>
      <p className={styles.description}>A place to share your knowledge</p>
    </div>
  );
}
