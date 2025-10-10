export interface BankAccount {
  _id: string;
  bankLogo: string;
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  iban: string;
  createdAt: string;
  updatedAt: string;
}

export interface BankAccountFormData {
 bankLogo: File | null;
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  iban: string;
}