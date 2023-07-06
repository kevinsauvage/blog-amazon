'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

import Grid from '@/components/Grid/Grid';
import NoResults from '@/components/NoResults/NoResults';
import Post from '@/components/Post/Post';
import PostGrid from '@/components/PostGrid/PostGrid';
import { getPostsQueryHelper } from '@/hooks/useQueries';
import { getPosts } from '@/lib/api/posts';

import styles from './Listing.module.scss';

const Listing = ({ posts, totalPages }) => {
  const [postDate, setPostData] = useState([...posts]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const { categorySlug } = useParams();
  const searchParameters = useSearchParams();

  const bottomElementReference = useRef(null);

  const handleSearch = useCallback(
    async (newPage) => {
      if (totalPages < newPage) return;

      const {
        q = '',
        categoryIds,
        extraParameters,
        PER_PAGE: perPage,
      } = getPostsQueryHelper(searchParameters, categorySlug) || {};

      setLoading(true);
      const newPosts = await getPosts({
        categories: categoryIds,
        extraParams: extraParameters,
        page: newPage,
        perPage,
        query: q,
      });
      setLoading(false);
      setPage(newPage);
      setPostData((previous) => [...previous, ...(newPosts.posts || [])]);
    },
    [totalPages, searchParameters, categorySlug]
  );

  useEffect(() => {
    const options = {
      root: undefined,
      rootMargin: '0px',
      threshold: 1,
    };

    const handleIntersection = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) handleSearch(page + 1);
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    if (bottomElementReference.current) {
      observer.observe(bottomElementReference.current);
    }

    return () => {
      if (bottomElementReference.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(bottomElementReference.current);
      }
    };
  }, [handleSearch, page]);

  return (
    <div className={styles.listing}>
      {Array.isArray(postDate) && postDate.length > 0 ? (
        <>
          <Grid>
            {postDate.map((post, index) => {
              if (index % 2 === 0) {
                return (
                  <Post
                    key={post.id}
                    post={post}
                    image={post.images?.medium}
                    imagePriority={index < 3}
                  />
                );
              }
              return (
                <PostGrid
                  key={post.id}
                  post={post}
                  image={post.images?.medium}
                  imagePriority={index < 3}
                />
              );
            })}
          </Grid>
          <div ref={bottomElementReference} />
        </>
      ) : (
        <NoResults
          title="No Results"
          subtitle="Sorry, we couldn't find any results."
          description="Please try a different search term."
        />
      )}
      {loading && <div>Loading...</div>}
      {totalPages === page && <div>That&apos;s it.</div>}
    </div>
  );
};

export default Listing;
