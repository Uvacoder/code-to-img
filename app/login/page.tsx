"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "libs/firebase";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { FaFacebook, FaGithub, FaGoogle, FaTwitter } from "react-icons/fa";

export default function Page() {
  const logInWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.error("Failed to log in with google", e);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <Link href="/" className="mb-16">
        <Image
          src="/icons/svg-icon.svg"
          alt="CodeToImg Logo"
          width={80}
          height={80}
          className="object-contain"
        />
      </Link>
      <div className="border-gray-100 dark:border-gray-800 border p-8 rounded-xl max-w-[520px] w-full space-y-8">
        <p className="text-center">Log in with</p>
        <div className="grid gap-4 grid-cols-2">
          <button
            className="flex px-4 h-12 rounded-md border border-gray-100 dark:border-gray-800 items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 gap-2 hover:text-gray-900 dark:hover:text-gray-50"
            onClick={logInWithGoogle}
          >
            <FaGoogle className="text-lg" />
            Google
          </button>
          <button className="flex px-4 h-12 rounded-md border border-gray-100 dark:border-gray-800 items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 gap-2 hover:text-gray-900 dark:hover:text-gray-50">
            <FaGithub className="text-lg" />
            GitHub
          </button>
          <button className="flex px-4 h-12 rounded-md border border-gray-100 dark:border-gray-800 items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 gap-2 hover:text-gray-900 dark:hover:text-gray-50">
            <FaTwitter className="text-lg" />
            Twitter
          </button>
          <button className="flex px-4 h-12 rounded-md border border-gray-100 dark:border-gray-800 items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 gap-2 hover:text-gray-900 dark:hover:text-gray-50">
            <FaFacebook className="text-lg" />
            Facebook
          </button>
        </div>
        <p className="text-center">
          By signing in, you agree to our{" "}
          <Link
            className="text-primary-400 hover:text-primary-500 font-medium"
            href="/info/terms-of-service"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            className="text-primary-400 hover:text-primary-500 font-medium"
            href="/info/privacy-policy"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
