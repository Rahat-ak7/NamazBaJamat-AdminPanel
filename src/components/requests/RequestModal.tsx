'use client';

import { Mosque } from '@/types/mosque';
import { 
  XMarkIcon, 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  CheckIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

interface RequestModalProps {
  mosque: Mosque | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (mosqueId: string) => void;
  onReject: (mosqueId: string) => void;
}

export default function RequestModal({ 
  mosque, 
  isOpen, 
  onClose, 
  onApprove, 
  onReject 
}: RequestModalProps) {
  if (!isOpen || !mosque) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-primary">Mosque Request - {mosque.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Mosque General Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">General Details</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">Name</span>
                  <p className="text-gray-900">{mosque.name}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Address</span>
                  <p className="text-gray-900">{mosque.address}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">City</span>
                  <p className="text-gray-900">{mosque.city}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Province</span>
                  <p className="text-gray-900">{mosque.province}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Country</span>
                  <p className="text-gray-900">{mosque.country}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">Mosque Type</span>
                  <p className="text-gray-900 capitalize">{mosque.mosqueType}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Floors</span>
                  <p className="text-gray-900">{mosque.floors || 'Not specified'}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Contact Info</span>
                  <p className="text-gray-900">{mosque.contactInfo}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Maghrib Delay</span>
                  <p className="text-gray-900">{mosque.maghribDelay} minutes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Facilities */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Facilities</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className={`p-3 rounded-lg ${mosque.jummaPrayer === 'yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <span className="text-sm font-medium">Jumma Prayer</span>
                <p className="font-semibold">{mosque.jummaPrayer === 'yes' ? 'Yes' : 'No'}</p>
              </div>
              <div className={`p-3 rounded-lg ${mosque.eidPrayer === 'yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <span className="text-sm font-medium">Eid Prayer</span>
                <p className="font-semibold">{mosque.eidPrayer === 'yes' ? 'Yes' : 'No'}</p>
              </div>
              <div className={`p-3 rounded-lg ${mosque.parkingFacility === 'yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <span className="text-sm font-medium">Parking</span>
                <p className="font-semibold">{mosque.parkingFacility === 'yes' ? 'Yes' : 'No'}</p>
              </div>
              <div className={`p-3 rounded-lg ${mosque.womenPrayerArea === 'yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <span className="text-sm font-medium">Women Prayer Area</span>
                <p className="font-semibold">{mosque.womenPrayerArea === 'yes' ? 'Yes' : 'No'}</p>
              </div>
              <div className={`p-3 rounded-lg ${mosque.womenWuzuArea === 'yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <span className="text-sm font-medium">Women Wuzu Area</span>
                <p className="font-semibold">{mosque.womenWuzuArea === 'yes' ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>

          {/* Landmarks */}
          {mosque.landmarks && mosque.landmarks.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nearby Landmarks</h3>
              <div className="flex flex-wrap gap-2">
                {mosque.landmarks.map((landmark, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {landmark}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Imam Details */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Imam Details</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                  {mosque?.imam?.name?.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{mosque?.imam?.name}</h4>
                  <p className="text-sm text-gray-600">{mosque?.imam?.designation}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <PhoneIcon className="h-4 w-4 mr-1" />
                      {mosque?.imam?.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <EnvelopeIcon className="h-4 w-4 mr-1" />
                      {mosque?.imam?.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      {mosque?.imam?.address}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Request</h3>
            
            <div className="flex space-x-4">
              <button
                onClick={() => onApprove(mosque.id)}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                <CheckIcon className="h-5 w-5 mr-2" />
                Approve Request
              </button>
              <button
                onClick={() => onReject(mosque.id)}
                className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
              >
                <XCircleIcon className="h-5 w-5 mr-2" />
                Reject Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}