import React from 'react';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-white text-center">
        <h1 className="text-6xl font-semibold">Oops!</h1>
        <p className="text-2xl mt-4">Something went wrong.</p>
        <p className="text-lg mt-2">We're sorry, but an error occurred while processing your request.</p>
        <p className="text-lg mt-2">Please try again later.</p>
      </div>
    </div>
  );
};

export default ErrorPage;
