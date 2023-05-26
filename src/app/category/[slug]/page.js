import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import Pagination from '@/components/Pagination/Pagination';
import PostBanner from '@/components/PostBanner/PostBanner';
import TotalFound from '@/components/TotalFound/TotalFound';
import { getCategoryBannerPost, getPopularPosts, getPostsFromCategorySlug } from '@/lib/wordpress';
import { formatString } from '@/utils/strings';

import styles from './page.module.scss';

const { WORDPRESS_API_URL } = process.env;

export async function generateMetadata({ params }) {
  const { slug } = params;
  const URL = `${WORDPRESS_API_URL}/categories?slug=${slug}&_embed`;
  const category = await fetch(URL).then((response) => response.json());
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

const categorySlug = async (context) => {
  const { params, searchParams } = context;
  const { page = 1 } = searchParams || {};
  const { slug } = params;

  const [postsResponse, bannerPost, popular] = await Promise.all([
    getPostsFromCategorySlug(slug, page, 8),
    getCategoryBannerPost(slug),
    getPopularPosts(4, slug),
  ]);

  const { posts, totalPages, totalPosts } = postsResponse;

  return (
    <Container>
      <PostBanner post={bannerPost} />
      <Breadcrumb />
      <div className={styles.wrapper}>
        <main className={styles.main}>
          <header>
            <h1>{formatString(slug)}</h1>
            <TotalFound total={totalPosts} />
          </header>
          <Grid posts={posts} fill showCategories={false} />
          <Pagination totalPages={totalPages} currentPage={page} />
        </main>
        <aside className={styles.aside}>
          <h3>Recommended</h3>
          <Grid posts={popular} showCategories={false} />
        </aside>
      </div>
    </Container>
  );
};

export default categorySlug;
