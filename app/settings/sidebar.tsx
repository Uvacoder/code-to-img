"use client";

import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { useEffect } from "react";
import SidebarLink from "./SidebarLink";

export default function Sidebar() {
  const segments = useSelectedLayoutSegments();
  const router = useRouter();

  useEffect(() => {
    if (segments.length === 0) {
      router.replace("/settings/account");
    }
  }, [router, segments.length]);

  return (
    <aside className="md:w-64 sticky top-14">
      <nav className="space-y-1">
        <SidebarLink
          href="/settings/account"
          segment="account"
          label="Account"
        />
        <SidebarLink
          href="/settings/subscription"
          segment="subscription"
          label="Subscription"
        />
      </nav>
    </aside>
  );
}
