import VisitorCount from "@/components/visitor/VisitorCount";
import VisitorsList from "@/components/visitor/VisitorsList";

export default function VisitorsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Visitors Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage subscribed and unsubscribed visitors
          </p>
        </div>
      </div>
      {/* Stats Cards */}
      <VisitorCount />
      {/* Visitors List */}
      <VisitorsList />
    </div>
  );
}
