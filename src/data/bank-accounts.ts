import { BankAccount } from '@/types/payment';

export const dummyBankAccounts: BankAccount[] = [
  {
    id: '1',
    bankLogo: '/bank-logo/hbl.png',
    bankName: 'Habib Bank Limited (HBL)',
    accountHolderName: 'Masjid Al-Rahman Trust',
    accountNumber: '0123456789',
    iban: 'PK36HABB0000123456789',
    createdAt: '2024-01-15',
    updatedAt: '2024-03-10',
    status: 'active'
  },
  {
    id: '2',
    bankLogo: '/bank-logo/ubl.png',
    bankName: 'United Bank Limited (UBL)',
    accountHolderName: 'Islamic Center Foundation',
    accountNumber: '9876543210',
    iban: 'PK36UNIL0000987654321',
    createdAt: '2024-02-01',
    updatedAt: '2024-03-12',
    status: 'active'
  },
  {
    id: '3',
    bankLogo: '/bank-logo/mcb.png',
    bankName: 'MCB Bank Limited',
    accountHolderName: 'Al-Noor Mosque Committee',
    accountNumber: '4567890123',
    iban: 'PK36MCBL0000456789012',
    createdAt: '2024-01-20',
    updatedAt: '2024-03-11',
    status: 'inactive'
  },
  {
    id: '5',
    bankLogo: '/bank-logo/Easypaisa.png',
    bankName: 'Easy Paisa',
    accountHolderName: 'Central Mosque Trust',
    accountNumber: '7890123456',
    iban: 'PK36ALFH0000789012345',
    createdAt: '2024-02-10',
    updatedAt: '2024-03-09',
    status: 'active'
  }
];