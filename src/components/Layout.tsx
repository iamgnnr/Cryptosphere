
const Layout = ({ children }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {children}
    </div>
  );
};

export default Layout;

