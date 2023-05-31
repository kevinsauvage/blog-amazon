'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import IconChevronForwardOutline from '@/svg/IconChevronForwardOutline';

import styles from './Breadcrumb.module.scss';

const Breadcrumb = ({ last }) => {
  const pathname = usePathname();
  const blacklist = new Set(['category']);

  // Split the current URL path into segments
  const segments = pathname.split('/').filter(Boolean);

  return (
    <nav>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link href="/">
            Home <IconChevronForwardOutline />
          </Link>
        </li>
        {segments.map((segment, index) => {
          // Build the breadcrumb path for each segment
          const path = `/${segments.slice(0, index + 1).join('/')}`;

          // Determine if the segment is the last one
          const isLastSegment = index === segments.length - 1;

          return (
            !blacklist.has(segment) && (
              <li key={segment} className={styles.item}>
                {isLastSegment ? (
                  <span>{last || segment}</span>
                ) : (
                  <Link href={path}>
                    {segment} <IconChevronForwardOutline />
                  </Link>
                )}
              </li>
            )
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
