import type { ReactNode } from 'react';
import styles from './Banner.module.scss';

interface BannerProps {
  background?: string;
  children: ReactNode;
}

export default function Banner({
  background = 'var(--color-surface)',
  children,
}: BannerProps) {
  return (
    <div
      className={styles.banner}
      style={
        {
          '--color-banner-background': background,
        } as React.CSSProperties
      }
    >
      <div className={styles.widthContainer}>{children}</div>
    </div>
  );
}
