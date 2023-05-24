import Image from 'next/image';
import Link from 'next/link';

import Category from '@/components/Category/Category';
import Container from '@/components/Container/Container';
import Date from '@/components/Date/Date';
import Grid from '@/components/Grid/Grid';
import Pagination from '@/components/Pagination/Pagination';
import TotalFound from '@/components/TotalFound/TotalFound';
import { getAllPosts, getBannerPost } from '@/lib/wordpress';
import { formatString } from '@/utils/strings';

import styles from './page.module.scss';

const archive = async (context) => {
  const [postsResponse, bannerPost] = await Promise.all([
    getAllPosts(context),
    getBannerPost(context),
  ]);

  const { posts, totalPages, currentPage, totalPosts, name } = postsResponse;
  const { slug, title, imageAlt, images, categories, date } = bannerPost;

  const image = images?.full;
  const category = categories?.[0];

  return (
    <Container>
      <main className={styles.main}>
        {slug && (
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
