import { useContext } from 'react';
import { ArticlesContext } from '../context/ArticlesProvider';
import type { ArticlesContextType } from '../shared/types/articles.types';

export function useArticles(): ArticlesContextType {
  const ctx = useContext(ArticlesContext);
  if (!ctx) throw new Error('useArticles must be used within articlesProvider');
  return ctx;
}
