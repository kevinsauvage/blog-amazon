import Link from 'next/link';

import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import Post from '@/components/Post/Post';
import config from '@/config';
import { formatPosts } from '@/utils/posts';

import styles from './page.module.scss';

const getPosts = async () => {
  const response = await fetch(`${config.apiBaseUrl}/posts/?sticky=true`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();
  return formatPosts(data.posts);
};

const Home = async () => {
  const posts = await getPosts();

  return (
    <main className={styles.main}>
      <Container>
        <ul className={styles.grid1}>
          {Array.isArray(posts) &&
            posts.slice(0, 2).map((post) => (
              <li key={post.ID}>
                <Post post={post} aspect="video" />
              </li>
            ))}
        </ul>
        <Grid>
          {Array.isArray(posts) &&
            posts.slice(2).map((post) => (
              <li key={post.ID}>
                <Post post={post} aspect="square" />
              </li>
            ))}
        </Grid>
        <div className={styles['see-all']}>
          <Link href="/archive">View all posts</Link>
        </div>
      </Container>
    </main>
  );
};

export default Home;
