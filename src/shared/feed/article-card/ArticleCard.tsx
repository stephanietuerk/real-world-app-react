import clsx from 'clsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { ArticleMetadata } from '../../../api/useArticles';
import Avatar from '../../../components/icons/Avatar';
import { MONTH } from '../../constants/time';
import FavoriteIcon from '../../icons/favorite-icon/FavoriteIcon';
import styles from './ArticleCard.module.scss';

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = MONTH[date.getMonth()];
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
}

export default function ArticleCard({ article }: { article: ArticleMetadata }) {
  const [favoriteIsHovered, setFavoriteIsHovered] = useState(false);

  function handlePointerEnter(): void {
    setFavoriteIsHovered(true);
  }

  function handlePointerLeave(): void {
    setFavoriteIsHovered(false);
  }

  return (
    <div
      className={clsx(
        styles.articleCard,
        favoriteIsHovered && styles.articleCardFavoriteHovered,
      )}
    >
      <div className={styles.topRow}>
        <div className={styles.authorInfo}>
          <Avatar
            src={article.author.image}
            alt={`Avatar of ${article.author.username}`}
          />
          <div className={styles.authorDate}>
            <Link to={`/profile/${article.author.username}`}>
              <span className={styles.author}>{article.author.username}</span>
            </Link>
            <p className={styles.date}>{formatDate(article.createdAt)}</p>
          </div>
        </div>
        <button
          className={styles.favorite}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
        >
          <FavoriteIcon
            size={16}
            isOutline={!favoriteIsHovered}
            pathClassName={clsx(
              styles.favoritePath,
              favoriteIsHovered && styles.favoritePathHovered,
            )}
          ></FavoriteIcon>
          <span className={styles.favoriteCount}>{article.favoritesCount}</span>
        </button>
      </div>
      <p className={styles.title}>{article.title}</p>
      <p className={styles.description}>{article.description}</p>
      <div className={styles.bottomRow}>
        <button className={styles.viewArticle}>Read article</button>
        <div className={styles.tags}>
          {article.tagList.map((tag) => (
            <p className={styles.tag} key={tag}>
              {tag}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
