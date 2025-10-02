const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-screen">
      {children}
    </div>
  );
};

export default Layout;
