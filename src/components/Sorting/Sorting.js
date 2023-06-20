'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { createQueryString } from '@/utils/url';

import styles from './sorting.module.scss';

const Sorting = ({ sorts }) => {
  const [active, setActive] = useState(sorts?.[0]);

  const pathname = usePathname();
  const searchParameters = useSearchParams();

  const isActive = (query) => query === active.query;

  return (
    <ul className={styles.sorting}>
      {Array.isArray(sorts) &&
        sorts.length > 0 &&
        sorts.map((sort, index) => (
          <li key={sort.id} className={`${styles.item} ${isActive(sort.query) && styles.active}`}>
            <Link
              onClick={() => setActive(sorts?.[index])}
              href={`${pathname}?${createQueryString('sorting', sort.query, searchParameters)}`}
              passHref
              aria-label={`Sort by${sort.label}`}
            >
              {sort.label}
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default Sorting;
