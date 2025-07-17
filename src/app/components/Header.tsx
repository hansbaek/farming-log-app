'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur border-b border-[color:var(--border)] shadow-sm sticky top-0 z-30 transition-all">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/" className="text-2xl font-extrabold tracking-tight text-[color:var(--primary)] hover:text-[color:var(--primary-dark)] transition-colors duration-200">
          영농일지
        </Link>
        <ul className="flex gap-2 md:gap-6">
          <li>
            <Link href="/logs" className="px-4 py-2 rounded-lg font-medium text-[color:var(--foreground)] hover:bg-[color:var(--primary)] hover:text-white transition-colors duration-150">
              일지 목록
            </Link>
          </li>
          <li>
            <Link href="/logs/new" className="px-4 py-2 rounded-lg font-medium bg-[color:var(--primary)] text-white hover:bg-[color:var(--primary-dark)] transition-colors duration-150 shadow">
              새 일지 작성
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
