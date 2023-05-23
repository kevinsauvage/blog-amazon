'use client';

import { useEffect, useState } from 'react';

import { formatPosts } from '@/utils/posts';

import CarouselPosts from '../CarouselPosts/CarouselPosts';

import styles from './RelatedPosts.module.scss';

const endpoint = process.env.NEXT_PUBLIC_YARP_ENDPOINT;

const RelatedPosts = ({ id }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!id) return;
    fetch(`${endpoint}/${id}?_embed&limit=20`)
      .then((response) => response.json())
      .then((dataJson) => setPosts(formatPosts(dataJson)));
  }, [id]);

  if (posts.length === 0) return;

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
