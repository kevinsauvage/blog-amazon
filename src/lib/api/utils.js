const REVALIDATE = 60 * 60 * 24; // 1 day

export const getBaseUrl = () =>
  process.env.NODE_ENV === 'production'
    ? 'https://strapi-blog-news-production.up.railway.app'
    : 'http://localhost:1337';

const fetchStrapiEndpoint = async (endpoint, config = {}) => {
  try {
    const apiUrl = getBaseUrl();

    const defaultConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
      next: { revalidate: REVALIDATE },
      ...config,
    };

    const fullUrl = `${apiUrl}/api/${endpoint}`;

    console.log('🚀 ~  file: utils.js:25 ~  fetchStrapiEndpoint ~  fullUrl:', fullUrl);

    const response = await fetch(fullUrl, defaultConfig);
    return await response.json();
  } catch (error) {
    console.error('Error fetching data from Strapi:', error);
    throw error;
  }
};

export default fetchStrapiEndpoint;

export const formatCategories = (data) =>
  data.map((category) => {
    const { label, color, locale, slug, description } = category.attributes;
    return { color, description, id: category.id, label, locale, slug };
  });

export const formatPost = (post) => {
  const {
    title,
    description,
    content,
    publishedAt,
    locale,
    slug,
    featured_image: featuredImage,
    categories,
    author,
  } = post.attributes || {};

  return {
    ID: post.id,
    author,
    categories: formatCategories(categories?.data),
    content,
    date: publishedAt,
    excerpt: description,
    imageAlt: featuredImage?.data?.attributes?.alternativeText,
    images: featuredImage?.data?.attributes?.formats,
    locale,
    slug,
    title,
    viewCount: 0,
  };
};

export const formatPosts = (posts) =>
  Array.isArray(posts) ? posts?.map((post) => formatPost(post)) : [];