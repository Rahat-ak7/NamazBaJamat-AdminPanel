import { apiClient } from './api-client';
import { Mosque } from '@/types/mosque';

export interface PendingMasjidsResponse {
  masjids: Mosque[];
}

export const requestsApi = {
  // Get pending masjids
  getPendingMasjids: async (): Promise<Mosque[]> => {
    const response = await apiClient.get<PendingMasjidsResponse>('/admin/masjids/pending');
    return response.data.masjids;
  },

  // Approve masjid
  approveMasjid: async (masjidId: string): Promise<{ message: string }> => {
    const response = await apiClient.put<{ message: string }>(`/admin/masjids/approve/${masjidId}`);
    return response.data;
  },

  // Reject masjid
  rejectMasjid: async (masjidId: string): Promise<{ message: string }> => {
    const response = await apiClient.delete<{ message: string }>(`/admin/masjids/reject/${masjidId}`);
    return response.data;
  },
};