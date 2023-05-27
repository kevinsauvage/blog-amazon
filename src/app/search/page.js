import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import Pagination from '@/components/Pagination/Pagination';
import Post from '@/components/Post/Post';
import SearchForm from '@/components/SearchForm/SearchForm';
import TotalFound from '@/components/TotalFound/TotalFound';
import { getSearch } from '@/lib/wordpress';

import styles from './page.module.scss';

const search = async (context) => {
  const { q = '', page = 1 } = context?.searchParams || {};
  const { currentPage, posts, totalPosts, query, totalPages } = await getSearch(q, page);

  return (
    <Container>
      <main className={styles.main}>
        <header>
          <h1>Search Results {query && `for ${query}`}</h1>
          <TotalFound total={totalPosts} />
          <SearchForm query={query} />
        </header>
        <Grid variant="2">
          {Array.isArray(posts) &&
            posts.map((post) => (
              <Post
                key={post.ID}
                post={post}
                image={post.images.medium_large}
                aspect="ratio-5-3"
                showCategories
              />
            ))}
        </Grid>
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </main>
    </Container>
  );
};

export default search;
