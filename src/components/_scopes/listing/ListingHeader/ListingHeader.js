'use client';

import { useParams, usePathname, useSearchParams } from 'next/navigation';

import NavItem from '@/components/NavItem/NavItem';

import Sorting from '../Sorting/Sorting';
import TotalFound from '../TotalFound/TotalFound';

import styles from './ListingHeader.module.scss';

const ListingHeader = ({ totalPosts, sorts, menu = [] }) => {
  const pathname = usePathname();
  const parameters = useParams();
  const searchParameters = useSearchParams();

  // TODO: Try find a simpler way of doing this
  const getPath = (path = '') => {
    const newParameters = new URLSearchParams([...searchParameters.entries()]);
    newParameters.set('page', 1);
    // eslint-disable-next-line unicorn/no-nested-ternary
    let url = pathname.startsWith('/search') ? '/search' : path ? '/posts' : '/';
    if (path) url += `/${path.split('/')[1]}`;
    if (newParameters.size > 0) url += `?${newParameters}`;
    return url;
  };

  return (
    <div className={styles.header}>
      <TotalFound total={totalPosts} />
      {Array.isArray(menu?.items) && (
        <ul className={styles.list}>
          {menu.items.map((menuItem) => (
            <NavItem
              key={menuItem.id}
              href={getPath(menuItem?.path)}
              label={menuItem?.label}
              className={styles.item}
              activeClass={styles.itemActive}
              isActive={
                menuItem?.path === parameters.categorySlug ||
                getPath(menuItem?.path).split('?')[0] === pathname
              }
            />
          ))}
        </ul>
      )}

      <Sorting sorts={sorts} />
    </div>
  );
};

export default ListingHeader;
