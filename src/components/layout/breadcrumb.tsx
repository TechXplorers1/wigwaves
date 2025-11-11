'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

const Breadcrumb = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  // Don't show breadcrumbs on the homepage or for auth pages
  if (segments.length === 0 || ['login', 'register'].includes(segments[0])) {
    return null;
  }

  // Hide on admin dashboard
  if (segments.includes('admin')) {
      return null;
  }

  const breadcrumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const isLast = index === segments.length - 1;
    const name = segment.replace(/-/g, ' ').toUpperCase();
    return { name, href, isLast };
  });

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="list-none p-0 inline-flex items-center text-sm text-muted-foreground">
        <li>
          <Link href="/" className="hover:text-primary">
            HOME
          </Link>
        </li>
        {breadcrumbs.map((breadcrumb, index) => (
          <Fragment key={breadcrumb.href}>
            <li className="mx-2">/</li>
            <li>
              {breadcrumb.isLast ? (
                <span className="text-foreground">{breadcrumb.name}</span>
              ) : (
                <Link href={breadcrumb.href} className="hover:text-primary">
                  {breadcrumb.name}
                </Link>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
