'use client';

import { useEffect, useState } from 'react';

import Carousel from '../Carousel/Carousel';
import Post from '../Post/Post';

import styles from './CarouselPosts.module.scss';

const CarouselPosts = ({ posts, title }) => {
  const [itemToShow, setItemToShow] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      switch (true) {
        case windowWidth < 500: {
          return setItemToShow(1);
        }
        case windowWidth < 800: {
          return setItemToShow(2);
        }
        case windowWidth < 1100: {
          return setItemToShow(3);
        }
        default: {
          return setItemToShow(4);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemToShow]);

  if (!Array.isArray(posts) || !posts?.length) return console.warn('CarouselPosts is not an array');

  return (
    <div className={styles.section}>
      {title && <h6>{title}</h6>}
      <Carousel itemToShow={itemToShow}>
        {Array.isArray(posts) &&
          posts.map((post) => (
            <Post key={post.ID} post={post} image={post?.images?.medium_large} />
          ))}
      </Carousel>
    </div>
  );
};

export default CarouselPosts;
