/* eslint-disable react/no-danger */
import Image from 'next/image';
import Link from 'next/link';

import Container from '@/components/Container/Container';
import RelatedPosts from '@/components/RelatedPosts/RelatedPosts';
import { formatPost } from '@/utils/posts';

import styles from './page.module.scss';

export async function generateMetadata({ params }) {
  const { slug } = params;
  const { WORDPRESS_API_URL } = process.env;
  const URL = `${WORDPRESS_API_URL}/posts?slug=${slug}&_embed`;
  const product = await fetch(URL).then((response) => response.json());

  const seo = product[0].yoast_head_json;

  return {
    description: seo.og_description,
    openGraph: {
      description: seo.og_description,
      images: seo.og_image,
      locale: seo.og_locale,
      publishedTime: seo.article_published_time,
      siteName: seo.og_site_name,
      title: seo.og_title,
      type: seo.og_type,
      url: seo.og_url,
    },
    robots: seo.robots,
    title: seo.title,
    twitter: {
      card: seo.twitter_card,
      description: seo.og_description,
      images: seo.og_image,
      title: seo.title,
    },
  };
}

const getPostBySlug = async (context) => {
  const { slug } = context.params;
  const { WORDPRESS_API_URL } = process.env;
  const URL = `${WORDPRESS_API_URL}/posts?slug=${slug}&_embed`;
  const response = await fetch(URL, { next: { revalidate: 60 } });

  const post = await response.json();

  return formatPost(post[0]);
};

const PostId = async (context) => {
  const { categories, title, images, content, ID, imageAlt } = await getPostBySlug(context);

  const image = images?.large;

  return (
    <Container>
      <main className={styles.main}>
        <article className={styles.article}>
          <header>
            <h1>{title}</h1>
            <div className={styles.categories}>
              {categories.length > 0 &&
                categories.slice(0, 2).map((category) => (
                  <Link
                    href={`/category/${category.slug}_${category.id}`}
                    className={styles.category}
                    key={category.id}
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
            alt={imageAlt}
          />
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
        </article>
        <RelatedPosts id={ID} />
      </main>
    </Container>
  );
};

export default PostId;
