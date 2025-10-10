import { apiClient } from './api-client';

export interface LoginCredentials {
  phoneNo?: string;
  email?: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  admin: {
    _id: string;
    email: string;
    phoneNo: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    // Determine if the input is email or phone number
    const isEmail = credentials.phoneNo?.includes('@');
    
    const payload = isEmail 
      ? { email: credentials.phoneNo, password: credentials.password }
      : { phoneNo: credentials.phoneNo, password: credentials.password };

    const response = await apiClient.post<LoginResponse>('/admin/signin', payload);
    return response.data;
  },
};