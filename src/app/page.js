import Link from 'next/link';

import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import GridPhoto from '@/components/GridPhoto/GridPhoto';
import NavCategories from '@/components/NavCategories/NavCategories';
import HomeBanner from '@/components/scopes/home/HomeBanner';
import Section from '@/components/Section/Section';
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
        <HomeBanner posts={posts} />

        <Section title="Posts by category">
          <NavCategories categories={categories} />
        </Section>

        <Section title="Beauty and fashion">
          <Grid posts={posts.slice(2, 8)} />
        </Section>

        <Section title="Lifestyle">
          <Grid posts={posts.slice(0, 2)} />
        </Section>

        <Section title="Lifestyle">
          <GridPhoto posts={posts.slice(0, 4)} />
        </Section>

        <Section title="Lifestyle">
          <Grid posts={posts.slice(0, 2)} />
        </Section>

        <div className={styles['see-all']}>
          <Link href="/archive">View all posts</Link>
        </div>
      </Container>
    </main>
  );
};

export default Home;
