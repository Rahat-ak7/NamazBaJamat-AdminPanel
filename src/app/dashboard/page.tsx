export default function DashboardHome() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total Mosques', value: '24', change: '+2' },
          { title: 'Active Visitors', value: '1,234', change: '+12%' },
          { title: 'Pending Requests', value: '5', change: '-1' },
          { title: 'New Subscribers', value: '32', change: '+5' },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
            <p className="text-2xl font-semibold mt-1">{stat.value}</p>
            <p className="text-sm mt-2 text-green-600">{stat.change} from last week</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { id: 1, mosque: 'Masjid Al-Rahman', action: 'New subscription', time: '2 hours ago' },
            { id: 2, mosque: 'Masjid Al-Noor', action: 'Updated prayer times', time: '5 hours ago' },
            { id: 3, mosque: 'Masjid Al-Huda', action: 'New request', time: '1 day ago' },
          ].map((activity) => (
            <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div className="h-10 w-10 rounded-full bg-secondary bg-opacity-20 flex items-center justify-center text-secondary mr-4">
                {activity.mosque.charAt(0)}
              </div>
              <div>
                <p className="font-medium">{activity.mosque}</p>
                <p className="text-sm text-gray-500">{activity.action} • {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}