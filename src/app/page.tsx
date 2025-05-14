'use client';

import { useState } from 'react';
import { UserSwitcher } from '@/components/UserSwitcher';
import { FundCard } from '@/components/FundCard';
import { CreateFundForm } from '@/components/CreateFundForm';
import { useAppContext } from '@/context/AppContext';

export default function Home() {
  const { funds, currentUser } = useAppContext();
  const [showCreateForm, setShowCreateForm] = useState(false);

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
          <UserSwitcher />
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
              {funds.filter((fund) => fund.createdBy === currentUser.id).length === 0 ? (
                <div className="rounded-lg bg-white p-6 text-center border border-gray-200 shadow-sm">
                  <p className="text-gray-500">You haven't created any funds yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {funds
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
            {funds.length === 0 ? (
              <div className="rounded-lg bg-white p-6 text-center border border-gray-200 shadow-sm">
                <p className="text-gray-500">No funds are available for investment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {funds.map((fund) => (
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
