import Post from '../Post/Post';

import styles from './Grid.module.scss';

const Grid = ({ posts, ...rest }) => (
  <ul className={styles.grid} {...rest}>
    {Array.isArray(posts) &&
      posts.map((post) => (
        <li key={post.ID}>
          <Post post={post} image={post.images.medium_large} aspect="ratio-5-3" />
        </li>
      ))}
  </ul>
);

export default Grid;
