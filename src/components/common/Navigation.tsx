'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { navItems } from '@/lib/consts/nav';
import { contact } from '@/lib/consts/contact';
import { NavLink } from './NavLink';

export const Navigation = () => (
  <header className="w-full py-[0.8rem] bg-white sticky top-0 z-100 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
    <nav className="flex mx-auto w-full max-w-[1200px] px-6" aria-label="메인 메뉴">
      <div className="w-full mx-auto flex justify-between items-center">
        <h1>
          <Link href="/about" className="flex items-center gap-[0.8rem]">
            <img
              src="/images/logo.png"
              alt="로고"
              className="w-[38px] max-md:w-[32px] align-middle"
              draggable={false}
            />
            <span className="text-[1.8rem] max-md:text-[1.5rem] font-bold text-[#18181c]">석상환</span>
          </Link>
        </h1>
        <div className="nav-menu">
          <ul className="flex items-center gap-[10px]">
            {navItems.map(({ href, label }) => (
              <li
                key={href}
                className="text-[2rem] max-md:text-[1.5rem] max-md:mr-[1.3rem] last:mr-0 cursor-pointer"
              >
                <NavLink href={href}>{label}</NavLink>
              </li>
            ))}
            <li className="cursor-pointer">
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex items-center text-[#18181c] hover:text-[#ffbc2b] transition-colors"
              >
                <FontAwesomeIcon icon={faGithub as IconProp} style={{ width: '1.8rem', height: '1.8rem' }} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
);
