import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './SidebarLayout.module.scss';

interface SidebarLayoutProps {
  className?: string;
  children: ReactNode;
}

export default function SidebarLayout({
  className,
  children,
}: SidebarLayoutProps) {
  return (
    <div className={clsx(styles.sidebarLayout, className)}>{children}</div>
  );
}
