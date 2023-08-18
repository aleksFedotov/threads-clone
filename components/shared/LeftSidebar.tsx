'use client';

import Link from 'next/link';
import { sidebarLinks } from '../../constants/index';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { SignOutButton, SignedIn } from '@clerk/nextjs';

function LeftSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex 2-full flex-col gap-6 px-6 ">
        {sidebarLinks.map(({ route, imgURL, label }) => {
          const isActive =
            (pathname.includes(route) && route.length > 1) ||
            pathname === route;
          return (
            <Link
              href={route}
              key={label}
              className={`leftsidebar_link ${isActive && 'bg-primary-500'}`}
            >
              <Image src={imgURL} alt={label} height={24} width={24} />
              <p className="text-light-1 max-lg:hidden">{label}</p>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push('/sign-in')}>
            <div className="flex cursor-pointer gap-4 p-4">
              <Image
                src="/assets/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />
              <p className="text-light-2 max-lg:hidden">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
}

export default LeftSidebar;
