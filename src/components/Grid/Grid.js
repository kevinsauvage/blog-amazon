import Post from '../Post/Post';

import styles from './Grid.module.scss';

const Grid = ({ posts, fill, ...rest }) => (
  <ul className={`${styles.grid} ${fill && styles.fill}`} {...rest}>
    {Array.isArray(posts) &&
      posts.map((post) => (
        <li key={post.ID}>
          <Post post={post} image={post.images.medium_large} aspect="ratio-5-3" />
        </li>
      ))}
  </ul>
);

export default Grid;
