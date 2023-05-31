import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import Pagination from '@/components/Pagination/Pagination';
import Post from '@/components/Post/Post';
import SearchForm from '@/components/SearchForm/SearchForm';
import TotalFound from '@/components/TotalFound/TotalFound';
import wordpressApiCalls from '@/lib/wordpress/index';

import styles from './page.module.scss';

const { getPosts } = wordpressApiCalls;

const search = async (context) => {
  const { q = '', page = 1 } = context?.searchParams || {};
  const { posts, totalPosts, totalPages } = await getPosts({
    page,
    perPage: 12,
    query: q,
  });

  return (
    <Container>
      <main className={styles.main}>
        <header>
          <h1>Search Results</h1>
          <TotalFound total={totalPosts} />
          <SearchForm query={q} />
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
        <Pagination totalPages={totalPages} currentPage={page} />
      </main>
    </Container>
  );
};

export default search;
