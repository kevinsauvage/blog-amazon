'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

import Post from '@/components/_scopes/posts/Post/Post';
import Grid from '@/components/Grid/Grid';
import NoResults from '@/components/NoResults/NoResults';
import { getPostsQueryHelper } from '@/hooks/useQueries';
import { getPosts } from '@/lib/api/posts';

import PostsLoader from '../PostsLoader/PostsLoader';

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

  const displayContent = () => {
    if (Array.isArray(postData) && postData.length > 0) {
      return (
        <>
          <Grid>
            {postData.map((post, index) => (
              <Post
                key={post.id}
                post={post}
                image={post.images?.medium}
                imagePriority={index < 3}
              />
            ))}
          </Grid>
          <div ref={bottomElementReference} />
        </>
      );
    }
    if (loading) {
      return <PostsLoader />;
    }
    return (
      <NoResults
        title="No Results"
        subtitle="Sorry, we couldn't find any results."
        description="Please try a different search term."
      />
    );
  };

  return (
    <div className={styles.listing}>
      {displayContent()}
      {loading && postData.length > 0 && <PostsLoader />}
      {totalPages === page && !loading && <div>That&apos;s it.</div>}
    </div>
  );
};

export default Listing;
