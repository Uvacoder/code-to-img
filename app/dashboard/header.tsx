/* eslint-disable @next/next/no-img-element */
"use client";

import { useAuth } from "contexts/auth-context";
import Image from "next/image";
import Link from "next/link";
import UserDropdownButton from "ui/user-dropdown-button";

export default function Header() {
  const { user, isLoading } = useAuth();

  return (
    <header className="h-14">
      <div className="h-full mx-auto max-w-7xl lg:px-6 px-4 flex items-center gap-6">
        <div className="flex-1 flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/icons/svg-icon.svg"
              alt="CodeToImg SVG Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </Link>
          <nav>
            <ul className="flex items-center gap-4">
              {[].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-gray-900 dark:hover:text-gray-50"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {isLoading ? null : user ? (
          <div className="flex items-center gap-4">
            <Link
              href="/info/help"
              className="hover:text-gray-900 dark:hover:text-gray-50"
            >
              Help
            </Link>
            <UserDropdownButton user={user} />
          </div>
        ) : (
          <Link href="/login">Log In</Link>
        )}
      </div>
    </header>
  );
}
