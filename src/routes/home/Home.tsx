import { useState } from 'react';
import { useArticles } from '../../api/useArticles';
import { useAuth } from '../../context/AuthProvider';
import Banner from '../../shared/banner/Banner';
import { APP_NAME } from '../../shared/constants/app';
import ArticlesLayout from '../../shared/feed/articles-layout/ArticlesLayout';
import Feed from '../../shared/feed/Feed';
import FeedTypeOptions from '../../shared/feed/feed-controls/feed-type-options/FeedTypeOptions';
import FeedControls, {
  type FeedSelections,
} from '../../shared/feed/feed-controls/FeedControls';
import { NONE_TAG } from '../../shared/feed/feed-controls/tag-options/TagOptions';
import type { HomeFeed } from '../../shared/feed/feed.types';
import { getFilteredArticles } from '../../shared/feed/filterArticles';
import MainLayout from '../../shared/main-layout/MainLayout';
import styles from './Home.module.scss';

const FEED_TYPE_OPTIONS: Record<
  HomeFeed,
  { display: string; id: HomeFeed; noArticlesString: string }
> = {
  global: {
    display: 'Conduit community',
    id: 'global',
    noArticlesString:
      "It looks like the Conduit community may have been on a writer's strike. There are no articles to show.",
  },
  user: {
    display: 'Accounts I follow',
    id: 'user',
    noArticlesString:
      'Hmmm. It looks like you may not have followed any accounts yet.',
  },
};

export default function Home() {
  const { hasToken } = useAuth();
  const [feedSelections, setFeedSelections] = useState<
    FeedSelections<HomeFeed>
  >({
    feedType: 'global',
    tags: [NONE_TAG],
  });
  const { articles, isLoading } = useArticles(
    feedSelections.feedType,
    undefined,
    undefined,
  );

  const filteredArticles =
    articles.length === 0
      ? []
      : getFilteredArticles<HomeFeed>(articles, feedSelections);

  function selectFeedType(feedType: HomeFeed): void {
    setFeedSelections((prev) => {
      return {
        ...prev,
        feedType,
      };
    });
  }

  return (
    <MainLayout>
      <Banner variant="light">
        <div className={styles.banner}>
          <p className={styles.name}>{APP_NAME}</p>
          <p className={styles.description}>A place to share your knowledge</p>
        </div>
      </Banner>
      <ArticlesLayout>
        <FeedControls<HomeFeed>
          articles={articles}
          feedSelections={feedSelections}
          setFeedSelections={setFeedSelections}
          tagsTitle="Show articles about"
        >
          {hasToken && (
            <div>
              <p className={styles.feedTypeTitle}>Show articles from</p>
              <FeedTypeOptions<HomeFeed>
                selected={feedSelections.feedType}
                selectFeed={selectFeedType}
                options={Object.values(FEED_TYPE_OPTIONS).map((x) => ({
                  display: x.display,
                  id: x.id,
                }))}
              ></FeedTypeOptions>
            </div>
          )}
        </FeedControls>
        <Feed
          articles={filteredArticles}
          noArticlesText={
            FEED_TYPE_OPTIONS[feedSelections.feedType].noArticlesString
          }
          isLoading={isLoading}
        ></Feed>
      </ArticlesLayout>
    </MainLayout>
  );
}
