'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import IconArrowLeftShort from '@/svg/IconArrowLeftShort';
import IconArrowRightShort from '@/svg/IconArrowRightShort';

import styles from './Pagination.module.scss';

const Pagination = ({ currentPage, totalPages, navigate, handleUpdate }) => {
  const pathname = usePathname();
  const searchParameters = useSearchParams();
  const router = useRouter();

  const pageArray = [...new Array(totalPages).keys()];

  const handleChange = (page) => {
    if (navigate) {
      const parameters = new URLSearchParams(searchParameters);
      parameters.set('page', page);
      const path = `${pathname}?${parameters.toString()}`;
      router.push(path);
    }
    handleUpdate?.(page);
  };

  if (pageArray.length < 2) return;

  return (
    <nav className={styles.pagination}>
      <button
        className={styles.item}
        disabled={currentPage <= 1}
        type="button"
        onClick={() => handleChange(Number(currentPage) - 1)}
        aria-label="Previous page"
      >
        <IconArrowLeftShort />
      </button>
      {pageArray.map((page) => (
        <button
          disabled={Number(currentPage) === Number(page) + 1}
          className={`${styles.item} ${Number(currentPage) === Number(page) + 1 && styles.active}`}
          type="button"
          key={page}
          onClick={() => handleChange(page + 1)}
        >
          {page + 1}
        </button>
      ))}
      <button
        className={styles.item}
        type="button"
        disabled={currentPage >= totalPages}
        aria-label="Next page"
        onClick={() => handleChange(Number(currentPage) + 1)}
      >
        <IconArrowRightShort />
      </button>
    </nav>
  );
};

export default Pagination;
