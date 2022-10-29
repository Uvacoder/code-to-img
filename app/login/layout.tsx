"use client";

import { useAuth } from "contexts/auth-context";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import Spinner from "ui/spinner";

export default function Layout({ children }: PropsWithChildren) {
  const { error, isLoading, user } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="text-lg" />
      </div>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (user) {
    router.replace("/dashboard");
    return null;
  }

  return children;
}
