import clsx from 'clsx';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ROUTE } from '../../shared/constants/routing';
import { MONTH } from '../../shared/constants/time';
import type {
  Article,
  ArticleMetadata,
} from '../../shared/types/articles.types';
import Avatar from '../icons/Avatar';
import styles from './AuthorDate.module.scss';

interface AuthorDateProps {
  article: ArticleMetadata | Article;
  handleHover: (
    e: React.PointerEvent<HTMLButtonElement>,
    isEnter: boolean,
  ) => void;
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = MONTH[date.getMonth()];
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
}

export default function AuthorDate({ article, handleHover }: AuthorDateProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleHoverLocal: (
    e: React.PointerEvent<HTMLButtonElement>,
    isEnter: boolean,
  ) => void = (e, isEnter) => {
    setIsHovered(isEnter);
    handleHover(e, isEnter);
  };

  return (
    article.author && (
      <div
        className={clsx(
          styles.authorInfo,
          isHovered && styles.authorInfoHovered,
        )}
      >
        <Avatar
          src={article.author.image}
          alt={`Avatar of ${article.author.username}`}
        />
        <div className={styles.authorDate}>
          <button
            role="link"
            className={styles.author}
            onPointerEnter={(e) => handleHoverLocal(e, true)}
            onPointerLeave={(e) => handleHoverLocal(e, false)}
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
    )
  );
}
