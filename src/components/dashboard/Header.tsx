'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function DashboardHeader() {
  return (
    <header className="bg-white shadow-sm h-16 border-b border-gray-200">
      <div className="flex items-center justify-between px-6 h-full">
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
              A
            </div>
            <span className="ml-2 text-sm font-medium">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}