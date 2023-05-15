// eslint-disable-next-line import/prefer-default-export
export const formatPosts = (posts) =>
  posts.map((post) => ({
    ID: post.ID,
    author: post.author,
    categories: post.categories,
    date: post.date,
    excerpt: post.excerpt,
    featured_image: post.featured_image,
    slug: post.slug,
    thumbnail: post.post_thumbnail,
    title: post.title,
  }));
