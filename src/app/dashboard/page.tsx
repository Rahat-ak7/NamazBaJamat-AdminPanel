import MajidMasliq from "@/components/dashboard/MasjidMasliq";
import MajidType from "@/components/dashboard/MasjidType";
import MasjidTrafic from "@/components/dashboard/MasjidTrafic";
import RecentActivity from "@/components/dashboard/RecentActivity";
import StatsGrid from "@/components/dashboard/StatsGrid";

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Dashboard Overview
          </h1> 
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening with your mosques today.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <StatsGrid />
      
      {/* Charts and Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Charts */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <MasjidTrafic />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <MajidMasliq />
          </div>
        </div>

        {/* Right Column - Activity and Types */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Activity
              </h2>
            </div>
            <RecentActivity />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <MajidType />
          </div>
        </div>
      </div>
    </div>
  );
}