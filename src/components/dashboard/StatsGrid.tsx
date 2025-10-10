"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@/lib/dashboard-api";
import { useAuth } from "@/hooks/useAuth";

export default function StatsGrid() {
  const { token } = useAuth();
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dashboard-stats",token],
    queryFn: dashboardApi.getStats,
    enabled: !!token,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <p className="text-red-500">Failed to load statistics</p>
      </div>
    );
  }

  const statsData = [
    {
      title: "Total Mosques",
      value: stats
        ? (stats.approvedMasjids + stats.pendingMasjids).toString()
        : "0",
      change: "+0",
      icon: "🕌",
      color: "bg-blue-500",
    },
    {
      title: "Active Visitors",
      value: stats?.subscribedVisitors.toString() || "0",
      change: "+0%",
      icon: "👥",
      color: "bg-green-500",
    },
    {
      title: "Pending Requests",
      value: stats?.pendingMasjids.toString() || "0",
      change: "+0",
      icon: "📋",
      color: "bg-orange-500",
    },
    {
      title: "Approved Mosques",
      value: stats?.approvedMasjids.toString() || "0",
      change: "+0",
      icon: "✅",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">
                {stat.title}
              </p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-green-600 mt-1">{stat.change}</p>
            </div>
            <div
              className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-white text-xl`}
            >
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
