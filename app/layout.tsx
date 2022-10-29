import AuthProvider from "contexts/auth-context";
import React from "react";
import "styles/global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>CodeToImg</title>
      </head>
      <body className="bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
