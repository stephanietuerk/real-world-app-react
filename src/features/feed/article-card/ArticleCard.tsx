import clsx from 'clsx';
import { useState, type Dispatch } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../api/useAuth';
import FavoriteButton from '../../../components/favorite-button/FavoriteButton';
import Avatar from '../../../components/icons/Avatar';
import { ROUTE } from '../../../shared/constants/routing';
import { MONTH } from '../../../shared/constants/time';
import type { ArticleMetadata } from '../../../shared/types/articles.types';
import styles from './ArticleCard.module.scss';

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = MONTH[date.getMonth()];
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
}

function handleNonCardHover(
  e: React.PointerEvent<HTMLButtonElement>,
  setFx: Dispatch<React.SetStateAction<boolean>>,
  canSet: boolean,
  value: boolean,
): void {
  e.preventDefault();
  e.stopPropagation();
  if (canSet) {
    setFx(value);
  }
}

interface ArticleCardProps {
  article: ArticleMetadata;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const navigate = useNavigate();
  const { hasToken } = useAuth();
  const { username: profile } = useParams();
  const [favoriteIsHovered, setFavoriteIsHovered] = useState(false);
  const [authorIsHovered, setAuthorIsHovered] = useState(false);

  const handleFavoritePointerEnter: (
    e: React.PointerEvent<HTMLButtonElement>,
  ) => void = (e) => {
    handleNonCardHover(e, setFavoriteIsHovered, hasToken, true);
  };

  const handleFavoritePointerLeave: (
    e: React.PointerEvent<HTMLButtonElement>,
  ) => void = (e) => {
    handleNonCardHover(e, setFavoriteIsHovered, hasToken, false);
  };

  const handleAuthorPointerEnter: (
    e: React.PointerEvent<HTMLButtonElement>,
  ) => void = (e) => {
    const canSet = profile !== article.author.username;
    handleNonCardHover(e, setAuthorIsHovered, canSet, true);
  };

  const handleAuthorPointerLeave: (
    e: React.PointerEvent<HTMLButtonElement>,
  ) => void = (e) => {
    const canSet = profile !== article.author.username;
    handleNonCardHover(e, setAuthorIsHovered, canSet, false);
  };

  return (
    <Link
      to={ROUTE.article(article.slug)}
      className={clsx(
        styles.articleCard,
        (favoriteIsHovered || authorIsHovered) &&
          styles.articleCardFavoriteHovered,
      )}
    >
      <div className={styles.topRow}>
        <div
          className={clsx(
            styles.authorInfo,
            authorIsHovered && styles.authorInfoHovered,
          )}
        >
          <Avatar
            src={article.author.image}
            alt={`Avatar of ${article.author.username}`}
          />
          <div className={styles.authorDate}>
            <button
              role="link"
              className={clsx(
                styles.author,
                profile === article.author.username && styles.authorInert,
              )}
              onPointerEnter={handleAuthorPointerEnter}
              onPointerLeave={handleAuthorPointerLeave}
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
