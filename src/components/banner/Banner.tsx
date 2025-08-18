import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './Banner.module.scss';

interface BannerProps {
  className?: string;
  children: ReactNode;
}

export default function Banner({ className, children }: BannerProps) {
  return (
    <div className={clsx(styles.banner, className)}>
      <div className={styles.widthContainer}>{children}</div>
    </div>
  );
}
