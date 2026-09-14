import React from 'react';
import { Order } from '../../types';
import { formatMoney } from '../../utils';
import { PieChart, Users } from 'lucide-react';

interface ClientsSummaryViewProps {
  orders: Order[];
}

export function ClientsSummaryView({ orders }: ClientsSummaryViewProps) {
  
  const clientMap: Record<string, any> = {};

  orders.forEach(o => {
    const phone = (o.clientPhone || '').trim();
    if (!phone) return;
    if (!clientMap[phone]) {
      clientMap[phone] = {
        name: o.clientName, 
        phone: phone, 
        tier: o.clientTier, 
        orderCount: 0, 
        totalSpent: 0, 
        totalPaid: 0, 
        totalDebt: 0,
        productCount: {}
      };
    }
    clientMap[phone].orderCount += 1;
    clientMap[phone].totalSpent += o.finalTotal;
    clientMap[phone].totalPaid += o.clientPaid;
    clientMap[phone].totalDebt += o.clientDebt;
    clientMap[phone].tier = o.clientTier;

    if (o.items) {
      o.items.forEach(it => {
        const pName = it.name.trim();
        if (pName) {
           clientMap[phone].productCount[pName] = (clientMap[phone].productCount[pName] || 0) + 1;
        }
      });
    }
  });

  const clients = Object.values(clientMap).sort((a, b) => b.totalSpent - a.totalSpent);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <PieChart size={20} className="text-primary-600" />
          Phân Tích Khách Hàng & Mặt Hàng In Nhiều Nhất
        </h3>
        
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3">Khách Hàng</th>
                <th className="px-4 py-3">Nhóm Khách</th>
                <th className="px-4 py-3 text-center">Số Đơn</th>
                <th className="px-4 py-3">Ấn Phẩm Hay In Nhất</th>
                <th className="px-4 py-3">Tổng Doanh Số</th>
                <th className="px-4 py-3">CÒN NỢ</th>
                <th className="px-4 py-3 text-center">Trạng Thái</th>
              </tr>
            </thead>
            <tbody>
              {clients.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-500">Chưa có dữ liệu</td></tr>
              ) : (
                clients.map((c, idx) => {
                  let topProduct = 'Chưa xác định';
                  let maxCount = 0;
                  for (const [prod, cnt] of Object.entries(c.productCount)) {
                    if ((cnt as number) > maxCount) {
                      maxCount = cnt as number;
                      topProduct = `${prod} (${cnt} lần)`;
                    }
                  }

                  return (
                    <tr key={idx} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-4 py-3">
                        <div className="font-bold text-gray-900 dark:text-white">{c.name}</div>
                        <div className="text-primary-600">{c.phone}</div>
                      </td>
                      <td className="px-4 py-3">{c.tier}</td>
                      <td className="px-4 py-3 text-center font-bold">{c.orderCount}</td>
                      <td className="px-4 py-3 font-medium text-primary-700 dark:text-primary-400">{topProduct}</td>
                      <td className="px-4 py-3 font-bold">{formatMoney(c.totalSpent)}</td>
                      <td className="px-4 py-3">
                        <span className={`font-bold ${c.totalDebt > 0 ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                          {formatMoney(c.totalDebt)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {c.totalDebt > 0 
                          ? <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Đang Nợ</span>
                          : <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-emerald-900 dark:text-emerald-300">Sòng Phẳng</span>
                        }
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
