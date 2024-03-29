'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import IconChevronForwardOutline from '@/svg/IconChevronForwardOutline';
import { formatString } from '@/utils/strings';

import styles from './Breadcrumb.module.scss';

const Breadcrumb = ({ last, className = '', ...rest }) => {
  const pathname = usePathname();
  const blacklist = new Set(['posts']);

  // Split the current URL path into segments
  const segments = pathname.split('/').filter(Boolean);

  return (
    <nav>
      <ul className={`${styles.list} ${className}`} {...rest}>
        {segments.length > 0 && (
          <>
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
                      <span>{formatString(last || segment)}</span>
                    ) : (
                      <Link href={path}>
                        {segment} <IconChevronForwardOutline />
                      </Link>
                    )}
                  </li>
                )
              );
            })}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
