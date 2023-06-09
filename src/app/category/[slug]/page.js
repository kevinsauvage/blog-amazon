import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import Pagination from '@/components/Pagination/Pagination';
import Post from '@/components/Post/Post';
import TotalFound from '@/components/TotalFound/TotalFound';
import wordpressApiCalls from '@/lib/wordpress/index';
import { formatString } from '@/utils/strings';

import styles from './page.module.scss';

const { getCategoryBySlug, getPosts } = wordpressApiCalls;

const getData = async (slug, page) => {
  const category = await getCategoryBySlug(slug);
  const posts = await getPosts({ categories: category?.[0]?.id, page, perPage: 9 });
  return { category, posts };
};

const categorySlug = async (context) => {
  const { params, searchParams } = context;
  const { page = 1 } = searchParams || {};
  const { slug } = params;

  const postsResponse = await getData(slug, page);

  const { posts, totalPages, totalPosts } = postsResponse?.posts || {};
  const { yoast_head_json: yoastHead, name } = postsResponse?.category?.[0] || {};

  return (
    <Container>
      <Breadcrumb last={name} />
      <div className={styles.banner}>
        <div className={styles.title}>
          <h1>{formatString(name)}.</h1>
          <TotalFound total={totalPosts} />
        </div>
        <p className={styles.subtitle}>{yoastHead?.og_description}</p>
      </div>

      <main>
        {Array.isArray(posts) && (
          <Grid variant="2">
            {posts.map((post) => (
              <Post
                key={post.ID}
                post={post}
                image={post.images.medium_large}
                aspect="ratio-5-3"
                showCategories={false}
              />
            ))}
          </Grid>
        )}
        <Pagination totalPages={totalPages} currentPage={page} />
      </main>
    </Container>
  );
};

export default categorySlug;

export async function generateMetadata({ params }) {
  const { slug } = params;
  const category = await getCategoryBySlug(slug);
  const seo = category[0].yoast_head_json;

  return {
    alternates: {
      canonical: `/category/${slug}`,
    },
    description: seo.og_description,
    openGraph: {
      description: seo.og_description,
      images: seo.og_image,
      locale: seo.og_locale,
      publishedTime: seo.article_published_time,
      siteName: seo.og_site_name,
      title: seo.og_title,
      type: seo.og_type,
      url: seo.og_url,
    },
    robots: seo.robots,
    title: seo.title,
    twitter: {
      card: seo.twitter_card,
      description: seo.og_description,
      images: seo.og_image,
      title: seo.title,
    },
  };
}
