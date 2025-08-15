import type { CSSProperties, ReactNode } from 'react';
import styles from './Banner.module.scss';

interface BannerProps {
  theme: 'light' | 'dark' | 'accent';
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
  accent: {
    bg: 'var(--color-accent-whisper)',
    breadcrumbText: 'rgba(var(--color-primary-rgb), 0.7)',
    linkPrimary: 'rgba(var(--color-primary-dark), 0.7)',
    linkHover: 'var(--color-primary)',
  },
};

export default function Banner({
  theme: variant = 'light',
  children,
}: BannerProps) {
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
