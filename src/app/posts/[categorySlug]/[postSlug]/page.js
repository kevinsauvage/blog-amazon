/* eslint-disable react/no-danger */
import Image from 'next/image';

import CommentsPresentation from '@/components/_scopes/comments/CommentsPresentation/CommentsPresentation';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Category from '@/components/Category/Category';
import Container from '@/components/Container/Container';
import Date from '@/components/Date/Date';
import Views from '@/components/Views/Views';
import apiCalls from '@/lib/api/index';
import { getFrontBaseUrl, getStrapiBaseUrl } from '@/lib/api/utils';

import styles from './page.module.scss';

const { getPosts, updatePost } = apiCalls;

const PostId = async (context) => {
  const {
    params: { postSlug },
  } = context;

  const response = await getPosts({ slug: postSlug });

  const { categories, title, images, content, imageAlt, viewCount, publishedAt, id } =
    response?.posts?.[0] || {};

  updatePost({ body: { data: { viewCount: Number.parseInt(viewCount, 10) + 1 } }, id });

  const image = images?.large;

  const baseUrl = getStrapiBaseUrl();

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
              <Date date={publishedAt} />
              <Views views={viewCount} />
            </div>
            <h1>{title}</h1>

            {content && (
              <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
            )}
          </div>
        </article>
        <CommentsPresentation postId={id} />
      </main>
    </Container>
  );
};

export default PostId;

export async function generateMetadata(context) {
  const { params } = context;
  const { postSlug, slug } = params;
  const response = await getPosts({ slug: postSlug });

  const { images = [], publishedAt, seo = {} } = response?.posts?.[0] || {};

  return {
    category: slug,
    description: seo?.metaDescription,
    keywords: seo?.keywords?.split(','),
    openGraph: {
      description: seo?.metaDescription,
      images: Object.keys(images).map((key) => ({
        alt: images[key].alt,
        height: images[key].height,
        url: getStrapiBaseUrl() + images[key].url,
        width: images[key].width,
      })),
      locale: 'en_US',
      publishedTime: publishedAt,
      siteName: 'site name',
      title: seo?.metaTitle,
      type: 'article',
      url: `${getFrontBaseUrl()}/${slug}/${postSlug}`,
    },
    robots: {
      follow: true,
      googleBot: {
        follow: true,
        index: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
        noimageindex: true,
      },
      index: true,
      nocache: true,
    },
    title: seo?.metaTitle,
    twitter: {
      card: 'summary_large_image',
      creator: '', // Add your Twitter username here if applicable
      creatorId: '', // Add your Twitter user ID here if applicable
      description: seo?.metaDescription,
      images: Object.keys(images)?.map((key) => ({
        alt: images[key].alt,
        height: images[key].height,
        url: getStrapiBaseUrl() + images[key].url,
        width: images[key].width,
      })),
      siteId: '', // Add your Twitter site ID here if applicable
      title: seo?.metaTitle,
    },
  };
}
