"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Mosque } from "@/types/mosque";
import { requestsApi } from "@/lib/requests-api";
import RequestModal from "@/components/requests/RequestModal";
import ConfirmationModal from "@/components/requests/ConfirmationModal";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  BuildingLibraryIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

export default function RequestsPage() {
  const [filters, setFilters] = useState({
    province: "all",
    mosqueType: "all",
    search: "",
  });
  const [selectedMosque, setSelectedMosque] = useState<Mosque | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch pending masjids
  const { data: requests, isLoading, error } = useQuery({
    queryKey: ['pending-masjids'],
    queryFn: requestsApi.getPendingMasjids,
  });

  // Approve mutation
  const approveMutation = useMutation({
    mutationFn: requestsApi.approveMasjid,
    onSuccess: () => {
      toast.success("Mosque approved successfully");
      queryClient.invalidateQueries({ queryKey: ['pending-masjids'] });
      setIsApproveModalOpen(false);
      setIsDetailModalOpen(false);
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Failed to approve mosque";
      toast.error(errorMessage);
    },
  });

  // Reject mutation
  const rejectMutation = useMutation({
    mutationFn: requestsApi.rejectMasjid,
    onSuccess: () => {
      toast.success("Mosque rejected successfully");
      queryClient.invalidateQueries({ queryKey: ['pending-masjids'] });
      setIsRejectModalOpen(false);
      setIsDetailModalOpen(false);
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Failed to reject mosque";
      toast.error(errorMessage);
    },
  });

  const filteredRequests = requests?.filter((mosque) => {
    const matchesProvince =
      filters.province === "all" || mosque.province === filters.province;
    const matchesType =
      filters.mosqueType === "all" || mosque.mosqueType === filters.mosqueType;
    const matchesSearch =
      mosque.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      mosque.city.toLowerCase().includes(filters.search.toLowerCase()) ||
      mosque.imam.name.toLowerCase().includes(filters.search.toLowerCase());

    return matchesProvince && matchesType && matchesSearch;
  }) || [];

  const uniqueProvinces = [...new Set(requests?.map((m) => m.province) || [])];
  const uniqueTypes = [...new Set(requests?.map((m) => m.mosqueType) || [])];

  const handleViewDetails = (mosque: Mosque) => {
    setSelectedMosque(mosque);
    setIsDetailModalOpen(true);
  };

  const handleApprove = (mosqueId: string) => {
    setSelectedMosque(requests?.find(m => m.id === mosqueId) || null);
    setIsApproveModalOpen(true);
  };

  const handleReject = (mosqueId: string) => {
    setSelectedMosque(requests?.find(m => m.id === mosqueId) || null);
    setIsRejectModalOpen(true);
  };

  const confirmApprove = () => {
    if (selectedMosque) {
      approveMutation.mutate(selectedMosque.id);
    }
  };

  const confirmReject = () => {
    if (selectedMosque) {
      rejectMutation.mutate(selectedMosque.id);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Failed to load pending requests</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Mosque Requests</h1>
          <p className="text-gray-600 mt-1">
            Review and manage new mosque registration requests
          </p>
        </div>
        <div className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
          {filteredRequests.length} Pending Requests
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <FunnelIcon className="h-5 w-5 text-gray-400" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search requests..."
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Province Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Province
            </label>
            <select
              value={filters.province}
              onChange={(e) =>
                setFilters({ ...filters, province: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Provinces</option>
              {uniqueProvinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>

          {/* Mosque Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mosque Type
            </label>
            <select
              value={filters.mosqueType}
              onChange={(e) =>
                setFilters({ ...filters, mosqueType: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Types</option>
              {uniqueTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Pending Requests ({filteredRequests.length})
          </h3>
        </div>

        {filteredRequests.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ClockIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No pending requests
            </h3>
            <p className="text-gray-500">
              All mosque requests have been processed.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mosque
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Imam
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRequests?.map((mosque) => (
                  <tr
                    key={mosque.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-primary bg-opacity-20 rounded-lg flex items-center justify-center">
                          <BuildingLibraryIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {mosque.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {mosque.contactInfo}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                        {mosque.mosqueType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        {mosque.city}, {mosque.province}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {mosque?.imam?.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {mosque?.imam?.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {new Date(mosque?.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleViewDetails(mosque)}
                        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors text-sm mr-2"
                      >
                        <EyeIcon className="h-4 w-4 inline mr-1" />
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <RequestModal
        mosque={selectedMosque}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      {/* Approve Confirmation Modal */}
      <ConfirmationModal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        onConfirm={confirmApprove}
        title="Approve Mosque"
        message="Are you sure you want to approve this mosque request?"
        confirmText="Yes, Approve"
        confirmColor="bg-green-600 hover:bg-green-700"
        icon={<CheckCircleIcon className="h-12 w-12 text-green-500" />}
      />

      {/* Reject Confirmation Modal */}
      <ConfirmationModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={confirmReject}
        title="Reject Mosque"
        message="Are you sure you want to reject this mosque request?"
        confirmText="Yes, Reject"
        confirmColor="bg-red-600 hover:bg-red-700"
        icon={<XCircleIcon className="h-12 w-12 text-red-500" />}
      />
    </div>
  );
}