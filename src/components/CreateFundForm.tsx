'use client';

import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { FundTransparencyLevel, PerformanceFeeMethodology } from '@/types';

export function CreateFundForm() {
  const { createFund } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    managementFee: 2,
    performanceFee: 20,
    performanceFeeMethodology: 'High Water Mark' as PerformanceFeeMethodology,
    transparencyLevel: 'Medium' as FundTransparencyLevel,
    hurdleRate: 8,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ['managementFee', 'performanceFee', 'hurdleRate'].includes(name)
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
      managementFee: 2,
      performanceFee: 20,
      performanceFeeMethodology: 'High Water Mark' as PerformanceFeeMethodology,
      transparencyLevel: 'Medium' as FundTransparencyLevel,
      hurdleRate: 8,
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

          <div>
            <label htmlFor="performanceFeeMethodology" className="block text-sm font-medium text-gray-700 mb-1">
              Performance Fee Methodology
            </label>
            <select
              id="performanceFeeMethodology"
              name="performanceFeeMethodology"
              required
              value={formData.performanceFeeMethodology}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              <option value="Hard Hurdle">Hard Hurdle</option>
              <option value="Soft Hurdle">Soft Hurdle</option>
              <option value="High Water Mark">High Water Mark</option>
            </select>
          </div>

          <div>
            <label htmlFor="transparencyLevel" className="block text-sm font-medium text-gray-700 mb-1">
              Fund Level Transparency
            </label>
            <select
              id="transparencyLevel"
              name="transparencyLevel"
              required
              value={formData.transparencyLevel}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label htmlFor="hurdleRate" className="block text-sm font-medium text-gray-700 mb-1">
              Hurdle Rate (%)
            </label>
            <input
              type="number"
              id="hurdleRate"
              name="hurdleRate"
              min="0"
              max="20"
              step="0.5"
              required
              value={formData.hurdleRate}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>

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