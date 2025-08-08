import { useEffect, useState } from 'react';
import { API_ROOT } from '../shared/constants/api';
import type { HomeFeed, ProfileFeed } from '../shared/feed/feed.types';
import { useApiClient } from './useApiClient';

const ARTICLES_ENDPOINT = {
  global: 'articles',
  user: 'articles/feed',
};

export interface ArticleMetadata {
  slug: string;
  title: string;
  description: string;
  tagList: string[];
  createdAt: Date;
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

interface ApiArticles {
  articles: ArticleMetadata[];
  articlesCount: number;
}

interface UseArticlesState {
  articles: ArticleMetadata[];
  isLoading: boolean;
  currentAccess: HomeFeed;
  currentProfileFeed: ProfileFeed | undefined;
}

function getSortedArticles(data: ApiArticles): ArticleMetadata[] {
  return data.articles
    .map((article: ArticleMetadata) => {
      return {
        ...article,
        createdAt: new Date(article.createdAt),
        updatedAt: new Date(article.updatedAt),
      };
    })
    .slice()
    .sort((a, b) => b.updatedAt.valueOf() - a.updatedAt.valueOf());
}

export function useArticles(
  access: HomeFeed,
  profileFeed: ProfileFeed | undefined,
  user: string | undefined,
): {
  articles: ArticleMetadata[];
  isLoading: boolean;
} {
  const { authenticatedCall } = useApiClient();
  const [state, setState] = useState<UseArticlesState>({
    articles: [],
    isLoading: true,
    currentAccess: access,
    currentProfileFeed: profileFeed,
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, articles: [], isLoading: true }));

    let url = API_ROOT + ARTICLES_ENDPOINT[access];

    if (profileFeed && user) {
      url += `?${profileFeed}=${encodeURIComponent(user)}`;
    }

    authenticatedCall<{
      articles: ArticleMetadata[];
      articlesCount: number;
    }>(url)
      .then((data) => {
        const articles = getSortedArticles(data);
        setState({
          articles,
          isLoading: false,
          currentAccess: access,
          currentProfileFeed: profileFeed,
        });
      })
      .catch((error) => {
        console.log('Error in useArticles:', error);
        setState((prev) => ({ ...prev, articles: [] }));
      });
  }, [access, profileFeed, user]);

  const isStale =
    state.currentAccess !== access || state.currentProfileFeed !== profileFeed;
  return { articles: state.articles, isLoading: state.isLoading || isStale };
}
