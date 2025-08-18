import type { ReactNode } from 'react';
import styles from './BodyLayout.module.scss';

export default function BodyLayout({ children }: { children: ReactNode }) {
  return <div className={styles.bodyLayout}>{children}</div>;
}
