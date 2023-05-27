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
            posts.map((post) => <PostGrid key={post.ID} post={post} image={post.images.large} />)}
        </Grid>
      )}
      {slider && (
        <FullWidthSlider>
          {Array.isArray(posts) &&
            posts.map((post) => <PostBig key={post.ID} post={post} image={post?.images?.full} />)}
        </FullWidthSlider>
      )}
    </div>
  );
};

export default HomeBanner;
