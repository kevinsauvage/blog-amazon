import Image from 'next/image';
import Link from 'next/link';

import Category from '@/components/Category/Category';
import Container from '@/components/Container/Container';
import Date from '@/components/Date/Date';
import Grid from '@/components/Grid/Grid';
import Pagination from '@/components/Pagination/Pagination';
import TotalFound from '@/components/TotalFound/TotalFound';
import { getBannerPost, getPopularPosts, getPostsFromCategory } from '@/lib/wordpress';
import { formatString } from '@/utils/strings';

import styles from './page.module.scss';

const archive = async (context) => {
  const { params, searchParams } = context;
  const { page = 1 } = searchParams || {};
  const { slug } = params;
  const id = slug.split('_')[1];
  const name = slug.split('_')[0];

  const [postsResponse, bannerPost, popular] = await Promise.all([
    getPostsFromCategory(page, id),
    getBannerPost(name),
    getPopularPosts(4, id),
  ]);

  const { posts, totalPages, totalPosts } = postsResponse;

  const { title, imageAlt, images, categories, date } = bannerPost;

  const image = images?.full;
  const category = categories?.[0];

  return (
    <Container>
      {bannerPost && (
        <div className={styles.banner}>
          <Image
            className={`${styles.image}`}
            src={image.source_url}
            width={image.width}
            height={image.height}
            alt={imageAlt}
          />
          <div className={styles.content}>
            <Category category={category} />
            <Link href={`/posts/${slug}`}>
              <h2 className={styles.title}>{title}</h2>
            </Link>
            <Date date={date} />
          </div>
        </div>
      )}
      <div className={styles.wrapper}>
        <main className={styles.main}>
          <header>
            <h1>{formatString(name)}</h1>
            <TotalFound total={totalPosts} />
          </header>
          <Grid posts={posts} fill />
          <Pagination totalPages={totalPages} currentPage={page} />
        </main>
        <aside className={styles.aside}>
          <h3>Popular</h3>
          <Grid posts={popular} />
        </aside>
      </div>
    </Container>
  );
};

export default archive;
