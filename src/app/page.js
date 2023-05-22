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

const CAT_BEAUTY_FASHION = 2;
const CAT_FOOD_COOKING = 3;

const getPostsByCategory = async (category, perPage, page = 1) => {
  const url = `${WORDPRESS_API_URL}/posts/?per_page=${perPage}&page=${page}&categories=${category}&_embed`;
  const response = await fetch(url, { next: { revalidate: 60 } });
  const data = await response.json();
  return formatPosts(data);
};

const getCategories = async () => {
  const URL = `${WORDPRESS_API_URL}/categories?acf_format=standard`;
  const response = await fetch(URL, { next: { revalidate: 60 * 60 * 24 } });
  return response.json();
};

const Home = async () => {
  const [posts, beautyAndFashion, foodAndCooking, categories] = await Promise.all([
    getPosts(),
    getPostsByCategory(CAT_BEAUTY_FASHION, 6),
    getPostsByCategory(CAT_FOOD_COOKING, 6),
    getCategories(),
  ]);

  return (
    <main className={styles.main}>
      <Container>
        <HomeBanner posts={posts} />

        <Section title="Posts by category">
          <NavCategories categories={categories} />
        </Section>

        <Section title="Beauty and fashion">
          <Grid posts={beautyAndFashion} />
        </Section>

        <Section title="Lifestyle">
          <Grid posts={posts.slice(0, 2)} />
        </Section>

        <Section title="Food And Cooking">
          <GridPhoto posts={foodAndCooking} />
        </Section>

        <Section title="Health and Wellness">
          <Grid posts={posts.slice(0, 2)} />
        </Section>

        <Section title="Beauty and fashion">
          <Grid posts={beautyAndFashion} />
        </Section>

        <div className={styles['see-all']}>
          <Link href="/archive">View all posts</Link>
        </div>
      </Container>
    </main>
  );
};

export default Home;
