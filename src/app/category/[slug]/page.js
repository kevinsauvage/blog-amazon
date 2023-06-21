import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import Pagination from '@/components/Pagination/Pagination';
import PostGrid from '@/components/PostGrid/PostGrid';
import Sorting from '@/components/Sorting/Sorting';
import TotalFound from '@/components/TotalFound/TotalFound';
import apiCalls from '@/lib/api/index';
import { formatString } from '@/utils/strings';
import { decodeURL } from '@/utils/url';

import styles from './page.module.scss';

const { getCategories, getPosts, fetchSorts } = apiCalls;

const getData = async (slug, page, sort) => {
  const category = await getCategories({ slug });
  const posts = await getPosts({
    category: category?.[0]?.slug,
    extraParams: sort,
    page,
    perPage: 12,
  });
  return { category, posts };
};

const categorySlug = async (context) => {
  const { params, searchParams } = context;
  const { page = 1, sorting } = searchParams || {};
  const { slug } = params;

  const [results, sorts] = await Promise.all([
    getData(slug, page, sorting ? decodeURL(sorting) : ''),
    fetchSorts({ slug: 'search' }),
  ]);

  const { posts, totalPages, totalPosts } = results?.posts || {};
  const { label, description } = results?.category?.[0] || {};

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
      <Sorting sorts={sorts} />
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
        <Pagination totalPages={totalPages} currentPage={page} navigate />
      </main>
    </Container>
  );
};

export default categorySlug;

export async function generateMetadata({ params }) {
  const { slug } = params;
  const category = await getCategories({ slug });

  console.log('🚀 ~  file: page.js:76 ~  generateMetadata ~  category:', category);

  const { label, description, seo = {} } = category?.[0] || {};

  return {
    category: seo?.metaTitle || label,
    description: seo?.metaDescription || description,
    keywords: seo?.keywords?.split(','),
    robots: {
      follow: true,
      googleBot: {
        follow: true,
        index: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
        noarchive: true,
        noimageindex: true,
      },
      index: true,
      nocache: true,
    },
    title: seo?.metaTitle || label,
  };
}
