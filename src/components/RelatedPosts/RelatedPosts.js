import { formatPosts } from '@/lib/api/utils';

import CarouselPosts from '../CarouselPosts/CarouselPosts';

import styles from './RelatedPosts.module.scss';

const endpoint = process.env.NEXT_PUBLIC_YARP_ENDPOINT;
const baseUrl = process.env.WORDPRESS_API_BASE;

const getRelatedPosts = async (id) => {
  try {
    if (!id) return;
    const url = `${baseUrl}${endpoint}/${id}?_embed&limit=20`;
    const response = await fetch(url);
    const data = await response.json();
    return formatPosts(data);
  } catch (error) {
    console.error(error.stack);
  }
};

const RelatedPosts = async ({ id }) => {
  const posts = await getRelatedPosts(id);

  if (posts?.length === 0) return;

  return (
    <div className={styles.container}>
      <CarouselPosts
        title="Related posts"
        posts={posts}
        slideClass={styles.item}
        aspect="ratio-16-9"
      />
    </div>
  );
};

export default RelatedPosts;
