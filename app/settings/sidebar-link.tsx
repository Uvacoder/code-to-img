"use client";

import clsx from "clsx";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { useMemo } from "react";

export default function SidebarLink({
  label,
  href,
  segment,
}: {
  label: string;
  href: string;
  segment: string;
}) {
  const layoutSegment = useSelectedLayoutSegments();
  const active = useMemo(
    () => layoutSegment.includes(segment),
    [segment, layoutSegment]
  );
  return (
    <Link
      className={clsx("px-4 h-10 flex items-center gap-2  rounded-md", {
        "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50": active,
        "hover:bg-gray-100 dark:hover:bg-gray-800": !active,
      })}
      href={href}
    >
      {label}
    </Link>
  );
}
