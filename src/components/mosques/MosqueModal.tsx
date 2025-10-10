"use client";

import { Mosque } from "@/types/approveMosque";
import {
  XMarkIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

interface MosqueModalProps {
  mosque: Mosque | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MosqueModal({
  mosque,
  isOpen,
  onClose,
}: MosqueModalProps) {
  if (!isOpen || !mosque) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999] p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-primary">
            {mosque.name} Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Mosque Image */}
          {mosque.masjidPic && (
            <div className="relative h-48 w-full rounded-lg overflow-hidden">
              <img
                src={mosque.masjidPic}
                alt={mosque.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Mosque General Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                General Details
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Name
                  </span>
                  <p className="text-gray-900">{mosque.name}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Maslik
                  </span>
                  <p className="text-gray-900 capitalize">{mosque.maslik}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Address
                  </span>
                  <p className="text-gray-900">
                    {mosque.masjidAddress.address}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    City
                  </span>
                  <p className="text-gray-900">{mosque.city}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Province
                  </span>
                  <p className="text-gray-900">{mosque.province}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Contact Info
                  </span>
                  <p className="text-gray-900">{mosque.contactInfo}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Nearby Landmark
                  </span>
                  <p className="text-gray-900">{mosque.nearbyLandmark}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Country
                  </span>
                  <p className="text-gray-900">{mosque.country}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Maghrib Delay
                  </span>
                  <p className="text-gray-900">{mosque.magribPrayerDelay}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Facilities */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Facilities
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div
                className={`p-3 rounded-lg ${
                  mosque.jummahPrayer === "yes"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                <span className="text-sm font-medium">Jumma Prayer</span>
                <p className="font-semibold">
                  {mosque.jummahPrayer === "yes" ? "Yes" : "No"}
                </p>
              </div>
              <div
                className={`p-3 rounded-lg ${
                  mosque.eidPrayer === "yes"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                <span className="text-sm font-medium">Eid Prayer</span>
                <p className="font-semibold">
                  {mosque.eidPrayer === "yes" ? "Yes" : "No"}
                </p>
              </div>
              <div
                className={`p-3 rounded-lg ${
                  mosque.parkingFacility === "yes"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                <span className="text-sm font-medium">Parking</span>
                <p className="font-semibold">
                  {mosque.parkingFacility === "yes" ? "Yes" : "No"}
                </p>
              </div>
              <div
                className={`p-3 rounded-lg ${
                  mosque.womenFacility === "yes"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                <span className="text-sm font-medium">Women Facility</span>
                <p className="font-semibold">
                  {mosque.womenFacility === "yes" ? "Yes" : "No"}
                </p>
              </div>
              <div
                className={`p-3 rounded-lg ${
                  mosque.prayerArea === "yes"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                <span className="text-sm font-medium">Prayer Area</span>
                <p className="font-semibold">
                  {mosque.prayerArea === "yes" ? "Yes" : "No"}
                </p>
              </div>
              <div
                className={`p-3 rounded-lg ${
                  mosque.wazuArea === "yes"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                <span className="text-sm font-medium">Wazu Area</span>
                <p className="font-semibold">
                  {mosque.wazuArea === "yes" ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>

          {/* Prayer Timings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Prayer Timings
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {mosque.prayerTimings.map((prayer) => (
                  <div
                    key={prayer._id}
                    className={`p-3 rounded-lg ${
                      prayer.isOffered
                        ? "bg-green-50 border border-green-200"
                        : "bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">
                        {prayer.name}
                      </span>
                      <span
                        className={`text-sm font-semibold ${
                          prayer.isOffered ? "text-green-700" : "text-gray-500"
                        }`}
                      >
                        {prayer.time === "0" ? "Not set" : prayer.time}
                      </span>
                    </div>
                    {!prayer.isOffered && (
                      <p className="text-xs text-red-600 mt-1">Not offered</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coordinates */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Location Coordinates
            </h3>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center">
                <GlobeAltIcon className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-800">
                  Latitude:{" "}
                </span>
                <span className="text-sm text-blue-600 ml-1">
                  {mosque.masjidAddress.coordinates.lat}
                </span>
                <span className="text-sm font-medium text-blue-800 ml-4">
                  Longitude:{" "}
                </span>
                <span className="text-sm text-blue-600 ml-1">
                  {mosque.masjidAddress.coordinates.lng}
                </span>
              </div>
            </div>
          </div>

          {/* Imam Details */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Imam Details
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                  {mosque?.imam?.name?.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">
                    {mosque?.imam?.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {mosque?.imam?.designation}
                  </p>
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
        </div>
      </div>
    </div>
  );
}
