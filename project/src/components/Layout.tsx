import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import ErrorBoundary from './ErrorBoundary';

const Layout = () => {
  return (
    <div className="min-h-screen bg-black">
      <ErrorBoundary>
        <Navbar />
        <main>
          <Outlet />
        </main>
      </ErrorBoundary>
    </div>
  );
};

export default Layout; 