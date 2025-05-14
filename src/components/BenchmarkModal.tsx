import React from 'react';
import { FundPerformanceSnapshot } from '@/types';

interface BenchmarkModalProps {
  benchmarks: FundPerformanceSnapshot[];
  performances: FundPerformanceSnapshot[] | undefined;
  fundName: string;
  onClose: () => void;
}

export function BenchmarkModal({ benchmarks, performances, fundName, onClose }: BenchmarkModalProps) {
  const getAlpha = (date: string, benchIrr: number) => {
    if (!performances) return null;
    const match = performances.find((p) => p.performanceAsAtDate === date);
    if (!match) return null;
    return (match.netIrr - benchIrr).toFixed(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h3 className="text-xl font-semibold text-gray-800">{fundName} – Benchmarks</h3>
          <button
            onClick={onClose}
            className="rounded-md bg-red-500 px-3 py-1 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
          >
            Close
          </button>
        </div>

        <div className="max-h-[70vh] overflow-x-auto overflow-y-auto p-6">
          {benchmarks.length === 0 ? (
            <p className="text-center text-gray-500">No benchmark data available.</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-3 py-2 font-medium text-left text-gray-800">Benchmark</th>
                  <th className="px-3 py-2 font-medium text-left text-gray-800">As at</th>
                  <th className="px-3 py-2 font-medium text-left text-gray-800">Called %</th>
                  <th className="px-3 py-2 font-medium text-left text-gray-800">DPI %</th>
                  <th className="px-3 py-2 font-medium text-left text-gray-800">RVPI %</th>
                  <th className="px-3 py-2 font-medium text-left text-gray-800">Net IRR %</th>
                  <th className="px-3 py-2 font-medium text-left text-gray-800">Net Multiple (x)</th>
                  <th className="px-3 py-2 font-medium text-left text-gray-800">Alpha (Net IRR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {benchmarks.map((b, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-3 py-2 whitespace-nowrap text-gray-900">{b.benchmarkName ?? '—'}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-900">{b.performanceAsAtDate}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-900">{b.calledPercentage}%</td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-900">{b.dpi}%</td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-900">{b.rvpi}%</td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-900">{b.netIrr}%</td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-900">{b.netMultipleX.toFixed(2)}x</td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-900">{getAlpha(b.performanceAsAtDate, b.netIrr) ?? '—'}</td>
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