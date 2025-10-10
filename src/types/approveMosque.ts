export interface PrayerTiming {
  _id: string;
  name: string;
  time: string;
  isOffered: boolean;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface MosqueAddress {
  coordinates: Coordinates;
  address: string;
}

export interface Imam {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  designation: string;
  profilePic?: string;
}

export interface Mosque {
  _id: string;
  name: string;
  maslik: string;
  city: string;
  province: string;
  country: string;
  contactInfo: string;
  nearbyLandmark: string;
  masjidPic: string;
  jummahPrayer: string;
  eidPrayer: string;
  parkingFacility: string;
  magribPrayerDelay: string;
  womenFacility: string;
  prayerArea: string;
  wazuArea: string;
  status: string;
  role: string;
  prayerTimings: PrayerTiming[];
  masjidAddress: MosqueAddress;
  imam: Imam;
  createdAt: string;
  updatedAt: string;
}

export interface MosqueFilters {
  province: string;
  maslik: string;
  search: string;
}

export interface MosqueResponse {
  success: boolean;
  count: number;
  masjids: Mosque[];
}
