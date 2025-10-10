import { apiClient } from './api-client';

export interface StatsData {
  subscribedVisitors: number;
  unsubscribedVisitors: number;
  pendingMasjids: number;
  approvedMasjids: number;
}

export interface RecentActivity {
  _id: string;
  name: string;
  updatedAt: string;
}

export interface MaslikCount {
  maslik: string;
  count: number;
}

export interface JummahCount {
  jamiya: number;
  gairJamiya: number;
}

export interface ProvinceCount {
  province: string;
  count: number;
}

export const dashboardApi = {
  getStats: async (): Promise<StatsData> => {
    const response = await apiClient.get<{ message: string; stats: StatsData }>('/admin/stats');
    return response.data.stats;
  },

  getRecentActivity: async (): Promise<RecentActivity[]> => {
    const response = await apiClient.get<{ message: string; recentMasjids: RecentActivity[] }>('/admin/masjids_recent_activity');
    return response.data.recentMasjids;
  },

  getMaslikCount: async (): Promise<MaslikCount[]> => {
    const response = await apiClient.get<{ message: string; data: MaslikCount[] }>('/admin/maslik-count');
    return response.data.data;
  },

  getJummahCount: async (): Promise<JummahCount> => {
    const response = await apiClient.get<{ message: string; jamiya: number; gairJamiya: number }>('/admin/jummah-count');
    return { jamiya: response.data.jamiya, gairJamiya: response.data.gairJamiya };
  },

  getProvinceCount: async (): Promise<ProvinceCount[]> => {
    const response = await apiClient.get<{ message: string; data: ProvinceCount[] }>('/admin/province-count');
    return response.data.data;
  },
};