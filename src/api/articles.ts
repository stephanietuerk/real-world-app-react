import { useEffect, useState } from 'react';

export interface ArticleMetadata {
  slug: string;
  title: string;
  description: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

export function useGlobalArticles() {
  const [articles, setArticles] = useState<ArticleMetadata[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.realworld.build/api/articles')
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles);
        setLoading(false);
      });
  }, []);

  return { articles, loading };
}
