import Link from 'next/link';

import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import NavCategories from '@/components/NavCategories/NavCategories';
import Post from '@/components/Post/Post';
import { formatPosts } from '@/utils/posts';

import styles from './page.module.scss';

const { WORDPRESS_API_URL } = process.env;

const getPosts = async () => {
  const URL = `${WORDPRESS_API_URL}/posts/?sticky=true&_embed`;
  const response = await fetch(URL, { next: { revalidate: 60 } });
  const data = await response.json();
  return formatPosts(data);
};

const getCategories = async () => {
  const URL = `${WORDPRESS_API_URL}/categories?acf_format=standard`;
  const response = await fetch(URL, { next: { revalidate: 60 * 60 * 24 } });
  return response.json();
};

const Home = async () => {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);

  return (
    <main className={styles.main}>
      <Container>
        <NavCategories categories={categories} />
        <ul className={styles.grid1}>
          {Array.isArray(posts) &&
            posts
              .slice(0, 2)
              .map((post) => (
                <Post key={post.ID} post={post} image={post.images.large} aspect="video" />
              ))}
        </ul>
        <Grid>
          {Array.isArray(posts) &&
            posts
              .slice(2)
              .map((post) => (
                <Post key={post.ID} post={post} image={post.images.medium_large} aspect="square" />
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
