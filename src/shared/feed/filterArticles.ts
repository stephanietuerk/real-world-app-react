import type { ArticleMetadata } from '../../api/useArticles';
import type { FeedSelections } from './feed-controls/FeedControls';
import { NONE_TAG } from './feed-controls/tag-options/TagOptions';
import type { HomeFeed, ProfileFeed } from './feed.types';

export function getFilteredArticles<T extends HomeFeed | ProfileFeed>(
  articles: ArticleMetadata[],
  feedSelections: FeedSelections<T>,
): ArticleMetadata[] {
  return articles.filter((a) => {
    const conditions = [];
    if (feedSelections.tags.length && !feedSelections.tags.includes(NONE_TAG)) {
      conditions.push(
        a.tagList.some((tag) => feedSelections.tags.includes(tag)),
      );
    }
    return conditions.every(Boolean);
  });
}
