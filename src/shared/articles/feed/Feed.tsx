import type { ArticleMetadata } from '../../../api/useArticles';
import ArticleCard from '../../../shared/articles/article-card/ArticleCard';
import styles from './Feed.module.scss';

interface FeedProps {
  articles: ArticleMetadata[];
  noArticlesText: string;
  isLoading: boolean;
}

export default function Feed({
  articles,
  noArticlesText,
  isLoading,
}: FeedProps) {
  const renderContent = () => {
    if (isLoading) return null;
    if (!articles.length)
      return <p className={styles.noArticles}>{noArticlesText}</p>;
    return articles.map((a) => <ArticleCard article={a} key={a.slug} />);
  };

  return <div className={styles.feed}>{renderContent()}</div>;
}
