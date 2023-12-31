import { ReactNode } from 'react';



interface GridLayoutProps {
  children: ReactNode;
}


const GridLayout: React.FC<GridLayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto my-10 px-4 sm:px-6 lg:px-8 grid gap-4 gap-x-14 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {children}
    </div>
  );
};

export default GridLayout;

