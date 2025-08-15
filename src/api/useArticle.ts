import { useEffect, useState } from 'react';
import { API_ROOT } from '../shared/constants/api';
import type { Article } from '../shared/types/articles.types';
import { useApiClient, type ApiCallState } from './useApiClient';

interface ArticleState extends ApiCallState {
  article: Article;
}

function getTypedArticle(article: Article): Article {
  return {
    ...article,
    createdAt: new Date(article.createdAt),
    updatedAt: new Date(article.updatedAt),
  };
}

export function useArticle(slug?: string): ArticleState {
  const { callApiWithAuth } = useApiClient();
  const [state, setState] = useState<ArticleState>({
    article: {} as Article,
    isLoading: true,
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, isLoading: true }));

    if (slug) {
      const url = API_ROOT + 'articles/' + slug;
      callApiWithAuth<{ article: Article }>(url)
        .then((data) => {
          setState({
            article: getTypedArticle(data.article),
            isLoading: false,
          });
        })
        .catch((error) => {
          console.log('Error in useArticle:', error);
          setState((prev) => ({ ...prev, article: {} as Article }));
        });
    }
  }, [slug]);

  return state;
}
