// import React from "react";

// export default function MasjidType() {
//   return (
//     <div className="mt-8 pt-6 border-t border-gray-200">
//       <h3 className="text-lg font-semibold text-gray-900 mb-4">Majid Type</h3>
//       <div className="space-y-3">
//         {[
//           {
//             mosqueType: "Jamiya",
//             count: "3",
//           },
//           {
//             mosqueType: "Ghair Jamiya",
//             count: "2",
//           },
         
//         ].map((event, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-100"
//           >
//             <div>
//               <p className="font-medium text-blue-900">{event.mosqueType}</p>
//             </div>
//             <div className="text-right">
//               <p className="text-sm font-medium text-blue-900">{event.count}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


'use client';

import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { dashboardApi } from '@/lib/dashboard-api';

export default function MasjidType() {
  const { data: jummahData, isLoading, error } = useQuery({
    queryKey: ['jummah-count'],
    queryFn: dashboardApi.getJummahCount,
  });

  if (isLoading) {
    return (
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Masjid Type Distribution</h3>
        <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Masjid Type Distribution</h3>
        <div className="p-4 bg-red-50 rounded-lg">
          <p className="text-red-500 text-sm">Failed to load masjid type data</p>
        </div>
      </div>
    );
  }

  const chartData = [
    { name: 'Jamiya', count: jummahData?.jamiya || 0 },
    { name: 'Gair Jamiya', count: jummahData?.gairJamiya || 0 },
  ];

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Masjid Type Distribution</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}