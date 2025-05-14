import React from 'react';
import { FundPerformanceSnapshot } from '@/types';

interface PerformanceModalProps {
  snapshots: FundPerformanceSnapshot[];
  fundName: string;
  onClose: () => void;
}

export function PerformanceModal({ snapshots, fundName, onClose }: PerformanceModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h3 className="text-xl font-semibold text-gray-800">{fundName} – Performance History</h3>
          <button
            onClick={onClose}
            className="rounded-md bg-red-500 px-3 py-1 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
          >
            Close
          </button>
        </div>

        {/* Table */}
        <div className="max-h-[70vh] overflow-x-auto overflow-y-auto p-6">
          {snapshots.length === 0 ? (
            <p className="text-center text-gray-500">No performance data available.</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-3 py-2 font-medium text-left text-gray-800">Vintage Year</th>
                  <th className="px-3 py-2 font-medium text-left text-gray-800">Geographic Focus</th>
                  <th className="px-3 py-2 font-medium text-left text-gray-800">Called %</th>
                  <th className="px-3 py-2 font-medium text-left text-gray-800">DPI %</th>
                  <th className="px-3 py-2 font-medium text-left text-gray-800">RVPI %</th>
                  <th className="px-3 py-2 font-medium text-left text-gray-800">Net IRR %</th>
                  <th className="px-3 py-2 font-medium text-left text-gray-800">As at</th>
                  <th className="px-3 py-2 font-medium text-left text-gray-800">Net Multiple (x)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {snapshots.map((snap, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-3 py-2 whitespace-nowrap text-gray-900">{snap.vintageYear}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-900">{snap.primaryGeographicFocus}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-900">{snap.calledPercentage}%</td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-900">{snap.dpi}%</td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-900">{snap.rvpi}%</td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-900">{snap.netIrr}%</td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-900">{snap.performanceAsAtDate}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-900">{snap.netMultipleX.toFixed(2)}x</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
} 