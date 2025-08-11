import { useAuth } from '../../api/useAuth';
import Banner from '../../components/banner/Banner';
import MainLayout from '../../components/main-layout/MainLayout';
import { ArticlesProvider } from '../../context/ArticlesProvider';
import { APP_NAME } from '../../shared/constants/app';
import type {
  FeedOption,
  FeedSelections,
} from '../../shared/types/articles.types';
import ArticlesLayout from '../feed/articles-layout/ArticlesLayout';
import Feed from '../feed/Feed';
import FeedTypeOptions from '../feed/feed-controls/feed-type-options/FeedTypeOptions';
import FeedControls from '../feed/feed-controls/FeedControls';
import { NONE_TAG } from '../feed/feed-controls/tag-options/TagOptions';
import styles from './Home.module.scss';

export const HOME_FEED_OPTIONS: FeedOption[] = [
  {
    display: 'Conduit community',
    id: 'community',
    noArticlesString: () =>
      "It looks like the Conduit community may be on a writers' strike. There are no articles to show.",
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
