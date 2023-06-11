import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import Pagination from '@/components/Pagination/Pagination';
import PostGrid from '@/components/PostGrid/PostGrid';
import SearchForm from '@/components/SearchForm/SearchForm';
import TotalFound from '@/components/TotalFound/TotalFound';
import wordpressApiCalls from '@/lib/wordpress/index';

import styles from './page.module.scss';

const { getPosts } = wordpressApiCalls;

export const metadata = {
  description:
    'Discover relevant search results. Find the information you need. Explore articles, tips, and resources to deepen your knowledge.',
  keywords: ['search', 'results', 'articles', 'tips', 'resources', 'information'],
  title: 'Search Results | Find What You Need',
};

const search = async (context) => {
  const { q = '', page = 1 } = context?.searchParams || {};
  const { posts, totalPosts, totalPages } = await getPosts({
    page,
    perPage: 12,
    query: q,
  });

  return (
    <Container>
      <Breadcrumb />
      <main className={styles.main}>
        <div className={styles.banner}>
          <div className={styles.title}>
            <h1>Search Results</h1>
            <TotalFound total={totalPosts} />
          </div>
          <SearchForm query={q} />
        </div>
        <Grid variant="2">
          {Array.isArray(posts) &&
            posts.map((post) => (
              <PostGrid key={post.ID} post={post} image={post.images.medium_large} />
            ))}
        </Grid>
        <Pagination totalPages={totalPages} currentPage={page} />
      </main>
    </Container>
  );
};

export default search;
