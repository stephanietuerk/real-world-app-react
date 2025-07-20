import type { ArticleMetadata } from '../../shared/api/articles';
import Avatar from '../../shared/avatar/Avatar';
import { MONTH } from '../../shared/constants/time';
import styles from './ArticleCard.module.scss';

export default function ArticleCard({ article }: { article: ArticleMetadata }) {
  return (
    <div className={styles.container}>
      <div className={styles.topRow}>
        <div className={styles.authorInfo}>
          <Avatar
            src={article.author.image}
            alt={`Avatar of ${article.author.username}`}
          />
          <div className={styles.authorDate}>
            <p className={styles.author}>{article.author.username}</p>
            <p className={styles.date}>{formatDate(article.createdAt)}</p>
          </div>
        </div>
        <div className={styles.favorite}></div>
      </div>
      <p className={styles.title}>{article.title}</p>
      <p className={styles.description}>{article.description}</p>
      <div className={styles.bottomRow}>
        <p className={styles.readMore}>Read more...</p>
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

function formatDate(dateString: str): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = MONTH[date.getMonth()];
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
}
