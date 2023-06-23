import Container from '@/components/Container/Container';
import FiltersCategories from '@/components/FiltersCategories/FiltersCategories';
import Grid from '@/components/Grid/Grid';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import Pagination from '@/components/Pagination/Pagination';
import PostGrid from '@/components/PostGrid/PostGrid';
import SearchForm from '@/components/SearchForm/SearchForm';
import Sorting from '@/components/Sorting/Sorting';
import apiCalls from '@/lib/api/index';
import pageMetadatas from '@/metadatas/pages';
import { decodeURL } from '@/utils/url';

import styles from './page.module.scss';

const { getPosts, fetchSorts, getCategories } = apiCalls;

const search = async (context) => {
  const { q = '', page = 1, sorting, categories = [] } = context?.searchParams || {};

  const [results, sorts, categoriesResponse] = await Promise.all([
    getPosts({
      categories: Array.isArray(categories) ? categories : categories?.split(','),
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
    <div>
      <PageBannerWrapper title="All Posts" totalPosts={totalPosts}>
        <SearchForm query={q} />
      </PageBannerWrapper>
      <Container>
        <main className={styles.main}>
          <div className={styles.config}>
            <Sorting sorts={sorts} />
            <FiltersCategories categories={categoriesResponse} />
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
    </div>
  );
};

export default search;

export const metadata = pageMetadatas.search;
