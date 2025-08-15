import { useParams } from 'react-router';
import { useArticle } from '../../api/useArticle';
import { useProfile } from '../../api/useProfile';
import { useUser } from '../../api/useUser';
import AuthorDate from '../../components/author-date/AuthorDate';
import Banner from '../../components/banner/Banner';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import FollowButton from '../../components/follow-button/FollowButton';
import MainLayout from '../../components/main-layout/MainLayout';
import { ROUTE } from '../../shared/constants/routing';
import styles from './Article.module.scss';

const BREADCRUMBS: (slug: string) => { display: string; route: string }[] = (
  slug,
) => [
  { display: 'Home', route: ROUTE.home },
  {
    display: 'Read Article',
    route: ROUTE.article(slug),
  },
];

export default function Article() {
  const { slug } = useParams();
  const { user: loggedInUser } = useUser();
  const { article } = useArticle(slug);
  const { profile: authorProfile } = useProfile(article?.author?.username);

  return (
    <>
      <Banner theme="accent">
        <div className={styles.banner}>
          <div className={styles.breadcrumbs}>
            {slug && <Breadcrumbs segments={BREADCRUMBS(slug)}></Breadcrumbs>}
          </div>
          <div className={styles.bannerArticleTitle}>
            <p className={styles.articleTitle}>{article.title}</p>
            <AuthorDate article={article} handleHover={() => {}}></AuthorDate>
            {loggedInUser &&
              article?.author?.username !== loggedInUser?.username && (
                <FollowButton
                  profile={authorProfile}
                  theme="accent"
                ></FollowButton>
              )}
          </div>
        </div>
      </Banner>
      <MainLayout>{article && <div>{article.body}</div>}</MainLayout>
    </>
  );
}
