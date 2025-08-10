import clsx from 'clsx';
import type { MouseEventHandler } from 'react';
import { useArticles } from '../../api/useArticles';
import { useAuth } from '../../api/useAuth';
import { useFavoriteActions } from '../../api/useFavorite';
import type { ArticleMetadata } from '../../types/articles.types';
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

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    if (hasToken) {
      const action = article.favorited ? unfavoriteArticle : favoriteArticle;
      await action(article.slug).then(() => refreshArticles());
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
        isOutline={!article.favorited}
        pathClassName={styles.favoritePathFill}
      ></FavoriteIcon>
      <span className={styles.favoriteCount}>{article.favoritesCount}</span>
    </button>
  );
}
