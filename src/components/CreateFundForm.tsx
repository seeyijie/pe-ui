'use client';

import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
// import { FundTransparencyLevel, PerformanceFeeMethodology } from '@/types'; // Removed unused imports

export function CreateFundForm() {
  const { createFund } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    managementFee: 1.5,
    performanceFee: 15,
    // performanceFeeMethodology: 'High Water Mark' as PerformanceFeeMethodology, // Removed
    // transparencyLevel: 'Medium' as FundTransparencyLevel, // Removed
    // hurdleRate: 8, // Removed
    targetIRR: 12, // Default value
    fundLifeSpan: 7, // Default value
    sector: 'Technology', // Default value
    investmentRegion: 'Global', // Default value
    investmentStrategy: 'Growth Equity', // Default value
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ['managementFee', 'performanceFee', 'targetIRR', 'fundLifeSpan'].includes(name)
        ? parseFloat(value)
        : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createFund(formData);
    // Reset form
    setFormData({
      name: '',
      managementFee: 1.5,
      performanceFee: 15,
      // performanceFeeMethodology: 'High Water Mark' as PerformanceFeeMethodology, // Removed
      // transparencyLevel: 'Medium' as FundTransparencyLevel, // Removed
      // hurdleRate: 8, // Removed
      targetIRR: 12,
      fundLifeSpan: 7,
      sector: 'Technology',
      investmentRegion: 'Global',
      investmentStrategy: 'Growth Equity',
    });
  };

  return (
    <div className="relative mb-8 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-md">
      <div className="absolute -inset-1 -z-10 bg-gradient-to-r from-blue-500 to-purple-500 opacity-10 blur-sm"></div>
      
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        <span className="text-blue-600">Create</span> New Fund
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Fund Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Enter fund name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="managementFee" className="block text-sm font-medium text-gray-700 mb-1">
                Management Fee (%)
              </label>
              <input
                type="number"
                id="managementFee"
                name="managementFee"
                min="0"
                max="10"
                step="0.1"
                required
                value={formData.managementFee}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>

            <div>
              <label htmlFor="performanceFee" className="block text-sm font-medium text-gray-700 mb-1">
                Performance Fee (%)
              </label>
              <input
                type="number"
                id="performanceFee"
                name="performanceFee"
                min="0"
                max="50"
                step="1"
                required
                value={formData.performanceFee}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
          </div>

          {/* New Fields Start Here */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="targetIRR" className="block text-sm font-medium text-gray-700 mb-1">
                Target IRR (%)
              </label>
              <input
                type="number"
                id="targetIRR"
                name="targetIRR"
                min="0"
                max="100"
                step="1"
                required
                value={formData.targetIRR}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="fundLifeSpan" className="block text-sm font-medium text-gray-700 mb-1">
                Fund Life Span (Years)
              </label>
              <input
                type="number"
                id="fundLifeSpan"
                name="fundLifeSpan"
                min="1"
                max="20"
                step="1"
                required
                value={formData.fundLifeSpan}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
          </div>

          <div>
            <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-1">
              Sector
            </label>
            <input
              type="text"
              id="sector"
              name="sector"
              required
              value={formData.sector}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="e.g., Technology, Healthcare"
            />
          </div>

          <div>
            <label htmlFor="investmentRegion" className="block text-sm font-medium text-gray-700 mb-1">
              Investment Region
            </label>
            <input
              type="text"
              id="investmentRegion"
              name="investmentRegion"
              required
              value={formData.investmentRegion}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="e.g., US, Europe, Asia"
            />
          </div>

          <div>
            <label htmlFor="investmentStrategy" className="block text-sm font-medium text-gray-700 mb-1">
              Investment Strategy
            </label>
            <input
              type="text"
              id="investmentStrategy"
              name="investmentStrategy"
              required
              value={formData.investmentStrategy}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="e.g., Growth Equity, Venture Capital"
            />
          </div>
          {/* New Fields End Here */}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Fund
            </button>
          </div>
        </div>
      </form>
    </div>
  );
} 