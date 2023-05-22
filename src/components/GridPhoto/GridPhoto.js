import PostGrid from '../PostGrid/PostGrid';

import styles from './GridPhoto.module.scss';

const GridPhoto = ({ posts, ...rest }) => (
  <ul className={styles.grid} {...rest}>
    {Array.isArray(posts) &&
      posts.map((post) => (
        <li key={post.ID}>
          <PostGrid post={post} image={post.images.large} />
        </li>
      ))}
  </ul>
);

export default GridPhoto;
