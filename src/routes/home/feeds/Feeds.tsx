import { Tabs } from 'radix-ui';
import type { ArticleMetadata } from '../../../api/articles';
import ArticleCard from '../article-card/ArticleCard';
import styles from './Feeds.module.scss';

export default function Feeds({
  articles,
}: {
  articles: ArticleMetadata[] | null;
}) {
  return (
    <Tabs.Root className={styles.TabsRoot} defaultValue="tab2">
      <Tabs.List className={styles.TabsList} aria-label="Select a feed">
        {/* <Tabs.Trigger className={styles.TabsList} value="tab1">
          My feed
        </Tabs.Trigger> */}
        <Tabs.Trigger className={styles.TabsTrigger} value="tab2">
          All articles
        </Tabs.Trigger>
      </Tabs.List>
      {/* <Tabs.Content className={styles.TabsContent} value="tab1">
        bye
      </Tabs.Content> */}
      <Tabs.Content className={styles.TabsContent} value="tab2">
        {articles?.map((a) => (
          <ArticleCard article={a} key={a.slug}></ArticleCard>
        ))}
      </Tabs.Content>
    </Tabs.Root>
  );
}
