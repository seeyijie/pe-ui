import { Fund, User, UserRole } from '../types';

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Fund Manager',
    role: 'Fund Manager' as UserRole,
  },
  {
    id: 'user-2',
    name: 'Investor A',
    role: 'Investor A' as UserRole,
  },
  {
    id: 'user-3',
    name: 'Investor B',
    role: 'Investor B' as UserRole,
  },
  {
    id: 'user-4',
    name: 'Investor C',
    role: 'Investor C' as UserRole,
  },
];

export const initialFunds: Fund[] = [
  {
    id: 'fund-1',
    name: 'Growth Opportunities Fund',
    managementFee: 2,
    performanceFee: 20,
    performanceFeeMethodology: 'High Water Mark',
    transparencyLevel: 'Medium',
    hurdleRate: 8,
    createdBy: 'user-1',
    subscribers: [
      {
        investorId: 'user-2',
        fundId: 'fund-1',
        amount: 500000,
        date: '2023-01-15',
      },
    ],
  },
]; 