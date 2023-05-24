import FullWidthSlider from '@/components/FullWidthSlider/FullWidthSlider';
import GridPhoto2 from '@/components/GridPhoto2/GridPhoto2';
import PostBig from '@/components/PostBig/PostBig';

import styles from './HomeBanner.module.scss';

const HomeBanner = ({ posts, grid, slider }) => {
  if (!posts?.length) return;

  return (
    <div className={styles.banner}>
      {grid && <GridPhoto2 posts={posts.slice(0, 4)} />}
      {slider && (
        <FullWidthSlider>
          {Array.isArray(posts) &&
            posts.map((post) => <PostBig key={post.ID} post={post} image={post?.images?.large} />)}
        </FullWidthSlider>
      )}
    </div>
  );
};

export default HomeBanner;
