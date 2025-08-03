import type { ReactNode } from 'react';
import styles from './ArticlesLayout.module.scss';

export default function ArticlesLayout({ children }: { children: ReactNode }) {
  return <div className={styles.articlesLayout}>{children}</div>;
}
