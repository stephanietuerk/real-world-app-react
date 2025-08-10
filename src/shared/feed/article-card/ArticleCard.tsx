import clsx from 'clsx';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../api/useAuth';
import type { ArticleMetadata } from '../../../types/articles.types';
import { ROUTE } from '../../constants/routing';
import { MONTH } from '../../constants/time';
import FavoriteButton from '../../favorite-button/FavoriteButton';
import Avatar from '../../icons/Avatar';
import styles from './ArticleCard.module.scss';

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = MONTH[date.getMonth()];
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
}

interface ArticleCardProps {
  article: ArticleMetadata;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const navigate = useNavigate();
  const { hasToken } = useAuth();
  const [favoriteIsHovered, setFavoriteIsHovered] = useState(false);

  const handleFavoritePointerEnter: (
    e: React.PointerEvent<HTMLButtonElement>,
  ) => void = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasToken) {
      setFavoriteIsHovered(true);
    }
  };

  const handleFavoritePointerLeave: (
    e: React.PointerEvent<HTMLButtonElement>,
  ) => void = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasToken) {
      setFavoriteIsHovered(false);
    }
  };

  return (
    <Link
      to={ROUTE.article(article.slug)}
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
            <button
              role="link"
              className={styles.author}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(ROUTE.profile(article.author.username));
              }}
            >
              {article.author.username}
            </button>
            <p className={styles.date}>{formatDate(article.createdAt)}</p>
          </div>
        </div>
      </div>
      <p className={styles.title}>{article.title}</p>
      <p className={styles.description}>{article.description}</p>
      <div className={styles.bottomRow}>
        <div className={styles.tags}>
          {article.tagList.map((tag) => (
            <p className={styles.tag} key={tag}>
              {tag}
            </p>
          ))}
        </div>
        <FavoriteButton
          article={article}
          handlePointerEnter={handleFavoritePointerEnter}
          handlePointerLeave={handleFavoritePointerLeave}
        ></FavoriteButton>
      </div>
    </Link>
  );
}
