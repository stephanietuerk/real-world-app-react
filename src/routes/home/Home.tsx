import { useAuth } from '../../api/useAuth';
import { ArticlesProvider } from '../../context/ArticlesProvider';
import Banner from '../../shared/banner/Banner';
import { APP_NAME } from '../../shared/constants/app';
import ArticlesLayout from '../../shared/feed/articles-layout/ArticlesLayout';
import Feed from '../../shared/feed/Feed';
import FeedTypeOptions from '../../shared/feed/feed-controls/feed-type-options/FeedTypeOptions';
import FeedControls from '../../shared/feed/feed-controls/FeedControls';
import { NONE_TAG } from '../../shared/feed/feed-controls/tag-options/TagOptions';
import MainLayout from '../../shared/main-layout/MainLayout';
import type { FeedOption, FeedSelections } from '../../types/articles.types';
import styles from './Home.module.scss';

export const HOME_FEED_OPTIONS: FeedOption[] = [
  {
    display: 'Conduit community',
    id: 'community',
    noArticlesString: () =>
      "It looks like the Conduit community may have been on a writers' strike. There are no articles to show.",
  },
  {
    display: 'Accounts I follow',
    id: 'following',
    noArticlesString: () =>
      'Hmmm. It looks like you may not have followed any accounts yet.',
  },
];

const FEED_CONTROLS_DEFAULTS: FeedSelections = {
  feed: 'community',
  tags: [NONE_TAG],
};

export default function Home() {
  const { hasToken } = useAuth();

  return (
    <MainLayout>
      <Banner variant="light">
        <div className={styles.banner}>
          <p className={styles.name}>{APP_NAME}</p>
          <p className={styles.description}>A place to share your knowledge</p>
        </div>
      </Banner>
      <ArticlesProvider feedControlsDefaults={FEED_CONTROLS_DEFAULTS}>
        <ArticlesLayout>
          <FeedControls tagsTitle="Show articles about">
            {hasToken && (
              <div>
                <p className={styles.feedTypeTitle}>Show articles from</p>
                <FeedTypeOptions options={HOME_FEED_OPTIONS}></FeedTypeOptions>
              </div>
            )}
          </FeedControls>
          <Feed options={HOME_FEED_OPTIONS}></Feed>
        </ArticlesLayout>
      </ArticlesProvider>
    </MainLayout>
  );
}
