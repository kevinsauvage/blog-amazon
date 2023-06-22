import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Container from '@/components/Container/Container';
import FiltersCategories from '@/components/FiltersCategories/FiltersCategories';
import Grid from '@/components/Grid/Grid';
import Pagination from '@/components/Pagination/Pagination';
import PostGrid from '@/components/PostGrid/PostGrid';
import SearchForm from '@/components/SearchForm/SearchForm';
import Sorting from '@/components/Sorting/Sorting';
import TotalFound from '@/components/TotalFound/TotalFound';
import apiCalls from '@/lib/api/index';
import pageMetadatas from '@/metadatas/pages';
import { decodeURL } from '@/utils/url';

import styles from './page.module.scss';

const { getPosts, fetchSorts, getCategories } = apiCalls;

const search = async (context) => {
  const { q = '', page = 1, sorting, category } = context?.searchParams || {};

  const [results, sorts, categories] = await Promise.all([
    getPosts({
      category,
      extraParams: sorting ? decodeURL(sorting) : '',
      page,
      perPage: 12,
      query: q,
    }),
    fetchSorts({ slug: 'search' }),
    getCategories(),
  ]);

  const { posts, totalPosts, totalPages } = results || {};
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
        <div className={styles.config}>
          <Sorting sorts={sorts} />
          <FiltersCategories categories={categories} />
        </div>
        <Grid variant="2">
          {Array.isArray(posts) &&
            posts.map((post, index) => (
              <PostGrid
                key={post.id}
                post={post}
                image={post.images?.medium}
                imagePriority={index < 6}
              />
            ))}
        </Grid>
        <Pagination totalPages={totalPages} currentPage={page} navigate />
      </main>
    </Container>
  );
};

export default search;

export const metadata = pageMetadatas.search;
