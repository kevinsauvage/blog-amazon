const REVALIDATE = 60 * 60 * 12; // 1/2 day

export const getStrapiBaseUrl = () =>
  process.env.NODE_ENV === 'production'
    ? 'https://strapi-blog-news-production.up.railway.app'
    : 'http://localhost:1337';

export const getFrontBaseUrl = () =>
  process.env.NODE_ENV === 'production'
    ? 'https://brainbloomr.vercel.app'
    : 'http://localhost:3000';

const fetchStrapiEndpoint = async (endpoint, config = {}) => {
  try {
    const apiUrl = getStrapiBaseUrl();

    const defaultConfig = {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
      next: { revalidate: REVALIDATE },
      ...config,
    };

    const fullUrl = `${apiUrl}/api/${endpoint}`;

    const response = await fetch(fullUrl, defaultConfig);
    return await response.json();
  } catch (error) {
    console.error('Error fetching data from Strapi:', error);
    throw error;
  }
};

export default fetchStrapiEndpoint;

export const normalizeCategoryData = (data) =>
  data.map((category) => {
    const { label, color, locale, slug, description, publishedAt, seo, title } =
      category.attributes || {};
    return { color, description, id: category.id, label, locale, publishedAt, seo, slug, title };
  });

export const normalizePostData = (post) => {
  const {
    title,
    description,
    content,
    publishedAt,
    locale,
    slug,
    image,
    categories,
    author,
    seo,
    viewCount = 0,
  } = post.attributes || {};

  const formattedImage = image?.data?.attributes;
  const imageAlt = formattedImage?.alternativeText;
  const images = formattedImage?.formats;

  return {
    author,
    categories: normalizeCategoryData(categories?.data),
    content,
    excerpt: description,
    id: post.id,
    imageAlt,
    images,
    locale,
    publishedAt,
    seo,
    slug,
    title,
    viewCount,
  };
};

export const normalizePostsData = (posts) =>
  Array.isArray(posts) ? posts?.map((post) => normalizePostData(post)) : [];

export const normalizeMenuData = (data) => {
  if (Array.isArray(data))
    return data.map((menu) => {
      const { id, attributes } = menu || {};
      const { title, displayedTitle, items, path, label } = attributes || {};

      const normalizedMenu = {
        displayedTitle,
        id,
        label,
        path,
        title,
      };

      if (items?.data) {
        normalizedMenu.items = normalizeMenuData(items.data);
      }

      return normalizedMenu;
    });
};

export const normalizePageData = (data) => {
  if (Array.isArray(data))
    return data.map((menu) => {
      const { attributes } = menu || {};
      const { title, description, subtitle, contentHtml, seo } = attributes || {};

      return {
        contentHtml,
        description,
        seo,
        subtitle,
        title,
      };
    });
};

export const normalizeSortItemsData = (sortItems) => {
  const items = sortItems?.[0]?.attributes?.sortItems?.data;
  if (!items) return [];

  return items.map((item) => {
    const { id, attributes } = item;
    const { query, active, createdAt, updatedAt, publishedAt, label } = attributes;

    return {
      active,
      createdAt,
      id,
      label,
      publishedAt,
      query,
      updatedAt,
    };
  });
};

export const generateSeoData = (seo) => ({
  alternates: {
    canonical: seo?.canonicalURL,
  },
  description: seo?.metaDescription,
  keywords: seo?.keywords?.split(','),
  robots: seo?.metaRobots || {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
      noimageindex: true,
    },
    index: true,
    nocache: true,
  },

  title: seo?.metaTitle,
});
