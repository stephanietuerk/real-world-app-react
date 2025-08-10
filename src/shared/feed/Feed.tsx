import { useMemo } from 'react';
import { useArticles } from '../../api/useArticles';
import { useUser } from '../../api/useUser';
import type { FeedOption } from '../../types/articles.types';
import ArticleCard from './article-card/ArticleCard';
import styles from './Feed.module.scss';

export default function Feed({ options }: { options: FeedOption[] }) {
  const { user } = useUser();
  const { isLoading, filteredArticles, feedSelections } = useArticles();

  const noArticlesText = useMemo(() => {
    const option = options.find((o) => o.id === feedSelections.feed);
    if (!option) {
      throw new Error('Could not find selected option in options prop');
    }
    return user
      ? option.noArticlesString(user.username)
      : option.noArticlesString();
  }, [user, feedSelections]);

  console.log('filtered articles', filteredArticles);

  return (
    <div className={styles.feed}>
      {isLoading && filteredArticles.length > 0 ? (
        <p>Loading...</p> // TODO make loading overlay
      ) : !isLoading && filteredArticles.length === 0 ? (
        <p className={styles.noArticles}>{noArticlesText}</p>
      ) : (
        filteredArticles.map((a) => <ArticleCard article={a} key={a.slug} />)
      )}
    </div>
  );
}
