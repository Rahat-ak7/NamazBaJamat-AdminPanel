'use client';

import { useEffect, useState } from 'react';
import { Mosque } from '@/types/approveMosque';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getMosqueIcon } from '@/utils/map-utils';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MosqueMapProps {
  mosques: Mosque[];
  onMosqueClick: (mosque: Mosque) => void;
}

// Component to fit map bounds to markers
function FitBoundsToMarkers({ mosques }: { mosques: Mosque[] }) {
  const map = useMap();

  useEffect(() => {
    if (mosques.length > 0) {
      const bounds = L.latLngBounds(
        mosques.map(mosque => [
          mosque.masjidAddress.coordinates.lat,
          mosque.masjidAddress.coordinates.lng
        ])
      );
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [map, mosques]);

  return null;
}

export default function MosqueMap({ mosques, onMosqueClick }: MosqueMapProps) {
  const [isClient, setIsClient] = useState(false);
  const [popupOpen, setPopupOpen] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (mosques.length === 0) {
    return (
      <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">🗺️</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-700">No Mosques Found</h3>
          <p className="text-gray-500 mt-1">No mosque locations available to display on the map.</p>
        </div>
      </div>
    );
  }

  // Calculate center point for the map
  const calculateCenter = () => {
    if (mosques.length === 0) return [0, 0] as [number, number];
    
    const total = mosques.reduce(
      (acc, mosque) => {
        return {
          lat: acc.lat + mosque.masjidAddress.coordinates.lat,
          lng: acc.lng + mosque.masjidAddress.coordinates.lng
        };
      },
      { lat: 0, lng: 0 }
    );

    return [
      total.lat / mosques.length,
      total.lng / mosques.length
    ] as [number, number];
  };

  const center = calculateCenter();

  return (
    <div className="h-96 bg-gray-100 rounded-lg overflow-hidden relative">
      <MapContainer
        center={center}
        zoom={8}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        {/* Light theme tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Alternative theme options (uncomment one): */}
        
        {/* Dark theme */}
        {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        /> */}
      
        
        <FitBoundsToMarkers mosques={mosques} />
        
        {mosques.map((mosque) => (
          <Marker
            key={mosque._id}
            position={[
              mosque.masjidAddress.coordinates.lat,
              mosque.masjidAddress.coordinates.lng
            ]}
            icon={getMosqueIcon(mosque.maslik)}
            eventHandlers={{
              click: () => {
                // Only open the popup on marker click
                setPopupOpen(mosque._id);
              }
            }}
          >
            <Popup
              eventHandlers={{
                // Prevent click events from propagating to the marker
                click: (e) => {
                  e.originalEvent.stopPropagation();
                }
              }}
            >
              <div className="p-2 min-w-[200px]">
                <h3 className="font-semibold text-gray-900 mb-2">{mosque.name}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Maslik:</strong> {mosque.maslik}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>City:</strong> {mosque.city}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Province:</strong> {mosque.province}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Contact:</strong> {mosque.contactInfo}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent event from reaching the marker
                    onMosqueClick(mosque);
                  }}
                  className="w-full bg-primary text-white py-1 px-3 rounded text-sm hover:bg-opacity-90 transition-colors"
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map controls overlay */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-3">
        <div className="text-sm font-medium text-gray-700 mb-2">
          🕌 {mosques.length} Mosques
        </div>
        <div className="space-y-1 text-xs text-gray-500">
          <div>Click on markers for details</div>
          <div>Scroll to zoom</div>
        </div>
      </div>

      {/* Quick mosque list for mobile */}
      <div className="absolute bottom-4 left-4 right-4 md:hidden">
        <div className="bg-white rounded-lg shadow-md p-3 max-h-32 overflow-y-auto">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Nearby Mosques</h4>
          <div className="space-y-1">
            {mosques.slice(0, 3).map((mosque) => (
              <button
                key={mosque._id}
                onClick={() => onMosqueClick(mosque)}
                className="w-full text-left p-2 hover:bg-gray-50 rounded text-sm"
              >
                <div className="font-medium">{mosque.name}</div>
                <div className="text-xs text-gray-500">{mosque.city}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}