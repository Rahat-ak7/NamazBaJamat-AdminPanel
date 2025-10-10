"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Mosque, MosqueFilters } from "@/types/approveMosque";
import { mosqueApi } from "@/lib/mosque-api";
import MosqueModal from "@/components/mosques/MosqueModal";
import DeleteModal from "@/components/mosques/DeleteModal";
import MosqueMap from "@/components/mosques/MosqueMap";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  TrashIcon,
  BuildingLibraryIcon,
  MapPinIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

export default function MosquesPage() {
  const [filters, setFilters] = useState<MosqueFilters>({
    province: "all",
    maslik: "all",
    search: "",
  });
  const [selectedMosque, setSelectedMosque] = useState<Mosque | null>(null);
  const [deleteMosque, setDeleteMosque] = useState<Mosque | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch approved mosques
  const { data: mosques = [], isLoading, error } = useQuery({
    queryKey: ['approved-mosques'],
    queryFn: mosqueApi.getApprovedMosques,
  });

  // Delete mosque mutation
  const deleteMutation = useMutation({
    mutationFn: mosqueApi.deleteMosque,
    onSuccess: () => {
      toast.success('Mosque deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['approved-mosques'] });
      setIsDeleteModalOpen(false);
      setDeleteMosque(null);
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Failed to delete mosque";
      toast.error(errorMessage);
    }
  });

  const filteredMosques = mosques.filter((mosque) => {
    const matchesProvince =
      filters.province === "all" || mosque.province === filters.province;
    const matchesMaslik =
      filters.maslik === "all" || mosque.maslik === filters.maslik;
    const matchesSearch =
      mosque.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      mosque.city.toLowerCase().includes(filters.search.toLowerCase()) ||
      mosque.contactInfo.toLowerCase().includes(filters.search.toLowerCase());

    return matchesProvince && matchesMaslik && matchesSearch;
  });

  const uniqueProvinces = [...new Set(mosques.map((m) => m.province))];
  const uniqueMasliks = [...new Set(mosques.map((m) => m.maslik))];

  const handleViewDetails = (mosque: Mosque) => {
    setSelectedMosque(mosque);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (mosque: Mosque) => {
    setDeleteMosque(mosque);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteMosque) {
      deleteMutation.mutate(deleteMosque._id);
    }
  };

  const handleMosqueMapClick = (mosque: Mosque) => {
    setSelectedMosque(mosque);
    setIsModalOpen(true);
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Failed to load mosques</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Mosques Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage approved mosque details and information
          </p>
        </div>
      </div>

      {/* Mosque Map */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Mosque Locations ({mosques.length} mosques)
        </h2>
        <MosqueMap mosques={mosques} onMosqueClick={handleMosqueMapClick} />
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
                placeholder="Search mosques..."
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

          {/* Maslik Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maslik
            </label>
            <select
              value={filters.maslik}
              onChange={(e) =>
                setFilters({ ...filters, maslik: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Masliks</option>
              {uniqueMasliks.map((maslik) => (
                <option key={maslik} value={maslik}>
                  {maslik}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mosques Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Approved Mosques ({filteredMosques.length})
          </h3>
        </div>

        {filteredMosques.length === 0 ? (
          <div className="p-12 text-center">
            <BuildingLibraryIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No mosques found</h3>
            <p className="text-gray-500">No mosques match your search criteria.</p>
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
                    Maslik
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Facilities
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMosques.map((mosque) => (
                  <tr
                    key={mosque._id}
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
                            {mosque.city}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                        {mosque.maslik}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        {mosque.province}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {mosque.contactInfo}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-1">
                        {mosque.jummahPrayer === 'yes' && (
                          <span
                            className="inline-block h-2 w-2 rounded-full bg-green-400"
                            title="Jumma Prayer"
                          />
                        )}
                        {mosque.parkingFacility === 'yes' && (
                          <span
                            className="inline-block h-2 w-2 rounded-full bg-blue-400"
                            title="Parking"
                          />
                        )}
                        {mosque.womenFacility === 'yes' && (
                          <span
                            className="inline-block h-2 w-2 rounded-full bg-purple-400"
                            title="Women Facility"
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleViewDetails(mosque)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(mosque)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                          disabled={deleteMutation.isPending}
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      <MosqueModal
        mosque={selectedMosque}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        mosqueName={deleteMosque?.name || ''}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}