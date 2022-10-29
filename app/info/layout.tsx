import Header from "app/header";
import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="mx-auto px-4 lg:px-6 max-w-4xl my-8">{children}</main>
    </>
  );
};

export default Layout;
