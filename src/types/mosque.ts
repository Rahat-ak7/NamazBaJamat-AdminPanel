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
  id: string;
  name: string;
  address: string;
  city: string;
  province: string;
  country: string;
  contactInfo: string;
  profilePic?: string;
  landmarks: string[];
  mosqueType: string;
  floors: number | null;
  jummaPrayer: string;
  eidPrayer: string;
  parkingFacility: string;
  maghribDelay: string;
  womenPrayerArea: string;
  womenWuzuArea: string;
  prayerTimings: string;
  imam: Imam;
  createdAt: string;
  updatedAt: string;
  status: string;
}

export interface MosqueFilters {
  province: string;
  mosqueType: string;
  search: string;
}