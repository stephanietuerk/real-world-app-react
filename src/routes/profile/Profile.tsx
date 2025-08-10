import { useParams } from 'react-router';
import { useProfile } from '../../api/useProfile';
import { useUser } from '../../api/useUser';
import { ArticlesProvider } from '../../context/ArticlesProvider';
import Banner from '../../shared/banner/Banner';
import Breadcrumbs from '../../shared/breadcrumbs/Breadcrumbs';
import { ROUTE } from '../../shared/constants/routing';
import ArticlesLayout from '../../shared/feed/articles-layout/ArticlesLayout';
import Feed from '../../shared/feed/Feed';
import FeedTypeOptions from '../../shared/feed/feed-controls/feed-type-options/FeedTypeOptions';
import FeedControls from '../../shared/feed/feed-controls/FeedControls';
import { NONE_TAG } from '../../shared/feed/feed-controls/tag-options/TagOptions';
import MainLayout from '../../shared/main-layout/MainLayout';
import type { FeedOption, FeedSelections } from '../../types/articles.types';
import styles from './Profile.module.scss';

export const PROFILE_FEED_OPTIONS: FeedOption[] = [
  {
    display: 'Own articles',
    id: 'author',
    noArticlesString: (username = 'this user') =>
      `It looks like ${username} may have have written anything yet. There are no articles to show.`,
  },
  {
    display: 'Favorites',
    id: 'favorited',
    noArticlesString: (username = 'this user') =>
      `Hmmm. It looks like ${username} may not have favorited anything  yet.`,
  },
];

const FEED_CONTROLS_DEFAULTS: FeedSelections = {
  feed: 'author',
  tags: [NONE_TAG],
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

  function handleFollow(): void {}

  function isLoggedInUser(): boolean {
    return username === loggedInUser?.username;
  }

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
          <ArticlesProvider feedControlsDefaults={FEED_CONTROLS_DEFAULTS}>
            <ArticlesLayout>
              <FeedControls tagsTitle="Show articles about">
                <div>
                  <p className={styles.feedTypeTitle}>
                    {isLoggedInUser() ? 'Show my' : "Show this user's"}
                  </p>
                  <FeedTypeOptions
                    options={PROFILE_FEED_OPTIONS}
                  ></FeedTypeOptions>
                </div>
              </FeedControls>
              <Feed options={PROFILE_FEED_OPTIONS}></Feed>
            </ArticlesLayout>
          </ArticlesProvider>
        )}
      </MainLayout>
    </>
  );
}
