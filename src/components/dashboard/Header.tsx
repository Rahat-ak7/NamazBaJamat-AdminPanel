'use client';

import { MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/outline';

export default function DashboardHeader() {
  return (
    <header className="bg-white shadow-sm h-16 border-b border-gray-100">
      <div className="flex items-center justify-between px-6 h-full">
        {/* Search Bar */}
        <div className="relative w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search anything..."
            className="block w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          />
        </div>
        
        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
       

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-sm">
              A
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}