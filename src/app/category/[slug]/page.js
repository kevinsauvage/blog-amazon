import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import Pagination from '@/components/Pagination/Pagination';
import Post from '@/components/Post/Post';
import config from '@/config';
import { formatPosts } from '@/utils/posts';
import { formatString } from '@/utils/strings';

import styles from './page.module.scss';

const PAGE_SIZE = 9;

const getAllPosts = async ({ searchParams, params }) => {
  const { slug } = params;

  const { page = 1 } = searchParams || {};

  const url = `${
    config.apiBaseUrl
  }/posts/?number=${PAGE_SIZE}&page=${page}&category=${encodeURIComponent(slug)}`;

  const response = await fetch(url, { next: { revalidate: 60 } });
  const data = await response.json();
  const totalPosts = Number(data.found);
  const totalPages = Math.ceil(totalPosts / PAGE_SIZE);

  return {
    currentPage: page,
    posts: formatPosts(data.posts),
    totalPages,
    totalPosts,
  };
};

const archive = async (context) => {
  const { posts, totalPages, currentPage, totalPosts } = await getAllPosts(context);

  const { slug } = context.params;

  return (
    <Container>
      <main className={styles.main}>
        <h1 className={styles.title}>{formatString(slug)}</h1>
        <span>{totalPosts} posts found</span>
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
