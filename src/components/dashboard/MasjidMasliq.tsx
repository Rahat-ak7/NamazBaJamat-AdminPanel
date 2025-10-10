'use client';

import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { dashboardApi } from '@/lib/dashboard-api';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function MasjidMasliq() {
  const { data: maslikData, isLoading, error } = useQuery({
    queryKey: ['maslik-count'],
    queryFn: dashboardApi.getMaslikCount,
  });

  if (isLoading) {
    return (
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Masjid Maslik Distribution</h3>
        <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Masjid Maslik Distribution</h3>
        <div className="p-4 bg-red-50 rounded-lg">
          <p className="text-red-500 text-sm">Failed to load maslik data</p>
        </div>
      </div>
    );
  }

  const chartData = maslikData?.map(item => ({
    name: item.maslik,
    value: item.count,
  })) || [];

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Masjid Maslik Distribution</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}