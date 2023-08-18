'use client';
import { sidebarLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Bottombar() {
  const pathname = usePathname();
  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map(({ route, label, imgURL }) => {
          const isActive =
            (pathname.includes(route) && route.length > 1) ||
            pathname === route;
          return (
            <Link
              href={route}
              key={label}
              className={`bottombar_link ${isActive && 'bg-primary-500'}`}
            >
              <Image src={imgURL} alt={label} height={24} width={24} />
              <p className="text-subtle-medium text-light-1 max-sm:hidden">
                {label.split(/\s+./)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Bottombar;
