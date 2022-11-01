import AuthGuard from "guards/AuthGuard";
import { PropsWithChildren } from "react";
import Header from "./Header";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <AuthGuard>
      <Header />
      <main className="my-8 max-w-7xl px-4 lg:px-6 mx-auto">{children}</main>
    </AuthGuard>
  );
}
