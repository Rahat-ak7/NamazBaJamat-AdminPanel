import { apiClient } from './api-client';
import { Mosque, MosqueResponse } from '@/types/approveMosque';

export const mosqueApi = {
  getApprovedMosques: async (): Promise<Mosque[]> => {
    const response = await apiClient.get<MosqueResponse>('/admin/masjids/approved');
    return response.data.masjids;
  },

  deleteMosque: async (mosqueId: string): Promise<{ message: string }> => {
    const response = await apiClient.delete(`/admin/delete/${mosqueId}`);
    return response.data;
  },
};