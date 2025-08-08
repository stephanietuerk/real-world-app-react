import { useState } from 'react';
import { useParams } from 'react-router';
import { useArticles } from '../../api/useArticles';
import { useProfile } from '../../api/useProfile';
import { useUser } from '../../context/UserProvider';
import Banner from '../../shared/banner/Banner';
import Breadcrumbs from '../../shared/breadcrumbs/Breadcrumbs';
import { ROUTE } from '../../shared/constants/routing';
import ArticlesLayout from '../../shared/feed/articles-layout/ArticlesLayout';
import Feed from '../../shared/feed/Feed';
import FeedTypeOptions from '../../shared/feed/feed-controls/feed-type-options/FeedTypeOptions';
import FeedControls, {
  type FeedSelections,
} from '../../shared/feed/feed-controls/FeedControls';
import { NONE_TAG } from '../../shared/feed/feed-controls/tag-options/TagOptions';
import type { ProfileFeed } from '../../shared/feed/feed.types';
import { getFilteredArticles } from '../../shared/feed/filterArticles';
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
    route: ROUTE.profile(username),
  },
];

export default function Profile() {
  const { username } = useParams();
  const { user: loggedInUser } = useUser();
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

  function isLoggedInUser(): boolean {
    return username === loggedInUser?.username;
  }

  if (isLoading) return <div>Loading...</div>;
  if (!profile.username) return <div>User not found.</div>;

  return (
    <>
      <Banner variant="dark">
        <div className={styles.banner}>
          <div className={styles.breadcrumbs}>
            {!isLoggedInUser() && (
              <Breadcrumbs
                segments={BREADCRUMBS(profile.username)}
              ></Breadcrumbs>
            )}
          </div>
          <div className={styles.bannerUserProfile}>
            <p className={styles.bannerUserName}>{profile.username}</p>
            <p className={styles.bannerUserBio}>{profile.bio}</p>
          </div>
          {username !== loggedInUser?.username && (
            <button className={styles.followButton} onClick={handleFollow}>
              {profile.following
                ? `+ Unfollow ${profile.username}`
                : `+ Follow ${profile.username}`}
            </button>
          )}
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
                <p className={styles.feedTypeTitle}>
                  {isLoggedInUser() ? 'Show my' : "Show this user's"}
                </p>
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
              ].noArticlesString(isLoggedInUser() ? 'you' : username)}
              isLoading={isLoading}
            ></Feed>
          </ArticlesLayout>
        )}
      </MainLayout>
    </>
  );
}
