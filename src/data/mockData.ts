import { Fund, User, UserRole } from '../types';

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Larry Fink',
    role: 'Fund Manager' as UserRole,
  },
  {
    id: 'user-2',
    name: 'Chloe',
    role: 'Investor A' as UserRole,
  },
  {
    id: 'user-3',
    name: 'Amber',
    role: 'Investor B' as UserRole,
  },
  {
    id: 'user-4',
    name: 'Yi Jie',
    role: 'Investor C' as UserRole,
  },
];

export const initialFunds: Fund[] = [
  {
    id: 'fund-1',
    name: 'Global Tech Growth Fund',
    managementFee: 1.5,
    performanceFee: 15,
    targetIRR: 20, // %
    fundLifeSpan: 7, // years
    sector: 'Technology',
    investmentRegion: 'Global',
    investmentStrategy: 'Growth Equity',
    marketType: 'Primary',
    performanceHistory: [
      {
        vintageYear: 2022,
        primaryGeographicFocus: 'North America',
        calledPercentage: 45,
        dpi: 8,
        rvpi: 60,
        netIrr: 18,
        performanceAsAtDate: '2023-03-31', // Q1 2023
        netMultipleX: 1.13,
        benchmarkName: 'North America',
      },
      {
        vintageYear: 2022,
        primaryGeographicFocus: 'North America',
        calledPercentage: 58,
        dpi: 12,
        rvpi: 65,
        netIrr: 19.5,
        performanceAsAtDate: '2023-06-30', // Q2 2023
        netMultipleX: 1.24,
        benchmarkName: 'North America',
      },
    ],
    benchmarkHistory: [
      {
        vintageYear: 2022,
        primaryGeographicFocus: 'North America',
        calledPercentage: 50,
        dpi: 10,
        rvpi: 55,
        netIrr: 15,
        performanceAsAtDate: '2023-03-31',
        netMultipleX: 1.10,
        benchmarkName: 'North America',
      },
      {
        vintageYear: 2022,
        primaryGeographicFocus: 'North America',
        calledPercentage: 60,
        dpi: 13,
        rvpi: 60,
        netIrr: 17,
        performanceAsAtDate: '2023-06-30',
        netMultipleX: 1.22,
        benchmarkName: 'North America',
      },
    ],
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
  {
    id: 'fund-2',
    name: 'European Real Estate Fund',
    managementFee: 2,
    performanceFee: 20,
    targetIRR: 12,
    fundLifeSpan: 10,
    sector: 'Real Estate',
    investmentRegion: 'Europe',
    investmentStrategy: 'Value Add',
    marketType: 'Secondary',
    performanceHistory: [
      {
        vintageYear: 2020,
        primaryGeographicFocus: 'Europe',
        calledPercentage: 70,
        dpi: 20,
        rvpi: 55,
        netIrr: 14,
        performanceAsAtDate: '2023-03-31',
        netMultipleX: 1.35,
        benchmarkName: 'Europe',
      },
      {
        vintageYear: 2020,
        primaryGeographicFocus: 'Europe',
        calledPercentage: 75,
        dpi: 25,
        rvpi: 50,
        netIrr: 13.8,
        performanceAsAtDate: '2023-06-30',
        netMultipleX: 1.38,
        benchmarkName: 'Europe',
      },
    ],
    benchmarkHistory: [
      {
        vintageYear: 2020,
        primaryGeographicFocus: 'Europe',
        calledPercentage: 68,
        dpi: 18,
        rvpi: 50,
        netIrr: 12,
        performanceAsAtDate: '2023-03-31',
        netMultipleX: 1.30,
        benchmarkName: 'Europe',
      },
      {
        vintageYear: 2020,
        primaryGeographicFocus: 'Europe',
        calledPercentage: 73,
        dpi: 22,
        rvpi: 48,
        netIrr: 12.5,
        performanceAsAtDate: '2023-06-30',
        netMultipleX: 1.32,
        benchmarkName: 'Europe',
      },
    ],
    createdBy: 'user-1',
    subscribers: [
      {
        investorId: 'user-3',
        fundId: 'fund-2',
        amount: 750000,
        date: '2023-03-10',
      },
      {
        investorId: 'user-4',
        fundId: 'fund-2',
        amount: 250000,
        date: '2023-04-05',
      },
    ],
  },
]; 