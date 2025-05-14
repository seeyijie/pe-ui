'use client';

import { useState } from 'react';
import { UserSwitcher } from '@/components/UserSwitcher';
import { FundCard } from '@/components/FundCard';
import { CreateFundForm } from '@/components/CreateFundForm';
import { useAppContext } from '@/context/AppContext';

type MarketFilter = 'All' | 'Primary' | 'Secondary';

export default function Home() {
  const { funds, currentUser } = useAppContext();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [marketFilter, setMarketFilter] = useState<MarketFilter>('All');

  const cycleFilter = () => {
    setMarketFilter((prev) =>
      prev === 'All' ? 'Primary' : prev === 'Primary' ? 'Secondary' : 'All'
    );
  };

  const filteredFunds = funds.filter((fund) =>
    marketFilter === 'All' ? true : fund.marketType === marketFilter
  );

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-10 bg-white bg-opacity-70 shadow-md backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="relative mr-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">F</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              FutureFund
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Filter button */}
            <button
              onClick={cycleFilter}
              aria-label="Filter by market type"
              className="relative h-10 w-10 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {/* simple funnel icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4.5h18m-13.5 7h9m-4.5 7h0"
                />
              </svg>
              {marketFilter !== 'All' && (
                <span className="absolute -bottom-1 -right-1 rounded-full bg-blue-600 px-1 text-[10px] font-semibold text-white">
                  {marketFilter[0]}
                </span>
              )}
            </button>
            <UserSwitcher />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Fund Manager View */}
        {currentUser.role === 'Fund Manager' && (
          <div className="mb-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">
                Manage <span className="text-blue-600">Funds</span>
              </h2>
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {showCreateForm ? 'Cancel' : 'Create New Fund'}
              </button>
            </div>

            {showCreateForm && <CreateFundForm />}

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-700">Your Funds</h3>
              {filteredFunds.filter((fund) => fund.createdBy === currentUser.id).length === 0 ? (
                <div className="rounded-lg bg-white p-6 text-center border border-gray-200 shadow-sm">
                  <p className="text-gray-500">You haven&apos;t created any funds yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredFunds
                    .filter((fund) => fund.createdBy === currentUser.id)
                    .map((fund) => (
                      <FundCard key={fund.id} fund={fund} />
                    ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Investor View */}
        {currentUser.role !== 'Fund Manager' && (
          <div>
            <h2 className="text-2xl font-bold mb-8 text-gray-800">
              Available <span className="text-blue-600">Funds</span> for Investment
            </h2>
            {filteredFunds.length === 0 ? (
              <div className="rounded-lg bg-white p-6 text-center border border-gray-200 shadow-sm">
                <p className="text-gray-500">No funds are available for investment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredFunds.map((fund) => (
                  <FundCard key={fund.id} fund={fund} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
