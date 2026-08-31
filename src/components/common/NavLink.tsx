'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

const baseClass =
  'text-[2rem] max-md:text-[1.5rem] transition-all duration-200 ease-in hover:text-[#ffbc2b] hover:font-bold hover:underline';

export const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const activeClass = isActive ? 'underline' : '';

  return (
    <Link href={href} className={`${baseClass} ${activeClass}`}>
      {children}
    </Link>
  );
};
