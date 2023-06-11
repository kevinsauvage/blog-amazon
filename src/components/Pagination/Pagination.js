'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import IconArrowLeftShort from '@/svg/IconArrowLeftShort';
import IconArrowRightShort from '@/svg/IconArrowRightShort';

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
      <div className={`${styles.left} ${styles.item}`}>
        {currentPage > 1 ? (
          <Link
            href={`${pathname}?${createQueryString('page', Number(currentPage) - 1)}`}
            passHref
            aria-label="link to previous page"
          >
            <IconArrowLeftShort />
          </Link>
        ) : (
          <IconArrowLeftShort className={styles.disabled} />
        )}
      </div>
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
      <div className={`${styles.right} ${styles.item}`}>
        {currentPage < totalPages ? (
          <Link
            href={`${pathname}?${createQueryString('page', Number(currentPage) + 1)}`}
            passHref
            aria-label="link to next page"
          >
            <IconArrowRightShort />
          </Link>
        ) : (
          <IconArrowRightShort className={styles.disabled} />
        )}
      </div>
    </nav>
  );
};

export default Pagination;
