import React from 'react';
import { Order, SupplierPayment } from '../../types';
import { formatMoney } from '../../utils';
import { Building2, Plus, History } from 'lucide-react';

interface SuppliersSummaryViewProps {
  orders: Order[];
  payments: Record<string, SupplierPayment[]>;
}

export function SuppliersSummaryView({ orders, payments }: SuppliersSummaryViewProps) {
  
  const supplierMap: Record<string, any> = {};

  orders.forEach(o => {
    if (o.items && Array.isArray(o.items)) {
      o.items.forEach(it => {
        const name = it.supplier ? it.supplier.trim() : '';
        if (!name) return;
        if (!supplierMap[name]) {
          supplierMap[name] = { itemCount: 0, totalCost: 0, totalPaid: 0, totalDebt: 0 };
        }
        supplierMap[name].itemCount += 1;
        supplierMap[name].totalCost += (it.itemCostTotal || it.costPrice);
        supplierMap[name].totalPaid += (it.paidToSupplier || 0);
      });
    }
  });

  for (const s in payments) {
    if (!supplierMap[s]) supplierMap[s] = { itemCount: 0, totalCost: 0, totalPaid: 0, totalDebt: 0 };
    if (Array.isArray(payments[s])) {
      payments[s].forEach(p => {
        supplierMap[s].totalPaid += (p.amount || 0);
      });
    }
  }

  const suppliers = Object.keys(supplierMap);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <Building2 size={20} className="text-primary-600" />
          Sổ Tổng Hợp Công Nợ Tất Cả Nhà In Gia Công
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Quản lý số tiền đã thanh toán và còn nợ các xưởng đối tác.
        </p>
        
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3">Tên Nhà In / Xưởng</th>
                <th className="px-4 py-3 text-center">Số Ấn Phẩm</th>
                <th className="px-4 py-3">Tổng Cost Gốc</th>
                <th className="px-4 py-3">Đã Trả Xưởng</th>
                <th className="px-4 py-3">SỐ TIỀN CÒN NỢ</th>
                <th className="px-4 py-3 text-center">Tình Trạng</th>
                <th className="px-4 py-3 text-right">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-500">Chưa có dữ liệu</td></tr>
              ) : (
                suppliers.map((name, idx) => {
                  const s = supplierMap[name];
                  const currentDebt = Math.max(0, s.totalCost - s.totalPaid);
                  
                  return (
                    <tr key={idx} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">{name}</td>
                      <td className="px-4 py-3 text-center">{s.itemCount}</td>
                      <td className="px-4 py-3">{formatMoney(s.totalCost)}</td>
                      <td className="px-4 py-3 font-medium text-emerald-600">{formatMoney(s.totalPaid)}</td>
                      <td className="px-4 py-3">
                        <span className={`font-bold ${currentDebt > 0 ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                          {formatMoney(currentDebt)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {currentDebt > 0 
                          ? <span className="bg-red-100 text-red-800 text-[11px] font-medium px-2 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Còn Nợ</span>
                          : <span className="bg-emerald-100 text-emerald-800 text-[11px] font-medium px-2 py-0.5 rounded dark:bg-emerald-900 dark:text-emerald-300">Hết Nợ</span>
                        }
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="flex items-center gap-1 text-[11px] font-bold bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-2 py-1 rounded dark:bg-emerald-900/50 dark:text-emerald-400 dark:hover:bg-emerald-800/50 transition-colors">
                            <Plus size={12} /> Trả Tiền
                          </button>
                          <button className="flex items-center gap-1 text-[11px] font-bold bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-2 py-1 rounded dark:bg-indigo-900/50 dark:text-indigo-400 dark:hover:bg-indigo-800/50 transition-colors">
                            <History size={12} /> Lịch Sử
                          </button>
                        </div>
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
