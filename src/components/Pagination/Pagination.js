'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import styles from './Pagination.module.scss';

const Pagination = ({ currentPage, totalPages }) => {
  const pathname = usePathname();
  const searchParameters = useSearchParams();

  const createQueryString = useCallback(
    (name, value) => {
      const parameters = new URLSearchParams(searchParameters);
      parameters.set(name, value);

      return parameters.toString();
    },
    [searchParameters]
  );

  return (
    <nav className={styles.pagination}>
      {currentPage > 1 && (
        <Link href={`${pathname}?${createQueryString('page', currentPage - 1)}`} passHref>
          ← Prev
        </Link>
      )}
      {[...new Array(totalPages).keys()].map((page) => (
        <Link
          className={currentPage === page + 1 ? styles.active : ''}
          href={`${pathname}?${createQueryString('page', page + 1)}`}
          passHref
          key={page}
        >
          {page + 1}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link href={`${pathname}?${createQueryString('page', currentPage + 1)}`} passHref>
          Next →
        </Link>
      )}
    </nav>
  );
};

export default Pagination;
