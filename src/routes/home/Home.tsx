import { useState } from 'react';
import {
  useGlobalArticles,
  type ArticleMetadata,
} from '../../shared/api/articles';
import Banner from './banner/Banner';
import Feeds from './feeds/Feeds';
import styles from './Home.module.scss';
import PopularTags from './popular-tags/PopularTags';

export default function Home() {
  const { articles, loading } = useGlobalArticles();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const popularTags = articles
    ? [...new Set(articles.flatMap((a) => a.tagList))]
    : undefined;

  console.log('pop tags', articles);

  function toggleTag(tag: string): void {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  function getArticlesFilteredByTags(
    articles: ArticleMetadata[] | null,
  ): ArticleMetadata[] | null {
    return selectedTags.length
      ? (articles?.filter((article) =>
          article.tagList.some((tag) => selectedTags.includes(tag)),
        ) ?? null)
      : articles;
  }

  return (
    <div className={styles.container}>
      <Banner />
      <div className={styles.belowBanner}>
        <Feeds articles={getArticlesFilteredByTags(articles)}></Feeds>
        <PopularTags
          tags={popularTags}
          selected={selectedTags}
          toggleTag={toggleTag}
        ></PopularTags>
      </div>
    </div>
  );
}
