'use client';

import { XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface DeleteVisitorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  visitorName: string;
  isLoading?: boolean;
}

export default function DeleteVisitorModal({
  isOpen,
  onClose,
  onConfirm,
  visitorName,
  isLoading = false
}: DeleteVisitorModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Confirm Deletion</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={isLoading}
          >
            <XMarkIcon className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center mb-4">
            <ExclamationTriangleIcon className="h-12 w-12 text-yellow-500 mr-4" />
            <div>
              <p className="text-lg font-medium text-gray-900">Are you sure?</p>
              <p className="text-gray-600 mt-1">
                This will permanently delete {visitorName}'s account.
              </p>
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Delete Visitor'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}