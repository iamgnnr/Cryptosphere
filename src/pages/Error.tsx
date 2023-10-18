import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid'



const ErrorPage = () => {

  return (
    <>
      <Link to='/'>
        <ArrowLeftIcon className="h-6 w-6 text-zinc-200" />
      </Link>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-6xl font-semibold">Oops!</h1>
          <p className="text-2xl mt-4">Something went wrong.</p>
          <p className="text-lg mt-2">We're sorry, but an error occurred while processing your request.</p>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
