import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import Pagination from '@/components/Pagination/Pagination';
import TotalFound from '@/components/TotalFound/TotalFound';
import { formatPosts } from '@/utils/posts';
import { formatString } from '@/utils/strings';

import styles from './page.module.scss';

const PAGE_SIZE = 9;
const { WORDPRESS_API_URL } = process.env;

const getAllPosts = async ({ searchParams, params }) => {
  const { slug } = params;
  const id = slug.split('_')[1];
  const name = slug.split('_')[0];
  const { page = 1 } = searchParams || {};
  const url = `${WORDPRESS_API_URL}/posts/?per_page=${PAGE_SIZE}&page=${page}&categories=${id}&_embed`;
  const response = await fetch(url, { next: { revalidate: 60 } });
  const totalPosts = response.headers.get('X-WP-Total');
  const data = await response.json();
  const totalPages = Math.ceil(totalPosts / PAGE_SIZE);

  return {
    currentPage: page,
    name,
    posts: Array.isArray(data) ? formatPosts(data) : [],
    totalPages,
    totalPosts,
  };
};

const archive = async (context) => {
  const { posts, totalPages, currentPage, totalPosts, name } = await getAllPosts(context);

  return (
    <Container>
      <main className={styles.main}>
        <header>
          <h1>{formatString(name)}</h1>
          <TotalFound total={totalPosts} />
        </header>
        <Grid posts={posts} fill />
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </main>
    </Container>
  );
};

export default archive;
