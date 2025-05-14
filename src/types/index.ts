export type FundTransparencyLevel = 'Low' | 'Medium' | 'High';

export type PerformanceFeeMethodology = 'Hard Hurdle' | 'Soft Hurdle' | 'High Water Mark';

export interface Fund {
  id: string;
  name: string;
  managementFee: number; // percentage
  performanceFee: number; // percentage
  targetIRR?: number; // percentage, optional for now
  fundLifeSpan?: number; // years, optional for now
  sector?: string;
  investmentRegion?: string;
  investmentStrategy?: string;
  /** Whether the fund is a primary or secondary market vehicle */
  marketType?: 'Primary' | 'Secondary';
  /**
   * Historical or snapshot performance data for the fund.
   * This can store quarterly or annual snapshots that include common PE/VC metrics.
   */
  performanceHistory?: FundPerformanceSnapshot[];
  benchmarkHistory?: FundPerformanceSnapshot[]; // duplicate structure for maintainability
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

export interface FundPerformanceSnapshot {
  /** Year the fund was launched (vintage) */
  vintageYear: number;
  /** Continent-level geographic focus (e.g., North America, Europe, Asia-Pacific) */
  primaryGeographicFocus: string;
  /** % of total committed capital that has been called */
  calledPercentage: number;
  /** Distributions to Paid-In Capital – realised returns (%) */
  dpi: number;
  /** Residual Value to Paid-In Capital – unrealised value (%) */
  rvpi: number;
  /** Net IRR (%) – money-weighted return */
  netIrr: number;
  /** Date that the performance snapshot is taken (quarter end) */
  performanceAsAtDate: string; // ISO date (YYYY-MM-DD)
  /** Net multiple (TVPI) – multiple of invested capital */
  netMultipleX: number;
  /** Name / source of the benchmark (e.g., Cambridge Associates) */
  benchmarkName?: string;
} 