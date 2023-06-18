import FullWidthSlider from '@/components/FullWidthSlider/FullWidthSlider';
import Grid from '@/components/Grid/Grid';
import PostBig from '@/components/PostBig/PostBig';
import PostGrid from '@/components/PostGrid/PostGrid';

import styles from './HomeBanner.module.scss';

const HomeBanner = ({ posts, grid, slider }) => {
  if (!posts?.length) return;

  return (
    <div className={styles.banner}>
      {grid && (
        <Grid variant="5">
          {Array.isArray(posts) &&
            posts.map((post) => (
              <PostGrid key={post.id} post={post} image={post.images?.large} imagePriority />
            ))}
        </Grid>
      )}
      {slider && (
        <FullWidthSlider>
          {Array.isArray(posts) &&
            posts.map((post, index) => (
              <PostBig
                key={post.id}
                post={post}
                image={post?.images?.full}
                imagePriority={index < 2}
              />
            ))}
        </FullWidthSlider>
      )}
    </div>
  );
};

export default HomeBanner;
