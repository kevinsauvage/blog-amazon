// eslint-disable-next-line import/prefer-default-export

export const formatPost = (post) => ({
  ID: post.id,
  author: post.author,
  categories: post._embedded?.['wp:term'][0],
  content: post.content?.rendered,
  date: post.date,
  excerpt: post.excerpt?.rendered,
  imageAlt: post._embedded?.['wp:featuredmedia']?.alt_text,
  images: post._embedded?.['wp:featuredmedia'][0]?.media_details.sizes,
  slug: post.slug,
  title: post.title?.rendered,
});

export const formatPosts = (posts) => posts.map((post) => formatPost(post));
