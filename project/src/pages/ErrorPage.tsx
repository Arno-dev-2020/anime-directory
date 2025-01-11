import React from 'react';
import { useRouteError } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';

const ErrorPage = () => {
  const error = useRouteError();
  
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <ErrorMessage
        title="Page Not Found"
        message={error instanceof Error ? error.message : 'The page you are looking for does not exist.'}
      />
    </div>
  );
};

export default ErrorPage; 