import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid'



const NotFoundPage = () => {
  return (
    <>
      <Link to='/'>
        <ArrowLeftIcon className="h-6 w-6 text-zinc-200" />
      </Link>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-6xl font-semibold">404</h1>
          <p className="text-2xl mt-4">Page Not Found</p>
          <p className="text-lg mt-2">Sorry, the page you are looking for does not exist.</p>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
