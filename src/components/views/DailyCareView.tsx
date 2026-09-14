import React, { useState } from 'react';
import { Order } from '../../types';
import { formatMoney } from '../../utils';
import { MessageCircle, ExternalLink } from 'lucide-react';

interface DailyCareViewProps {
  orders: Order[];
}

export function DailyCareView({ orders }: DailyCareViewProps) {
  const [limit, setLimit] = useState(10);

  // Group by client phone
  const clientMap: Record<string, any> = {};
  orders.forEach(o => {
    const phone = (o.clientPhone || '').trim();
    if (!phone) return;
    if (!clientMap[phone]) {
      clientMap[phone] = { 
        name: o.clientName, 
        phone: phone, 
        tier: o.clientTier, 
        lastDate: o.date, 
        totalSpent: 0, 
        debt: 0 
      };
    }
    clientMap[phone].totalSpent += o.finalTotal;
    clientMap[phone].debt += o.clientDebt;
    if (new Date(o.date) > new Date(clientMap[phone].lastDate)) {
      clientMap[phone].lastDate = o.date;
    }
  });

  let clients = Object.values(clientMap);
  
  // Sorting logic based on priority
  clients.sort((a, b) => {
    if (a.tier === 'Khách cần chăm sóc') return -1;
    if (b.tier === 'Khách cần chăm sóc') return 1;
    if (a.tier === 'Khách đặc biệt') return -1;
    if (b.debt > 0) return -1;
    return new Date(a.lastDate).getTime() - new Date(b.lastDate).getTime();
  });

  const selected = clients.slice(0, limit);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <MessageCircle size={20} className="text-primary-600" />
          Lên Lịch Nhắn Tin Chăm Sóc Khách Hàng Hôm Nay
        </h3>
        
        <div className="flex items-center gap-4 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800/30 mb-6">
          <label className="text-sm font-bold text-blue-800 dark:text-blue-300">Số lượng khách chăm sóc hôm nay:</label>
          <select 
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2 dark:bg-gray-800 dark:border-gray-600 dark:text-white font-medium"
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value))}
          >
            <option value={5}>5 khách hàng</option>
            <option value={10}>10 khách hàng</option>
            <option value={20}>20 khách hàng</option>
            <option value={30}>30 khách hàng</option>
          </select>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3">STT</th>
                <th className="px-4 py-3">Khách Hàng</th>
                <th className="px-4 py-3">Phân Nhóm</th>
                <th className="px-4 py-3">Lần In Cuối</th>
                <th className="px-4 py-3">Tổng In / Nợ</th>
                <th className="px-4 py-3">Gợi Ý Tin Nhắn</th>
                <th className="px-4 py-3 text-right">Zalo</th>
              </tr>
            </thead>
            <tbody>
              {selected.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-500">Chưa có dữ liệu</td></tr>
              ) : (
                selected.map((c, idx) => {
                  let msg = `Dạ em chào anh/chị ${c.name}, em bên In Ấn Nhật Nguyên. Dạo này ấn phẩm bên em anh/chị dùng tốt chứ ạ?`;
                  if (c.debt > 0) {
                    msg = `Dạ em chào anh/chị ${c.name}, bên em kiểm tra đơn in trước còn ${formatMoney(c.debt)}, khi nào tiện anh/chị CK giúp xưởng nhé ạ.`;
                  }
                  const zaloUrl = `https://zalo.me/${c.phone.replace(/[^0-9]/g, '')}`;

                  return (
                    <tr key={idx} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-4 py-3 font-bold">#{idx + 1}</td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-gray-900 dark:text-white">{c.name}</div>
                        <div className="text-primary-600 font-medium">{c.phone}</div>
                      </td>
                      <td className="px-4 py-3">{c.tier}</td>
                      <td className="px-4 py-3">{c.lastDate}</td>
                      <td className="px-4 py-3">
                        <div>{formatMoney(c.totalSpent)}</div>
                        {c.debt > 0 
                          ? <span className="text-red-600 font-bold">{formatMoney(c.debt)}</span>
                          : <span className="text-emerald-600">Hết nợ</span>
                        }
                      </td>
                      <td className="px-4 py-3 text-xs italic text-gray-600 dark:text-gray-400 max-w-xs">{msg}</td>
                      <td className="px-4 py-3 text-right">
                        <a 
                          href={zaloUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="inline-flex items-center gap-1 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-xs px-3 py-1.5"
                        >
                          Mở Zalo <ExternalLink size={12} />
                        </a>
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
