import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import Pagination from '@/components/Pagination/Pagination';
import Post from '@/components/Post/Post';
import SearchForm from '@/components/SearchForm/SearchForm';
import TotalFound from '@/components/TotalFound/TotalFound';
import { formatPosts } from '@/utils/posts';

import styles from './page.module.scss';

const PER_PAGE = 9;
const { WORDPRESS_API_URL } = process.env;

const getSearch = async ({ searchParams }) => {
  const { q = '', page = 1 } = searchParams || {};
  const URL = `${WORDPRESS_API_URL}/posts?search=${q}&number=${PER_PAGE}&page=${page}&_embed`;
  const response = await fetch(URL, { next: { revalidate: 60 } });
  const totalPosts = response.headers.get('X-WP-Total');
  const data = await response.json();

  return {
    currentPage: Number(page),
    posts: formatPosts(data),
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
        <header>
          <h1>Search Results {query && `for ${query}`}</h1>
          <TotalFound total={totalPosts} />
          <SearchForm query={query} />
        </header>
        <Grid>
          {Array.isArray(posts) &&
            posts.map((post) => (
              <Post key={post.ID} post={post} image={post.images.medium_large} aspect="square" />
            ))}
        </Grid>
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </main>
    </Container>
  );
};

export default search;
