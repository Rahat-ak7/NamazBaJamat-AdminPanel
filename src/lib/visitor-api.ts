import { apiClient } from './api-client';
import { Visitor, VisitorCount } from '@/types/visitor';

export const visitorApi = {
  getVisitors: async (): Promise<Visitor[]> => {
    const response = await apiClient.get<Visitor[]>('/visitor/');
    return response.data;
  },

  getVisitorCount: async (): Promise<VisitorCount> => {
    const response = await apiClient.get<VisitorCount>('/visitor/count');
    return response.data;
  },

  deleteVisitor: async (visitorId: string): Promise<{ message: string }> => {
    const response = await apiClient.delete<{ message: string }>(`/visitor/delete/${visitorId}`);
    return response.data;
  },

  updateSubscriptionStatus: async (visitorId: string, status: 'subscribed' | 'unsubscribed'): Promise<Visitor> => {
    const response = await apiClient.patch<Visitor>(`/visitor/${visitorId}`, {
      subscriptionStatus: status
    });
    return response.data;
  }
};