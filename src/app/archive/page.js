import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import Pagination from '@/components/Pagination/Pagination';
import Post from '@/components/Post/Post';
import config from '@/config';
import { formatPosts } from '@/utils/posts';

import styles from './page.module.scss';

const PAGE_SIZE = 10;

const getAllPosts = async ({ searchParams }) => {
  const { page = 1 } = searchParams || {};

  const response = await fetch(`${config.apiBaseUrl}/posts/?number=${PAGE_SIZE}&page=${page}`, {
    next: { revalidate: 60 },
  });

  const data = await response.json();
  return {
    currentPage: page,
    posts: formatPosts(data.posts),
    totalPages: data.pages,
  };
};

const archive = async (context) => {
  const { posts, totalPages, currentPage } = await getAllPosts(context);

  return (
    <Container>
      <main className={styles.main}>
        <h1 className={styles.title}>All Posts</h1>
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

export default archive;
