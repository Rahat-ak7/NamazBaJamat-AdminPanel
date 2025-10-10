'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Visitor, VisitorFilters } from '@/types/visitor';
import { visitorApi } from '@/lib/visitor-api';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import DeleteVisitorModal from './DeleteVisitorModal';
import toast from 'react-hot-toast';

export default function VisitorsList() {
  const [filters, setFilters] = useState<VisitorFilters>({
    subscriptionStatus: 'all',
    search: '',
  });
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; visitor: Visitor | null }>({
    isOpen: false,
    visitor: null,
  });

  const queryClient = useQueryClient();

  const { data: visitors, isLoading, error } = useQuery({
    queryKey: ['visitors'],
    queryFn: visitorApi.getVisitors,
  });

  const deleteMutation = useMutation({
    mutationFn: visitorApi.deleteVisitor,
    onSuccess: () => {
      toast.success('Visitor deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['visitors'] });
      queryClient.invalidateQueries({ queryKey: ['visitor-count'] });
      setDeleteModal({ isOpen: false, visitor: null });
    },
    onError: () => {
      toast.error('Failed to delete visitor');
    },
  });

  const filteredVisitors = visitors?.filter((visitor) => {
    const matchesStatus =
      filters.subscriptionStatus === 'all' ||
      visitor.subscriptionStatus === filters.subscriptionStatus;
    
    const matchesSearch =
      visitor.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      visitor.email.toLowerCase().includes(filters.search.toLowerCase()) ||
      visitor.location.address.toLowerCase().includes(filters.search.toLowerCase());

    return matchesStatus && matchesSearch;
  }) || [];

  const handleDelete = (visitor: Visitor) => {
    setDeleteModal({ isOpen: true, visitor });
  };

  const confirmDelete = () => {
    if (deleteModal.visitor) {
      deleteMutation.mutate(deleteModal.visitor._id);
    }
  };



  if (isLoading) {
    return (
      <div className="space-y-4">
        {/* Filters Skeleton */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Visitors List Skeleton */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 border-b border-gray-200 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
                <div className="h-8 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <p className="text-red-500">Failed to load visitors</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <FunnelIcon className="h-5 w-5 text-gray-400" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search visitors..."
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subscription Status
            </label>
            <select
              value={filters.subscriptionStatus}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  subscriptionStatus: e.target.value as any,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="subscribed">Subscribed</option>
              <option value="unsubscribed">Unsubscribed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Visitors List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Visitors List ({filteredVisitors.length})
          </h3>
        </div>

        {filteredVisitors.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500">No visitors found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredVisitors.map((visitor) => (
              <div
                key={visitor._id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`h-12 w-12 rounded-full flex items-center justify-center ${
                        visitor.subscriptionStatus === 'subscribed'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-orange-100 text-orange-600'
                      }`}
                    >
                      {visitor.name.charAt(0)}
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {visitor.name}
                      </h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <EnvelopeIcon className="h-4 w-4 mr-1" />
                          {visitor.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <PhoneIcon className="h-4 w-4 mr-1" />
                          {visitor.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          {visitor.location.address}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                
                    
                    <button
                      onClick={() => handleDelete(visitor)}
                      disabled={deleteMutation.isPending}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete Visitor"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>

                    <div className="text-right">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          visitor.subscriptionStatus === 'subscribed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}
                      >
                        {visitor.subscriptionStatus === 'subscribed'
                          ? 'Subscribed'
                          : 'Unsubscribed'}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        Joined: {new Date(visitor.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteVisitorModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, visitor: null })}
        onConfirm={confirmDelete}
        visitorName={deleteModal.visitor?.name || ''}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}