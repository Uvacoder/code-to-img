"use client";

import { useAuth } from "contexts/auth-context";
import { useRouter } from "next/navigation";
import { FC, PropsWithChildren } from "react";
import Spinner from "ui/Spinner";

const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
  const { user, isLoading, error } = useAuth();
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

  if (!user) {
    router.replace("/login");
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
