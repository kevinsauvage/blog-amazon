import Image from 'next/image';
import Link from 'next/link';

import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import Pagination from '@/components/Pagination/Pagination';
import TotalFound from '@/components/TotalFound/TotalFound';
import { formatPost, formatPosts } from '@/utils/posts';
import { formatString } from '@/utils/strings';

import styles from './page.module.scss';

const PAGE_SIZE = 10;
const { WORDPRESS_API_URL, WORDPRESS_API_CUSTOM_URL } = process.env;

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

const getBannerPost = async ({ params }) => {
  const { slug } = params;
  const name = slug.split('_')[0];
  const url = `${WORDPRESS_API_CUSTOM_URL}/banner-post/${name}?_embed`;
  const response = await fetch(url, { next: { revalidate: 60 } });
  if (!response.ok) return {}; // Return an empty object if the response is not successful
  const data = await response.json();
  return formatPost(data);
};

const archive = async (context) => {
  const [postsResponse, bannerPost] = await Promise.all([
    getAllPosts(context),
    getBannerPost(context),
  ]);

  const { posts, totalPages, currentPage, totalPosts, name } = postsResponse;
  const { slug, title, imageAlt, images, categories, date } = bannerPost;

  const image = images?.large;
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
              <div
                className={styles.category}
                style={{ backgroundColor: category.acf?.background_color }}
              >
                {category.name}
              </div>
              <Link href={`/posts/${slug}`}>
                <h2 className={styles.title}>{title}</h2>
              </Link>
              <p>{date}</p>
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
