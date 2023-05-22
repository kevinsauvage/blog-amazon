import FullWidthSlider from '@/components/FullWidthSlider/FullWidthSlider';
import PostBig from '@/components/PostBig/PostBig';

import styles from './HomeBanner.module.scss';

const HomeBanner = ({ posts }) => {
  if (!posts?.length) return;

  return (
    <div className={styles.banner}>
      <FullWidthSlider>
        {Array.isArray(posts) &&
          posts.map((post) => <PostBig key={post.ID} post={post} image={post?.images?.large} />)}
      </FullWidthSlider>
    </div>
  );
};

export default HomeBanner;
