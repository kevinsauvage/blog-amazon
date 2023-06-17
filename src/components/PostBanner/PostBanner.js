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

  const postLink = `/category/${category.slug}/${slug}`;

  return (
    <div className={styles.banner}>
      <div className={`${styles.image}`}>
        <Image
          src={image.source_url}
          width={image.width}
          height={image.height}
          alt={imageAlt}
          priority
        />
      </div>
      <div className={styles.content}>
        <Category category={category} />
        <Link href={postLink}>
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
