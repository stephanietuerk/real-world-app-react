import { Outlet, useParams } from 'react-router-dom';
import { ArticleProvider } from '../../context/ArticleProvider';

export default function ArticleProviderLayout() {
  const { slug } = useParams();

  if (!slug) return null;

  console.log('slug', slug);
  return (
    <ArticleProvider slug={slug}>
      <Outlet />
    </ArticleProvider>
  );
}
