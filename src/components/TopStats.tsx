import React from 'react';
import { formatMoney } from '../utils';

interface TopStatsProps {
  periodLabel: string;
  periodRev: number;
  periodProfit: number;
  totalVatOut: number;
  totalVatIn: number;
  totalClientDebt: number;
  totalSupplierDebt: number;
}

export function TopStats({
  periodLabel,
  periodRev,
  periodProfit,
  totalVatOut,
  totalVatIn,
  totalClientDebt,
  totalSupplierDebt
}: TopStatsProps) {
  
  const stats = [
    { label: `Doanh Thu (${periodLabel})`, value: periodRev, color: 'text-gray-900 dark:text-white' },
    { label: 'Lợi Nhuận Gộp', value: periodProfit, color: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'VAT Khách Trả', value: totalVatOut, color: 'text-primary-600 dark:text-primary-400' },
    { label: 'VAT Nhà In Tính', value: totalVatIn, color: 'text-amber-600 dark:text-amber-400' },
    { label: 'Khách Còn Nợ', value: totalClientDebt, color: 'text-red-600 dark:text-red-400' },
    { label: 'Tổng Nợ Nhà In', value: totalSupplierDebt, color: 'text-red-600 dark:text-red-400' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
            {stat.label}
          </p>
          <p className={`text-xl font-bold ${stat.color}`}>
            {formatMoney(stat.value)}
          </p>
        </div>
      ))}
    </div>
  );
}
