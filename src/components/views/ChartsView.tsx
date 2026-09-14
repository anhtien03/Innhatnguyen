import React from 'react';
import { Order } from '../../types';
import { formatMoney } from '../../utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

interface ChartsViewProps {
  orders: Order[];
  selectedYear: number;
}

export function ChartsView({ orders, selectedYear }: ChartsViewProps) {
  
  // Calculate data
  const monthsData = Array.from({ length: 12 }, (_, i) => ({
    name: `T${i + 1}`,
    orderCount: 0,
    rev: 0,
    cost: 0,
    profit: 0,
    vat: 0,
    monthIndex: i
  }));

  const yearsMap: Record<number, { year: string, rev: number, profit: number }> = {};

  orders.forEach(o => {
    const oDate = new Date(o.date);
    const y = oDate.getFullYear();
    const m = oDate.getMonth();

    if (!yearsMap[y]) yearsMap[y] = { year: `Năm ${y}`, rev: 0, profit: 0 };
    yearsMap[y].rev += o.finalTotal;
    yearsMap[y].profit += o.profit;

    if (y === selectedYear) {
      monthsData[m].orderCount += 1;
      monthsData[m].rev += o.finalTotal;
      monthsData[m].cost += o.costTotal;
      monthsData[m].profit += o.profit;
      monthsData[m].vat += (o.vatOutAmount || 0);
    }
  });

  const yearlyData = Object.values(yearsMap).sort((a, b) => a.year.localeCompare(b.year));
  if (yearlyData.length === 0) {
    yearlyData.push({ year: `Năm ${selectedYear}`, rev: 0, profit: 0 });
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-lg shadow-lg">
          <p className="font-bold mb-2 text-gray-900 dark:text-white">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {formatMoney(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Báo Cáo Biểu Đồ Lợi Nhuận & Doanh Thu</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Lợi Nhuận & Doanh Thu 12 Tháng ({selectedYear})</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis 
                    tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} 
                    axisLine={false} 
                    tickLine={false}
                    width={50}
                  />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="profit" name="Lợi Nhuận Gộp" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="rev" name="Doanh Thu" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">So Sánh Lợi Nhuận Các Năm</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} />
                  <YAxis 
                    tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                    axisLine={false} 
                    tickLine={false}
                    width={50}
                  />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="profit" name="Lợi Nhuận Các Năm" stroke="#059669" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <h4 className="font-bold text-gray-900 dark:text-white mb-4">Bảng Chi Tiết Doanh Thu & Lợi Nhuận Năm {selectedYear}</h4>
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3">Tháng</th>
                <th className="px-4 py-3 text-center">Số Đơn</th>
                <th className="px-4 py-3">Doanh Thu Khách</th>
                <th className="px-4 py-3">Cost Gốc Xưởng</th>
                <th className="px-4 py-3">Tiền Thuế VAT</th>
                <th className="px-4 py-3">LỢI NHUẬN GỘP</th>
                <th className="px-4 py-3">Tỷ Suất (%)</th>
              </tr>
            </thead>
            <tbody>
              {monthsData.map((m, idx) => {
                const marginRate = m.rev > 0 ? ((m.profit / m.rev) * 100).toFixed(1) : '0';
                const isHighMargin = parseFloat(marginRate) >= 30;
                
                return (
                  <tr key={idx} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">Tháng {m.monthIndex + 1}</td>
                    <td className="px-4 py-3 text-center">{m.orderCount} đơn</td>
                    <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">{formatMoney(m.rev)}</td>
                    <td className="px-4 py-3">{formatMoney(m.cost)}</td>
                    <td className="px-4 py-3">{formatMoney(m.vat)}</td>
                    <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">{formatMoney(m.profit)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${isHighMargin ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                        {marginRate}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
