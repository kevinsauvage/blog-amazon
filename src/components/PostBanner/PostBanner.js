import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Category from '../Category/Category';
import Date from '../Date/Date';
import Views from '../Views/Views';

import styles from './PostBanner.module.scss';

const PostBanner = ({ post }) => {
  if (!post) return;
  const { title, imageAlt, images, categories, date, viewCount, slug } = post;

  const image = images?.full;
  const category = categories?.[0];

  return (
    <div className={styles.banner}>
      <Image
        className={`${styles.image}`}
        src={image.source_url}
        width={image.width}
        height={image.height}
        alt={imageAlt}
      />
      <div className={styles.content}>
        <Category category={{ ...category, name: 'Featured' }} />
        <Link href={`/posts/${slug}`}>
          <h2 className={styles.title}>{title}</h2>
        </Link>
        <div className={styles.info}>
          <Date className={styles.date} date={date} />
          <Views className={styles.views} views={viewCount} />
        </div>
      </div>
    </div>
  );
};

export default PostBanner;
