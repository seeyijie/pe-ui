'use client';

import { useState } from 'react';
import { Fund } from '@/types';
import { useAppContext } from '@/context/AppContext';

interface FundCardProps {
  fund: Fund;
}

export function FundCard({ fund }: FundCardProps) {
  const { currentUser, subscribeFund } = useAppContext();
  const [subscriptionAmount, setSubscriptionAmount] = useState<number>(100000);
  const [showSubscribe, setShowSubscribe] = useState(false);

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

  return (
    <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bold text-xl text-blue-600">{fund.name}</h3>
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
          <p className="text-gray-500 text-xs">Fee Methodology</p>
          <p className="font-semibold text-gray-800">{fund.performanceFeeMethodology}</p>
        </div>
        <div className="space-y-1">
          <p className="text-gray-500 text-xs">Transparency Level</p>
          <p className="font-semibold text-gray-800">{fund.transparencyLevel}</p>
        </div>
        <div className="space-y-1">
          <p className="text-gray-500 text-xs">Hurdle Rate</p>
          <p className="font-semibold text-gray-800">{fund.hurdleRate}%</p>
        </div>
        <div className="space-y-1">
          <p className="text-gray-500 text-xs">Total Subscribed</p>
          <p className="font-semibold text-gray-800">${totalSubscribed.toLocaleString()}</p>
        </div>
      </div>

      {/* Subscription information if applicable */}
      {currentUserSubscription && currentUser.role !== 'Fund Manager' && (
        <div className="mt-4 p-3 rounded-md bg-blue-50 border border-blue-200">
          <p className="text-sm text-blue-700 font-medium">
            Your Investment: ${currentUserSubscription.amount.toLocaleString()}
          </p>
          <p className="text-xs text-blue-500">
            Subscribed on: {currentUserSubscription.date}
          </p>
        </div>
      )}

      {/* Subscription form */}
      {showSubscribe && currentUser.role !== 'Fund Manager' && (
        <div className="mt-4 p-4 rounded-md bg-gray-50 border border-gray-100">
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Investment Amount ($)
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              min="10000"
              step="10000"
              value={subscriptionAmount}
              onChange={(e) => setSubscriptionAmount(Number(e.target.value))}
              className="flex-1 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-sm"
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

      {currentUser.role !== 'Fund Manager' && (
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
    </div>
  );
} 