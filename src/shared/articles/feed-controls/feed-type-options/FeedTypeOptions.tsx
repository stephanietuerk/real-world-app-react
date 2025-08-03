import clsx from 'clsx';
import styles from './FeedTypeOptions.module.scss';

export default function FeedTypeOptions<T extends string>({
  selected,
  selectFeed,
  options,
}: {
  selected: T;
  selectFeed: (feed: T) => void;
  options: { display: string; id: T }[];
}) {
  return (
    <div>
      {options.map((option) => (
        <button
          className={clsx(
            styles.selection,
            selected === option.id && styles.active,
          )}
          onClick={() => selectFeed(option.id)}
          key={option.id}
        >
          {option.display}
        </button>
      ))}
    </div>
  );
}
