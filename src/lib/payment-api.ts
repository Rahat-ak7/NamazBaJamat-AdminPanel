import { apiClient } from './api-client';
import { BankAccount, BankAccountFormData } from '@/types/payment';

export const paymentApi = {
  // Get all bank accounts
  getAccounts: async (): Promise<BankAccount[]> => {
    const response = await apiClient.get<BankAccount[]>('/payment/');
    return response.data;
  },

  // Create new bank account
  // createAccount: async (formData: BankAccountFormData): Promise<BankAccount> => {
  //   const response = await apiClient.post<{ message: string; bank: BankAccount }>('/payment/create', formData);
  //   return response.data.bank;
  // },

  // Create new bank account with form-data
  createAccount: async (formData: BankAccountFormData): Promise<BankAccount> => {
    // Create FormData object for multipart/form-data
    const formDataToSend = new FormData();
    
    // Append the file if it exists
    if (formData.bankLogo) {
      formDataToSend.append('bankLogo', formData.bankLogo);
    }
    
    // Append other fields
    formDataToSend.append('bankName', formData.bankName);
    formDataToSend.append('accountHolderName', formData.accountHolderName);
    formDataToSend.append('accountNumber', formData.accountNumber);
    formDataToSend.append('iban', formData.iban);

    const response = await apiClient.post<{ message: string; bank: BankAccount }>(
      '/payment/create',
      formDataToSend,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    
    return response.data.bank;
  },


  // Delete bank account
  deleteAccount: async (accountId: string): Promise<void> => {
    await apiClient.delete(`/payment/${accountId}`);
  },
};