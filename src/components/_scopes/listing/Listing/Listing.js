/* eslint-disable unicorn/no-nested-ternary */

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
  const [postData, setPostData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { categorySlug } = useParams();
  const searchParameters = useSearchParams();
  const bottomElementReference = useRef(null);

  useEffect(() => {
    setPostData(posts);
    setPage(1);
    setLoading(false);
  }, [posts]);

  const handleSearch = useCallback(async () => {
    const newPage = page + 1;
    if (totalPages < newPage) return;

    const {
      q = '',
      categoryIds,
      extraParameters,
      PER_PAGE: perPage,
    } = getPostsQueryHelper(searchParameters, categorySlug) || {};

    setLoading(true);
    const newPostsResponse = await getPosts({
      categories: categoryIds,
      extraParams: extraParameters,
      page: newPage,
      perPage,
      query: q,
    });
    setLoading(false);
    setPage(newPage);
    const newPosts = [...postData, ...(newPostsResponse.posts || [])];
    setPostData(newPosts);
  }, [page, totalPages, searchParameters, categorySlug, postData]);

  useEffect(() => {
    const options = {
      root: undefined,
      rootMargin: '0px',
      threshold: 1,
    };

    const handleIntersection = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) handleSearch();
    };

    const { current } = bottomElementReference;
    const observer = new IntersectionObserver(handleIntersection, options);
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [handleSearch]);

  return (
    <div className={styles.listing}>
      {Array.isArray(postData) && postData.length > 0 ? (
        <>
          <Grid>
            {postData.map((post, index) => {
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
      ) : loading ? (
        <div>Loading...</div>
      ) : (
        <NoResults
          title="No Results"
          subtitle="Sorry, we couldn't find any results."
          description="Please try a different search term."
        />
      )}
      {loading && postData.length > 0 && <div>Loading...</div>}
      {totalPages === page && <div>That&apos;s it.</div>}
    </div>
  );
};

export default Listing;
