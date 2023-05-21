'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import styles from './Pagination.module.scss';

const Pagination = ({ currentPage, totalPages }) => {
  const pathname = usePathname();
  const searchParameters = useSearchParams();

  const pageArray = [...new Array(totalPages).keys()];

  const createQueryString = useCallback(
    (name, value) => {
      const parameters = new URLSearchParams(searchParameters);
      parameters.set(name, value);

      return parameters.toString();
    },
    [searchParameters]
  );

  if (pageArray.length < 2) return;

  return (
    <nav className={styles.pagination}>
      {currentPage > 1 ? (
        <Link href={`${pathname}?${createQueryString('page', Number(currentPage) - 1)}`} passHref>
          ← Prev
        </Link>
      ) : (
        <span>← Prev</span>
      )}
      {pageArray.map((page) =>
        Number(currentPage) === Number(page) + 1 ? (
          <span key={page} className={`${styles.item} ${styles.active}`}>
            {page + 1}
          </span>
        ) : (
          <Link
            className={styles.item}
            href={`${pathname}?${createQueryString('page', page + 1)}`}
            passHref
            key={page}
          >
            {page + 1}
          </Link>
        )
      )}
      {currentPage < totalPages ? (
        <Link href={`${pathname}?${createQueryString('page', Number(currentPage) + 1)}`} passHref>
          Next →
        </Link>
      ) : (
        <span>Next →</span>
      )}
    </nav>
  );
};

export default Pagination;
