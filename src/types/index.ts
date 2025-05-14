export type FundTransparencyLevel = 'Low' | 'Medium' | 'High';

export type PerformanceFeeMethodology = 'Hard Hurdle' | 'Soft Hurdle' | 'High Water Mark';

export interface Fund {
  id: string;
  name: string;
  managementFee: number; // percentage
  performanceFee: number; // percentage
  performanceFeeMethodology: PerformanceFeeMethodology;
  transparencyLevel: FundTransparencyLevel;
  hurdleRate: number; // percentage
  createdBy: string;
  subscribers: Subscription[];
}

export interface Subscription {
  investorId: string;
  fundId: string;
  amount: number;
  date: string;
}

export type UserRole = 'Fund Manager' | 'Investor A' | 'Investor B' | 'Investor C';

export interface User {
  id: string;
  name: string;
  role: UserRole;
} 