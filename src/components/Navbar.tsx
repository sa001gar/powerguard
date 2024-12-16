import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Bell } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 flex-wrap gap-4">
          <div className="flex items-center">
            <Activity className="w-8 h-8 text-blue-500" />
            <span className="ml-2 text-xl font-semibold hidden sm:inline">
              PowerGuard AI
            </span>
            <span className="ml-2 text-xl font-semibold sm:hidden">
              E-Monitor
            </span>
          </div>
          
          <div className="flex space-x-2 sm:space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-blue-50'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/alerts"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/alerts'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-blue-50'
              }`}
            >
              <Bell className="w-4 h-4 mr-1" />
              Alerts
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;