import React from 'react';

import Carousel from '../Carousel/Carousel';
import Post from '../Post/Post';

import styles from './CarouselPosts.module.scss';

const CarouselPosts = ({ posts, title }) => {
  if (!Array.isArray(posts) || !posts?.length) return console.warn('CarouselPosts is not an array');

  return (
    <div className={styles.section}>
      {title && <h6>{title}</h6>}
      <Carousel slideClass={styles.slideClass}>
        {Array.isArray(posts) &&
          posts.map((post) => (
            <Post key={post.ID} post={post} image={post?.images?.medium_large} />
          ))}
      </Carousel>
    </div>
  );
};

export default CarouselPosts;
