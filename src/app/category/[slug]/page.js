import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import Pagination from '@/components/Pagination/Pagination';
import PostGrid from '@/components/PostGrid/PostGrid';
import TotalFound from '@/components/TotalFound/TotalFound';
import apiCalls from '@/lib/api/index';
import { formatString } from '@/utils/strings';

import styles from './page.module.scss';

const { getCategories, getPosts } = apiCalls;

const getData = async (slug, page) => {
  const category = await getCategories({ slug });
  const posts = await getPosts({ category: category?.[0]?.slug, page, perPage: 12 });
  return { category, posts };
};

const categorySlug = async (context) => {
  const { params, searchParams } = context;
  const { page = 1 } = searchParams || {};
  const { slug } = params;
  const postsResponse = await getData(slug, page);
  const { posts, totalPages, totalPosts } = postsResponse?.posts || {};
  const { label, description } = postsResponse?.category?.[0] || {};

  return (
    <Container>
      <Breadcrumb last={label} />
      <div className={styles.banner}>
        <div className={styles.title}>
          <h1>{formatString(label)}.</h1>
          <TotalFound total={totalPosts} />
        </div>
        <p className={styles.subtitle}>{description}</p>
      </div>

      <main>
        {Array.isArray(posts) && (
          <Grid variant="2">
            {posts.map((post, index) => (
              <PostGrid
                key={post.id}
                post={post}
                image={post.images?.medium}
                imagePriority={index < 6}
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

/* export async function generateMetadata({ params }) {
  const { slug } = params;
  const category = await getCategories(slug);
  const seo = category[0].yoast_head_json;

  return {
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
} */
