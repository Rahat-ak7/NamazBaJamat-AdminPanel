'use client';

import { useQuery } from '@tanstack/react-query';
import { UserGroupIcon, UserIcon } from "@heroicons/react/24/outline";
import { visitorApi } from '@/lib/visitor-api';

export default function VisitorCount() {
  const { data: countData, isLoading, error } = useQuery({
    queryKey: ['visitor-count'],
    queryFn: visitorApi.getVisitorCount,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-pulse">
            <div className="flex items-center">
              <div className="p-3 bg-gray-200 rounded-lg"></div>
              <div className="ml-4">
                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-12"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <p className="text-red-500">Failed to load visitor statistics</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Visitors */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center">
          <div className="p-3 bg-blue-100 rounded-lg">
            <UserGroupIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-600">Total Visitors</p>
            <p className="text-2xl font-bold text-gray-900">
              {countData?.totalVisitors || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Subscribed */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center">
          <div className="p-3 bg-green-100 rounded-lg">
            <UserIcon className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-600">Subscribed</p>
            <p className="text-2xl font-bold text-green-600">
              {countData?.Subscribed || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Unsubscribed */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center">
          <div className="p-3 bg-orange-100 rounded-lg">
            <UserIcon className="h-6 w-6 text-orange-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-600">Unsubscribed</p>
            <p className="text-2xl font-bold text-orange-600">
              {countData?.Unsubscribed || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}