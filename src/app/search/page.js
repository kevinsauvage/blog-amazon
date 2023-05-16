import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import Pagination from '@/components/Pagination/Pagination';
import Post from '@/components/Post/Post';
import SearchForm from '@/components/SearchForm/SearchForm';
import config from '@/config';
import { formatPosts } from '@/utils/posts';

import styles from './page.module.scss';

const PER_PAGE = 9;

const getSearch = async ({ searchParams }) => {
  const { q = '', page = 1 } = searchParams || {};

  const response = await fetch(
    `${config.apiBaseUrl}/posts?search=${q}&number=${PER_PAGE}&page=${page}`,
    { next: { revalidate: 60 } }
  );

  const data = await response.json();
  const totalPosts = Number(data.found);

  return {
    currentPage: Number(page),
    posts: formatPosts(data.posts),
    query: q,
    totalPages: Math.ceil(totalPosts / PER_PAGE),
    totalPosts,
  };
};

const search = async (context) => {
  const { currentPage, posts, totalPosts, query, totalPages } = await getSearch(context);

  return (
    <Container>
      <main className={styles.main}>
        <h1 className={styles.title}>Search Results for &rdquo;{query}&rdquo;</h1>
        <span>{totalPosts} posts found</span>
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
