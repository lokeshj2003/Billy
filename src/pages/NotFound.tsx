import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home, MessageSquare } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center text-white px-4">
      <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center mb-6 border border-white/20">
        <ShieldAlert className="w-9 h-9 text-indigo-300" />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight mb-2">404 - Page Not Found</h1>
      <p className="text-indigo-200 max-w-md mb-8 text-sm">
        The destination you are looking for does not exist or has been relocated.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white text-indigo-900 rounded-xl font-medium text-sm hover:bg-indigo-50 transition shadow-lg"
        >
          <Home className="w-4 h-4" />
          <span>Back to Safety Home</span>
        </Link>
        <Link
          to="/chat"
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium text-sm transition shadow-lg"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Talk with Billy</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

