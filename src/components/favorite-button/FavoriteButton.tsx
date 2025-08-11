import clsx from 'clsx';
import { useState, type MouseEventHandler } from 'react';
import { useArticles } from '../../api/useArticles';
import { useAuth } from '../../api/useAuth';
import { useFavoriteActions } from '../../api/useFavorite';
import type { ArticleMetadata } from '../../shared/types/articles.types';
import FavoriteIcon from '../icons/FavoriteIcon';
import styles from './FavoriteButton.module.scss';

interface FavoriteButtonProps {
  article: ArticleMetadata;
  handlePointerEnter: (e: React.PointerEvent<HTMLButtonElement>) => void;
  handlePointerLeave: (e: React.PointerEvent<HTMLButtonElement>) => void;
}

export default function FavoriteButton({
  article,
  handlePointerEnter,
  handlePointerLeave,
}: FavoriteButtonProps) {
  const { hasToken } = useAuth();
  const { refreshArticles } = useArticles();
  const { favoriteArticle, unfavoriteArticle } = useFavoriteActions();
  const [localFavorited, setLocalFavorited] = useState<boolean>(
    article.favorited,
  );
  const [localCount, setLocalCount] = useState<number>(article.favoritesCount);

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const isRemovingFavorite = localFavorited;

    setLocalFavorited(!localFavorited);
    setLocalCount((c) => c + (isRemovingFavorite ? -1 : 1));

    if (hasToken) {
      try {
        const action = isRemovingFavorite ? unfavoriteArticle : favoriteArticle;
        await action(article.slug).then(() => refreshArticles());
      } catch (error) {
        setLocalFavorited(isRemovingFavorite);
        setLocalCount((c) => c + (isRemovingFavorite ? 1 : -1));
      }
    }
  };

  return (
    <button
      className={clsx(styles.favorite, hasToken && styles.authenticated)}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      <FavoriteIcon
        size={16}
        isOutline={!localFavorited}
        pathClassName={styles.favoritePathFill}
      ></FavoriteIcon>
      <span className={styles.favoriteCount}>{localCount}</span>
    </button>
  );
}
