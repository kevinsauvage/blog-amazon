import Link from 'next/link';

import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import GridPhoto from '@/components/GridPhoto/GridPhoto';
import HomeBanner from '@/components/scopes/home/HomeBanner';
import Section from '@/components/Section/Section';
import { getPopularPosts, getPostsFromCategorySlug } from '@/lib/wordpress';

import styles from './page.module.scss';

const Home = async () => {
  const [beauty, Housing, lifestyle, technology, popular] = await Promise.all([
    getPostsFromCategorySlug('beauty', 1, 6),
    getPostsFromCategorySlug('housing', 1, 2),
    getPostsFromCategorySlug('lifestyle', 1, 6),
    getPostsFromCategorySlug('technology', 1, 6),
    getPopularPosts(4),
  ]);

  return (
    <main className={styles.main}>
      <Container>
        <HomeBanner posts={popular} grid />

        <Section title="Beauty">
          <Grid posts={beauty.posts} />
        </Section>

        <Section title="Technology">
          <GridPhoto posts={technology.posts} />
        </Section>

        <Section title="Housing">
          <Grid posts={Housing.posts} />
        </Section>

        <Section title="Lifestyle">
          <Grid posts={lifestyle.posts} />
        </Section>

        <div className={styles['see-all']}>
          <Link href="/archive">View all posts</Link>
        </div>
      </Container>
    </main>
  );
};

export default Home;
