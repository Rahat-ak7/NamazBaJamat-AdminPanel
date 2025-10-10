
'use client';

import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { dashboardApi } from '@/lib/dashboard-api';

export default function MasjidTrafic() {
  const { data: provinceData, isLoading, error } = useQuery({
    queryKey: ['province-count'],
    queryFn: dashboardApi.getProvinceCount,
  });

  if (isLoading) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Masjid Distribution by Province</h2>
        <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Masjid Distribution by Province</h2>
        <div className="p-4 bg-red-50 rounded-lg">
          <p className="text-red-500 text-sm">Failed to load province data</p>
        </div>
      </div>
    );
  }

  const chartData = provinceData?.map(item => ({
    name: item.province,
    count: item.count,
  })) || [];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Masjid Distribution by Province</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" width={80} />
            <Tooltip />
            <Bar dataKey="count" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}