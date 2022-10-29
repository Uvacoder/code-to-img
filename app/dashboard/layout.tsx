import AuthGuard from "guards/auth-guard";
import { PropsWithChildren } from "react";
import Header from "./header";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <AuthGuard>
      <Header />
      <main className="my-8 max-w-7xl px-4 lg:px-6 mx-auto">{children}</main>
    </AuthGuard>
  );
}
