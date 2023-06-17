/* eslint-disable react/no-danger */
import Image from 'next/image';

import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Category from '@/components/Category/Category';
import Container from '@/components/Container/Container';
import Date from '@/components/Date/Date';
import Views from '@/components/Views/Views';
import apiCalls from '@/lib/api/index';
import { getBaseUrl } from '@/lib/api/utils';

import styles from './page.module.scss';

const { getPosts } = apiCalls;

const PostId = async (context) => {
  const {
    params: { postSlug },
  } = context;

  const response = await getPosts({ slug: postSlug });

  const { categories, title, images, content, imageAlt, viewCount, date } =
    response?.posts?.[0] || {};

  const image = images?.large;

  const baseUrl = getBaseUrl();

  return (
    <Container>
      <Breadcrumb last={title} />
      <main className={styles.main}>
        <article className={styles.article}>
          {image?.url && (
            <Image
              className={styles.image}
              src={baseUrl + image.url}
              width={image?.width}
              height={image?.height}
              alt={imageAlt}
              priority
            />
          )}
          <div className={styles.post}>
            <div className={styles.info}>
              <div className={styles.categories}>
                {categories?.length > 0 &&
                  categories
                    .slice(0, 2)
                    .map((category) => <Category key={category.id} category={category} />)}
              </div>
              <Date date={date} />
              <Views views={viewCount} />
            </div>
            <h1>{title}</h1>

            {content && (
              <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
            )}
          </div>
        </article>
        {/*     <RelatedPosts id={ID} /> */}
      </main>
    </Container>
  );
};

export default PostId;

/* export async function generateMetadata({ params }) {
  const { postSlug } = params;
  const URL = `${WORDPRESS_API_BASE}${WORDPRESS_API_URL}/posts?slug=${postSlug}&_embed`;
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
} */
