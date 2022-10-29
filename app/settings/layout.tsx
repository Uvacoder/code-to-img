import Header from "app/dashboard/header";
import AuthGuard from "guards/auth-guard";
import { useSelectedLayoutSegment } from "next/navigation";
import { PropsWithChildren } from "react";
import Sidebar from "./sidebar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <AuthGuard>
      <Header />
      <div className="mx-auto max-w-7xl px-4 lg:px-6 flex max-md:flex-col gap-4 lg:gap-6 my-8">
        <Sidebar />
        <main>{children}</main>
      </div>
    </AuthGuard>
  );
}
