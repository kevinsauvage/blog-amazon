const REVALIDATE = 60 * 60 * 12; // 1/2 day

export const getBaseUrl = () =>
  process.env.NODE_ENV === 'production'
    ? 'https://strapi-blog-news-production.up.railway.app'
    : 'http://localhost:1337';

const fetchStrapiEndpoint = async (endpoint, config = {}) => {
  try {
    const apiUrl = getBaseUrl();

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
    image,
    categories,
    author,
    viewCount = 0,
  } = post.attributes || {};

  const formattedImage = image?.data?.attributes;
  const imageAlt = formattedImage?.alternativeText;
  const images = formattedImage?.formats;

  return {
    author,
    categories: formatCategories(categories?.data),
    content,
    date: publishedAt,
    excerpt: description,
    id: post.id,
    imageAlt,
    images,
    locale,
    slug,
    title,
    viewCount,
  };
};

export const formatPosts = (posts) =>
  Array.isArray(posts) ? posts?.map((post) => formatPost(post)) : [];

export const normalizeMenuData = (data) =>
  data.map((menu) => {
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

export const formatSortItems = (sortItems) => {
  const items = sortItems?.[0]?.attributes?.sortItems?.data;

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
