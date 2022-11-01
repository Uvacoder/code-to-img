import Header from "app/dashboard/Header";
import AuthGuard from "guards/AuthGuard";
import { PropsWithChildren } from "react";
import Sidebar from "./Sidebar";

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
