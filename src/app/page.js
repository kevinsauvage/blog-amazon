import Link from 'next/link';

import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import GridPhoto from '@/components/GridPhoto/GridPhoto';
import HomeBanner from '@/components/scopes/home/HomeBanner';
import Section from '@/components/Section/Section';
import { getPopularPosts, getPosts, getPostsByCategory } from '@/lib/wordpress';

import styles from './page.module.scss';

const CAT_BEAUTY = 2;
const CAT_FOOD = 3;
const CAT_HEALTH = 4;

const Home = async () => {
  const [posts, beauty, food, health, popular] = await Promise.all([
    getPosts(),
    getPostsByCategory(CAT_BEAUTY, 6),
    getPostsByCategory(CAT_FOOD, 2),
    getPostsByCategory(CAT_HEALTH, 6),
    getPopularPosts(4),
  ]);

  return (
    <main className={styles.main}>
      <Container>
        <HomeBanner posts={popular} grid />

        <Section title="Beauty">
          <Grid posts={beauty} />
        </Section>

        <Section title="Food">
          <Grid posts={food} />
        </Section>

        <Section title="Health">
          <GridPhoto posts={health} />
        </Section>

        <Section title="Health">
          <Grid posts={posts.slice(0, 2)} />
        </Section>

        <Section title="Beauty">
          <Grid posts={beauty} />
        </Section>

        <div className={styles['see-all']}>
          <Link href="/archive">View all posts</Link>
        </div>
      </Container>
    </main>
  );
};

export default Home;
