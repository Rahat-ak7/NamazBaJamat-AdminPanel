
'use client';

import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/dashboard-api';

export default function RecentActivity() {
  const { data: activities, isLoading, error } = useQuery({
    queryKey: ['recent-activities'],
    queryFn: dashboardApi.getRecentActivity,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center p-4 rounded-lg bg-gray-50 animate-pulse">
            <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-red-50 border border-red-100">
        <p className="text-red-500 text-sm">Failed to load recent activities</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities?.slice(0, 5).map((activity) => (
        <div
          key={activity._id}
          className="flex items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
        >
          <div className="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center text-primary text-lg mr-4">
            🕋
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-900">{activity.name}</p>
              <span className="text-xs text-gray-500">
                {new Date(activity.updatedAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Updated</p>
          </div>
        </div>
      ))}
      {(!activities || activities.length === 0) && (
        <p className="text-gray-500 text-center py-4">No recent activity</p>
      )}
    </div>
  );
}