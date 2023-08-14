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

  const getPath = (path = '') => {
    const parameters_ = new URLSearchParams([...searchParameters.entries()]);
    parameters_.delete('page');

    let base = '/';

    if (pathname.startsWith('/search')) {
      base = '/search';
    } else if (path) {
      base = `/posts`;
    }

    if (path) {
      base += `/${path.split('/')[1]}`;
    }

    if (parameters_.size > 0) {
      base += `?${parameters_}`;
    }

    return base;
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
