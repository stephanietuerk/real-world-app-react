import clsx from 'clsx';
import styles from './PopularTags.module.scss';

export default function PopularTags({
  tags,
  selected,
  toggleTag,
}: {
  tags: string[] | undefined;
  selected: string[];
  toggleTag: (tag: string) => void;
}) {
  const sortedTags = tags?.slice().sort();

  return (
    <div className={styles.container}>
      <p className={styles.label}>Show articles about</p>
      {sortedTags?.map((tag) => (
        <button
          className={clsx(styles.tag, selected.includes(tag) && styles.active)}
          onClick={() => toggleTag(tag)}
          key={tag}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
