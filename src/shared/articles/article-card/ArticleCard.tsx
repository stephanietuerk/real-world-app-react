import { Link } from 'react-router-dom';
import type { ArticleMetadata } from '../../../api/useArticles';
import Avatar from '../../avatar/Avatar';
import { MONTH } from '../../constants/time';
import styles from './ArticleCard.module.scss';

export default function ArticleCard({ article }: { article: ArticleMetadata }) {
  return (
    <div className={styles.articleCard}>
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
        <div className={styles.favorite}></div>
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

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = MONTH[date.getMonth()];
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
}
