import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen min-w-screen">
      {children}
    </div>
  );
};

export default Layout;
