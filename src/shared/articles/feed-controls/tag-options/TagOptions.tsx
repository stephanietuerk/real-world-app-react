import clsx from 'clsx';
import styles from './TagOptions.module.scss';

export const NONE_TAG = 'everything';

export default function TagOptions({
  tags,
  selected,
  toggleTag,
}: {
  tags: string[];
  selected: string[];
  toggleTag: (tag: string) => void;
}) {
  const sortedTags = [NONE_TAG, ...tags.slice().sort()];

  return (
    <>
      {sortedTags.map((tag) => (
        <button
          className={clsx(styles.tag, selected.includes(tag) && styles.active)}
          onClick={() => toggleTag(tag)}
          key={tag}
        >
          {tag}
        </button>
      ))}
    </>
  );
}
