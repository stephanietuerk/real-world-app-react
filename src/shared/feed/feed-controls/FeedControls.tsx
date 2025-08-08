import type { ReactNode } from 'react';
import type { ArticleMetadata } from '../../../api/useArticles';
import type { HomeFeed, ProfileFeed } from '../feed.types';
import styles from './FeedControls.module.scss';
import TagOptions, { NONE_TAG } from './tag-options/TagOptions';

export interface FeedSelections<T extends ProfileFeed | HomeFeed> {
  feedType: T;
  tags: string[];
}

interface FeedControlsProps<T extends ProfileFeed | HomeFeed> {
  articles: ArticleMetadata[];
  feedSelections: FeedSelections<T>;
  setFeedSelections: React.Dispatch<React.SetStateAction<FeedSelections<T>>>;
  showTags?: boolean;
  tagsTitle: string;
  children: ReactNode;
}

function getNewTagSelections(
  prevTags: string[],
  tagOptions: string[],
  clickedTag: string,
): string[] {
  let newTagSelections: string[];
  let prevTagSelections = prevTags.filter((x) => x !== NONE_TAG);
  if (!tagOptions.length) {
    newTagSelections = [];
  } else if (clickedTag === NONE_TAG || !tagOptions.includes(clickedTag)) {
    newTagSelections = [NONE_TAG];
  } else {
    newTagSelections =
      prevTagSelections.includes(clickedTag) && tagOptions.includes(clickedTag)
        ? prevTagSelections.filter((t) => t !== clickedTag)
        : [...prevTagSelections, clickedTag];
  }
  return newTagSelections;
}

export default function FeedControls<T extends ProfileFeed | HomeFeed>({
  articles,
  feedSelections,
  setFeedSelections,
  showTags = true,
  tagsTitle,
  children,
}: FeedControlsProps<T>) {
  // does not include NONE_TAG
  const tagOptions = [...new Set(articles.flatMap((a) => a.tagList))];

  function toggleTag(clickedTag: string): void {
    // Selections include NONE_TAG
    setFeedSelections((prev) => {
      const newTagSelections = getNewTagSelections(
        prev.tags,
        tagOptions,
        clickedTag,
      );
      return {
        ...prev,
        tags: newTagSelections,
      };
    });
  }

  return (
    <div className={styles.feedControls}>
      {children}
      {tagOptions && tagOptions.length > 1 && showTags && (
        <div>
          <p className={styles.tagsTitle}>{tagsTitle}</p>
          <TagOptions
            tags={tagOptions}
            selected={feedSelections.tags}
            toggleTag={toggleTag}
          ></TagOptions>
        </div>
      )}
    </div>
  );
}
