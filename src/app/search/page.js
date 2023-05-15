import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import Pagination from '@/components/Pagination/Pagination';
import Post from '@/components/Post/Post';
import SearchForm from '@/components/SearchForm/SearchForm';
import config from '@/config';
import { formatPosts } from '@/utils/posts';

import styles from './page.module.scss';

const PER_PAGE = 10;

const getSearch = async ({ searchParams }) => {
  const { q = '', page = 1 } = searchParams || {};

  const response = await fetch(
    `${config.apiBaseUrl}/posts?search=${q}&number=${PER_PAGE}&page=${page}`,
    { next: { revalidate: 60 } }
  );

  const data = await response.json();

  return {
    currentPage: Number.parseInt(page, 10),
    posts: formatPosts(data.posts),
    query: q,
    total: Number.parseInt(data.found, 10),
  };
};

const search = async (context) => {
  const { currentPage, posts, total, query } = await getSearch(context);

  const totalPages = Math.ceil(total / PER_PAGE);

  return (
    <Container>
      <main className={styles.main}>
        <h1 className={styles.title}>Search Results for &rdquo;{query}&rdquo;</h1>
        <span>{total} posts found</span>
        <SearchForm query={query} />
        <Grid>
          {Array.isArray(posts) &&
            posts.map((post) => (
              <li key={post.ID}>
                <Post post={post} aspect="square" />
              </li>
            ))}
        </Grid>
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </main>
    </Container>
  );
};

export default search;
