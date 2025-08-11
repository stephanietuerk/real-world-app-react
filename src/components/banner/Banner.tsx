import type { CSSProperties, ReactNode } from 'react';
import styles from './Banner.module.scss';

interface BannerProps {
  variant: 'light' | 'dark';
  children: ReactNode;
}

const THEME = {
  light: {
    bg: 'var(--color-surface)',
    breadcrumbText: 'var(--color-primary-rgb, 0.7)',
    linkPrimary: 'var(--color-primary)',
    linkHover: 'var(--color-accent-light)',
  },
  dark: {
    bg: 'var(--color-primary-dark)',
    breadcrumbText: 'rgba(var(--color-surface-rgb), 0.7)',
    linkPrimary: 'rgba(var(--color-surface-rgb), 0.7)',
    linkHover: 'var(--color-surface)',
  },
};

export default function Banner({ variant = 'light', children }: BannerProps) {
  return (
    <div
      className={styles.banner}
      style={
        {
          '--color-banner-background': THEME[variant].bg,
          '--color-breadcrumb-text': THEME[variant].breadcrumbText,
          '--color-link-primary': THEME[variant].linkPrimary,
          '--color-link-hover': THEME[variant].linkHover,
        } as CSSProperties
      }
    >
      <div className={styles.widthContainer}>{children}</div>
    </div>
  );
}
