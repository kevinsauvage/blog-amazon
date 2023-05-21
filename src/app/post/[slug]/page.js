/* eslint-disable react/no-danger */
import Image from 'next/image';
import Link from 'next/link';

import Container from '@/components/Container/Container';
import RelatedPosts from '@/components/RelatedPosts/RelatedPosts';
import { formatPost } from '@/utils/posts';

import styles from './page.module.scss';

const getPostBySlug = async (context) => {
  const { slug } = context.params;
  const { WORDPRESS_API_URL } = process.env;
  const URL = `${WORDPRESS_API_URL}/posts?slug=${slug}&_embed`;
  const response = await fetch(URL, { next: { revalidate: 60 } });
  const post = await response.json();
  return formatPost(post[0]);
};

const PostId = async (context) => {
  const { categories, title, images, content, ID } = await getPostBySlug(context);

  const image = images?.['1536x1536'];

  return (
    <Container>
      <main className={styles.main}>
        <header>
          <h1>{title}</h1>
          <div className={styles.categories}>
            {categories.length > 0 &&
              categories.slice(0, 2).map((category) => (
                <Link
                  href={`/category/${category.slug}_${category.id}`}
                  className={styles.category}
                  key={category}
                  style={{ backgroundColor: category.acf.background_color }}
                >
                  {category.name}
                </Link>
              ))}
          </div>
        </header>
        <Image
          className={styles.image}
          src={image?.source_url}
          width={image?.width}
          height={image?.height}
          alt={image?.imageAlt}
        />
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
        <RelatedPosts id={ID} />
      </main>
    </Container>
  );
};

export default PostId;
