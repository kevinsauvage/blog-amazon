import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import Pagination from '@/components/Pagination/Pagination';
import Post from '@/components/Post/Post';
import TotalFound from '@/components/TotalFound/TotalFound';
import { formatPosts } from '@/utils/posts';

import styles from './page.module.scss';

const PAGE_SIZE = 9;
const { WORDPRESS_API_URL } = process.env;

const getAllPosts = async ({ searchParams }) => {
  const { page = 1 } = searchParams || {};
  const URL = `${WORDPRESS_API_URL}/posts/?number=${PAGE_SIZE}&page=${page}&_embed`;
  const response = await fetch(URL, { next: { revalidate: 60 } });
  const totalPosts = response.headers.get('X-WP-Total');
  const data = await response.json();

  return {
    currentPage: page,
    posts: formatPosts(data),
    totalPages: Math.ceil(Number(totalPosts) / PAGE_SIZE),
    totalPosts,
  };
};

const archive = async (context) => {
  const { posts, totalPages, currentPage, totalPosts } = await getAllPosts(context);

  return (
    <Container>
      <main className={styles.main}>
        <header>
          <h1>All Posts</h1>
          <TotalFound total={totalPosts} />
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

export default archive;
