import Container from '@/components/Container/Container';
import Grid from '@/components/Grid/Grid';
import PageBannerWrapper from '@/components/PageBannerWrapper/PageBannerWrapper';
import Pagination from '@/components/Pagination/Pagination';
import PostGrid from '@/components/PostGrid/PostGrid';
import SearchForm from '@/components/SearchForm/SearchForm';
import Sorting from '@/components/Sorting/Sorting';
import TotalFound from '@/components/TotalFound/TotalFound';
import apiCalls from '@/lib/api/index';
import { formatString } from '@/utils/strings';
import { decodeURL } from '@/utils/url';

import styles from './page.module.scss';

const { getCategories, getPosts, fetchSorts } = apiCalls;

const getData = async (slug, page, sort, q) => {
  const category = await getCategories({ slug });
  const posts = await getPosts({
    categories: [category?.[0]?.slug],
    extraParams: sort,
    page,
    perPage: 12,
    query: q,
  });
  return { category, posts };
};

const CategoryPage = async (context) => {
  const { params, searchParams } = context;
  const { page = 1, sorting, q } = searchParams || {};
  const { categorySlug } = params;

  const [results, sorts] = await Promise.all([
    getData(categorySlug, page, sorting ? decodeURL(sorting) : '', q),
    fetchSorts({ slug: 'search' }),
  ]);

  const { posts, totalPages, totalPosts } = results?.posts || {};
  const { label, description } = results?.category?.[0] || {};

  return (
    <div>
      <PageBannerWrapper title={formatString(label)}>
        <p className={styles.subtitle}>{description}</p>
      </PageBannerWrapper>
      <Container>
        <div className={styles.config}>
          <div>
            <SearchForm query={q} />
            <TotalFound total={totalPosts} />
          </div>
          <Sorting sorts={sorts} />
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
          <Pagination totalPages={totalPages} currentPage={page} navigate />
        </main>
      </Container>
    </div>
  );
};

export default CategoryPage;

export async function generateMetadata({ params }) {
  const { slug } = params;
  const category = await getCategories({ slug });

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
