import Link from 'next/link';

import Container from '@/components/Container/Container';
import Post from '@/components/Post/Post';
import config from '@/config';

import styles from './page.module.scss';

const getPosts = async () => {
  const response = await fetch(`${config.apiBaseUrl}/posts/?category=home&number=16`, {
    revalidate: 10,
  });

  const data = await response.json();
  return data.posts.map((post) => ({
    ID: post.ID,
    author: post.author,
    date: post.date,
    excerpt: post.excerpt,
    featured_image: post.featured_image,
    slug: post.slug,
    thumbnail: post.post_thumbnail,
    title: post.title,
  }));
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
        <ul className={styles.grid2}>
          {Array.isArray(posts) &&
            posts.slice(2).map((post) => (
              <li key={post.ID}>
                <Post post={post} aspect="square" />
              </li>
            ))}
        </ul>
        <div className={styles['see-all']}>
          <Link href="/archive">View all posts</Link>
        </div>
      </Container>
    </main>
  );
};

export default Home;
