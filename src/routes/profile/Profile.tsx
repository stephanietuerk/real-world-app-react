import { useState } from 'react';
import { useParams } from 'react-router';
import { useArticles } from '../../api/useArticles';
import { useProfile } from '../../api/useProfile';
import ArticlesLayout from '../../shared/articles/articles-layout/ArticlesLayout';
import type { ProfileFeed } from '../../shared/articles/articles.types';
import FeedTypeOptions from '../../shared/articles/feed-controls/feed-type-options/FeedTypeOptions';
import FeedControls, {
  type FeedSelections,
} from '../../shared/articles/feed-controls/FeedControls';
import { NONE_TAG } from '../../shared/articles/feed-controls/tag-options/TagOptions';
import Feed from '../../shared/articles/feed/Feed';
import { getFilteredArticles } from '../../shared/articles/filterArticles';
import Banner from '../../shared/banner/Banner';
import Breadcrumbs from '../../shared/breadcrumbs/Breadcrumbs';
import { ROUTE } from '../../shared/constants/routing';
import MainLayout from '../../shared/main-layout/MainLayout';
import styles from './Profile.module.scss';

const FEED_TYPE_OPTIONS: Record<
  ProfileFeed,
  {
    display: string;
    id: ProfileFeed;
    noArticlesString: (username: string | undefined) => string;
  }
> = {
  author: {
    display: 'Own articles',
    id: 'author',
    noArticlesString: (username = 'this user') =>
      `It looks like ${username} may have have written anything yet. There are no articles to show.`,
  },
  favorited: {
    display: 'Favorites',
    id: 'favorited',
    noArticlesString: (username = 'this user') =>
      `Hmmm. It looks like ${username} may not have favorited anything  yet.`,
  },
};

const BREADCRUMBS: (
  username: string,
) => { display: string; route: string }[] = (username) => [
  { display: 'Home', route: ROUTE.home },
  {
    display: 'User profile',
    route: `${ROUTE.profile.split(':')[0]}${username}`,
  },
];

export default function Profile() {
  const { username } = useParams();
  const { profile } = useProfile(username);
  const [feedSelections, setFeedSelections] = useState<
    FeedSelections<ProfileFeed>
  >({
    feedType: 'author',
    tags: [NONE_TAG],
  });

  const { articles, isLoading } = useArticles(
    'global',
    feedSelections.feedType,
    username,
  );

  const filteredArticles =
    articles.length === 0
      ? []
      : getFilteredArticles<ProfileFeed>(articles, feedSelections);

  function selectFeedType(feedType: ProfileFeed): void {
    setFeedSelections((prev) => {
      return {
        ...prev,
        feedType,
      };
    });
  }

  function handleFollow(): void {}

  console.log('profile:', profile);

  if (isLoading) return <div>Loading...</div>;
  if (!profile.username) return <div>User not found.</div>;

  return (
    <>
      <Banner background="var(--color-primary-dark)">
        <div
          className={styles.banner}
          style={
            {
              '--color-breadcrumb-text': 'rgba(var(--color-surface-rgb), 0.7)',
              '--color-link-primary': 'rgba(var(--color-surface-rgb), 0.7)',
              '--color-link-hover': 'white',
            } as React.CSSProperties
          }
        >
          <div className={styles.breadcrumbs}>
            <Breadcrumbs segments={BREADCRUMBS(profile.username)}></Breadcrumbs>
          </div>
          <div className={styles.bannerUserProfile}>
            <p className={styles.bannerUserName}>{profile.username}</p>
            <p className={styles.bannerUserBio}>{profile.bio}</p>
          </div>
          <button className={styles.followButton} onClick={handleFollow}>
            {profile.following
              ? `+ Unfollow ${profile.username}`
              : `+ Follow ${profile.username}`}
          </button>
        </div>
      </Banner>
      <MainLayout>
        {!!profile.username && (
          <ArticlesLayout>
            <FeedControls<ProfileFeed>
              articles={articles}
              feedSelections={feedSelections}
              setFeedSelections={setFeedSelections}
              showTags={filteredArticles.length > 3}
              tagsTitle="Show articles about"
            >
              <div>
                <p className={styles.feedTypeTitle}>Show this user's</p>
                <FeedTypeOptions<ProfileFeed>
                  selected={feedSelections.feedType}
                  selectFeed={selectFeedType}
                  options={Object.values(FEED_TYPE_OPTIONS).map((x) => ({
                    display: x.display,
                    id: x.id,
                  }))}
                ></FeedTypeOptions>
              </div>
            </FeedControls>
            <Feed
              articles={filteredArticles}
              noArticlesText={FEED_TYPE_OPTIONS[
                feedSelections.feedType
              ].noArticlesString(username)}
              isLoading={isLoading}
            ></Feed>
          </ArticlesLayout>
        )}
      </MainLayout>
    </>
  );
}
