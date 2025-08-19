import clsx from 'clsx';
import FavoriteIcon from '../icons/FavoriteIcon';
import styles from './FavoriteReadout.module.scss';

interface FavoriteReadoutProps {
  count: number;
  favorited: boolean;
  className?: string;
}

export default function FavoriteReadout({
  count,
  favorited,
  className,
}: FavoriteReadoutProps) {
  return (
    <>
      <div className={clsx(styles.container, className)}>
        <FavoriteIcon
          size={16}
          isOutline={!favorited}
          pathClassName={styles.favoritePathFill}
        ></FavoriteIcon>
        <span className={styles.favoriteCount}>{count}</span>
      </div>
    </>
  );
}
