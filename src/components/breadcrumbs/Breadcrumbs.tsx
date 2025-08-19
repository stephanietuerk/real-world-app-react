import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

export default function Breadcrumbs({
  segments,
}: {
  segments: { display: string; route: string }[];
}) {
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      {segments.map((s, i) => (
        <div key={s.route} className={styles.segment}>
          {i > 0 ? <span className={styles.connector}>{'>'}</span> : null}
          <Link to={s.route}>
            <span className={styles.route}>{s.display}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}
