import clsx from 'clsx';
import { useState, type Dispatch } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../../api/useAuth';
import AuthorDate from '../../../components/author-date/AuthorDate';
import FavoriteButton from '../../../components/favorite-button/FavoriteButton';
import { ROUTE } from '../../../shared/constants/routing';
import type { ArticleMetadata } from '../../../shared/types/articles.types';
import styles from './ArticleCard.module.scss';

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
  const { hasToken } = useAuth();
  const { username: profile } = useParams();
  const [favoriteIsHovered, setFavoriteIsHovered] = useState(false);
  const [authorIsHovered, setAuthorIsHovered] = useState(false);

  const handleAuthorHover: (
    e: React.PointerEvent<HTMLButtonElement>,
    isEnter: boolean,
  ) => void = (e, isEnter) => {
    const canSet = profile !== article.author.username;
    handleNonCardHover(e, setAuthorIsHovered, canSet, isEnter);
  };

  const handleFavoriteHover: (
    e: React.PointerEvent<HTMLButtonElement>,
    isEnter: boolean,
  ) => void = (e, isEnter) => {
    handleNonCardHover(e, setFavoriteIsHovered, hasToken, isEnter);
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
        {/* <div
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
              onPointerEnter={(e) => handleAuthorHover(e, true)}
              onPointerLeave={(e) => handleAuthorHover(e, false)}
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
        </div> */}
        <AuthorDate
          article={article}
          handleHover={handleAuthorHover}
        ></AuthorDate>
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
          handlePointerEnter={(e) => handleFavoriteHover(e, true)}
          handlePointerLeave={(e) => handleFavoriteHover(e, false)}
        ></FavoriteButton>
      </div>
    </Link>
  );
}
