'use client';

import { useState } from 'react';
import { Fund } from '@/types';
import { useAppContext } from '@/context/AppContext';
import { PerformanceModal } from '@/components/PerformanceModal';
import { BenchmarkModal } from '@/components/BenchmarkModal';

interface FundCardProps {
  fund: Fund;
}

export function FundCard({ fund }: FundCardProps) {
  const { currentUser, subscribeFund, tradeFund } = useAppContext();
  const [subscriptionAmount, setSubscriptionAmount] = useState<number>(100000);
  const [tradeAmount, setTradeAmount] = useState<number>(10000);
  const [tradeType, setTradeType] = useState<'Buy' | 'Sell' | null>(null);
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [showPerformance, setShowPerformance] = useState(false);
  const [showBenchmarks, setShowBenchmarks] = useState(false);

  const totalSubscribed = fund.subscribers.reduce(
    (sum, sub) => sum + sub.amount,
    0
  );

  const currentUserSubscription = fund.subscribers.find(
    (sub) => sub.investorId === currentUser.id
  );

  const handleSubscribe = () => {
    subscribeFund(fund.id, subscriptionAmount);
    setShowSubscribe(false);
  };

  const handleTrade = () => {
    if (!tradeType) return;
    const amt = tradeAmount;
    if (amt <= 0) return;
    const signedAmt = tradeType === 'Buy' ? amt : -amt;
    tradeFund(fund.id, signedAmt);
    setTradeType(null);
  };

  return (
    <>
    <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bold text-xl text-blue-600 flex items-center gap-2">
          {fund.name}
          <span className={`rounded-full px-2 py-0.5 text-xs font-semibold text-white ${fund.marketType === 'Primary' ? 'bg-blue-500' : 'bg-purple-600'}`}>{fund.marketType}</span>
        </h3>
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-80" />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="space-y-1">
          <p className="text-gray-500 text-xs">Management Fee</p>
          <p className="font-semibold text-gray-800">{fund.managementFee}%</p>
        </div>
        <div className="space-y-1">
          <p className="text-gray-500 text-xs">Performance Fee</p>
          <p className="font-semibold text-gray-800">{fund.performanceFee}%</p>
        </div>
        <div className="space-y-1">
          <p className="text-gray-500 text-xs">Target IRR</p>
          <p className="font-semibold text-gray-800">{fund.targetIRR}%</p>
        </div>
        <div className="space-y-1">
          <p className="text-gray-500 text-xs">Fund Life Span</p>
          <p className="font-semibold text-gray-800">{fund.fundLifeSpan} Years</p>
        </div>
        <div className="space-y-1">
          <p className="text-gray-500 text-xs">Sector</p>
          <p className="font-semibold text-gray-800">{fund.sector}</p>
        </div>
        <div className="space-y-1">
          <p className="text-gray-500 text-xs">Investment Region</p>
          <p className="font-semibold text-gray-800">{fund.investmentRegion}</p>
        </div>
        <div className="space-y-1">
          <p className="text-gray-500 text-xs">Market Type</p>
          <p className="font-semibold text-gray-800">{fund.marketType}</p>
        </div>
        <div className="space-y-1 col-span-2">
          <p className="text-gray-500 text-xs">Investment Strategy</p>
          <p className="font-semibold text-gray-800">{fund.investmentStrategy}</p>
        </div>
        <div className="space-y-1">
          <p className="text-gray-500 text-xs">Total Subscribed</p>
          <p className="font-semibold text-gray-800">${totalSubscribed.toLocaleString()}</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mb-4 flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
        {fund.marketType === 'Secondary' && (
          <button
            onClick={() => setShowPerformance(true)}
            aria-label="View fund performance history"
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              fund.performanceHistory && fund.performanceHistory.length > 0
                ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!fund.performanceHistory || fund.performanceHistory.length === 0}
          >
            View Performance
          </button>
        )}

        <button
          onClick={() => setShowBenchmarks(true)}
          aria-label="View benchmark data"
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            fund.benchmarkHistory && fund.benchmarkHistory.length > 0
              ? 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={!fund.benchmarkHistory || fund.benchmarkHistory.length === 0}
        >
          View Benchmarks
        </button>
      </div>

      {/* Primary market subscribe form */}
      {fund.marketType !== 'Secondary' && showSubscribe && currentUser.role !== 'Fund Manager' && (
        <div className="mt-4 p-4 rounded-md bg-gray-50 border border-gray-100">
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Investment Amount ($)
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              min="0"
              step="1000"
              value={subscriptionAmount}
              onChange={(e) => setSubscriptionAmount(Number(e.target.value))}
              onFocus={(e) => e.target.select()}
              placeholder="Enter amount"
              className="flex-1 rounded-md border border-gray-300 text-black shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-sm placeholder-gray-400"
            />
            <button
              onClick={handleSubscribe}
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {/* Primary market subscribe trigger */}
      {fund.marketType !== 'Secondary' && currentUser.role !== 'Fund Manager' && (
        <div className="mt-6">
          <button
            onClick={() => setShowSubscribe(!showSubscribe)}
            className={`w-full rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              showSubscribe 
                ? 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500' 
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
            }`}
          >
            {showSubscribe ? 'Cancel' : 'Subscribe to Fund'}
          </button>
        </div>
      )}
      
      {/* Secondary market trade form */}
      {fund.marketType === 'Secondary' && tradeType && currentUser.role !== 'Fund Manager' && (
        <div className="mt-4 p-4 rounded-md bg-gray-50 border border-gray-100">
          <label className="block text-xs font-medium text-gray-700 mb-2">
            {tradeType} Amount ($)
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              min="0"
              step="1000"
              value={tradeAmount}
              onChange={(e) => setTradeAmount(Number(e.target.value))}
              onFocus={(e) => e.target.select()}
              placeholder="Enter amount"
              className="flex-1 rounded-md border border-gray-300 text-black shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-sm placeholder-gray-400"
            />
            <button
              onClick={handleTrade}
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {/* Secondary market buy/sell buttons */}
      {fund.marketType === 'Secondary' && currentUser.role !== 'Fund Manager' && (
        <div className="mt-6 flex space-x-3">
          <button
            onClick={() => setTradeType(tradeType === 'Buy' ? null : 'Buy')}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              tradeType === 'Buy' ? 'bg-green-700 focus:ring-green-500' : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
            }`}
          >
            {tradeType === 'Buy' ? 'Cancel' : 'Buy'}
          </button>
          <button
            onClick={() => setTradeType(tradeType === 'Sell' ? null : 'Sell')}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              tradeType === 'Sell' ? 'bg-red-700 focus:ring-red-500' : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
            }`}
          >
            {tradeType === 'Sell' ? 'Cancel' : 'Sell'}
          </button>
        </div>
      )}

      {/* Subscription/Position information at the bottom */}
      {currentUserSubscription && currentUser.role !== 'Fund Manager' && (
        <div className="mt-6 p-3 rounded-md bg-blue-50 border border-blue-200">
          <p className="text-sm text-blue-700 font-medium">
            Your Investment: ${currentUserSubscription.amount.toLocaleString()}
          </p>
          <p className="text-xs text-blue-500">
            Subscribed on: {currentUserSubscription.date}
          </p>
        </div>
      )}
    </div>

    {/* Performance Modal */}
    {showPerformance && fund.performanceHistory && (
      <PerformanceModal
        snapshots={fund.performanceHistory!}
        fundName={fund.name}
        onClose={() => setShowPerformance(false)}
      />
    )}

    {showBenchmarks && fund.benchmarkHistory && (
      <BenchmarkModal
        benchmarks={fund.benchmarkHistory!}
        performances={fund.performanceHistory}
        fundName={fund.name}
        onClose={() => setShowBenchmarks(false)}
      />
    )}
    </>
  );
} 