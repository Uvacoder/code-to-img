"use client";

/* eslint-disable @next/next/no-img-element */
import { User } from "firebase/auth";
import { auth } from "libs/firebase";
import { useCallback } from "react";

const UserDropdownButton = ({ user }: { user: User }) => {
  const handleLogOut = useCallback(async () => {
    try {
      await auth.signOut();
    } catch (e) {
      console.log("SIGNOUT FAILED", e);
    }
  }, []);

  return (
    <button className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800">
      <img
        src={user.photoURL}
        alt={`${user.displayName} - Avatar`}
        className="rounded-full object-cover w-8 h-8"
      />
    </button>
  );
};

export default UserDropdownButton;
