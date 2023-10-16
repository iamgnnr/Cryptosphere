
const Layout = ({children}) => {
  return (
    <div className="bg-slate-900 min-h-screen min-w-fit flex items-center justify-center rounded-md">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        {children}
      </div>
    </div>
  );
};

export default Layout;
