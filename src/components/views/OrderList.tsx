import React from 'react';
import { Order } from '../../types';
import { formatMoney, formatNumberString } from '../../utils';
import { Edit2, Trash2 } from 'lucide-react';

interface OrderListProps {
  orders: Order[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onQuickPay: (id: string) => void;
}

export function OrderList({ orders, onEdit, onDelete, onQuickPay }: OrderListProps) {

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'Khách đặc biệt': return <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-amber-900 dark:text-amber-300 border border-amber-200">VIP Đặc Biệt</span>;
      case 'Khách cần chăm sóc': return <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300 border border-red-200">Cần chăm sóc</span>;
      case 'Khách khó': return <span className="bg-gray-700 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">Khách khó tính</span>;
      case 'Khách in nhiều': return <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-emerald-900 dark:text-emerald-300">In nhiều</span>;
      default: return <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300 border border-gray-200">In ít</span>;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">Mã / Ngày / Lên đơn</th>
            <th scope="col" className="px-4 py-3">Khách Hàng / Nhóm</th>
            <th scope="col" className="px-4 py-3">Ấn Phẩm, Số Lượng & Nhà In</th>
            <th scope="col" className="px-4 py-3">Khách Phải Trả</th>
            <th scope="col" className="px-4 py-3">Thu Khách / Nợ</th>
            <th scope="col" className="px-4 py-3">Lợi Nhuận</th>
            <th scope="col" className="px-4 py-3 text-right">Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                Chưa có đơn hàng nào
              </td>
            </tr>
          ) : (
            orders.map(o => (
              <tr key={o.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-4 py-3 align-top">
                  <div className="font-bold text-gray-900 dark:text-white">{o.id}</div>
                  <div className="text-xs text-gray-500">{o.date}</div>
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded-full border border-indigo-200 mt-1 inline-block">
                    {o.staff || 'Nguyên'}
                  </span>
                </td>
                <td className="px-4 py-3 align-top">
                  <div className="font-bold text-gray-900 dark:text-white mb-1">{o.clientName}</div>
                  <div className="mb-1">{getTierBadge(o.clientTier)}</div>
                  <div className="text-xs">
                    SĐT: <span className="font-medium text-primary-600 hover:underline cursor-pointer">{o.clientPhone}</span>
                    <a href={`https://zalo.me/${o.clientPhone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-primary-500 ml-1 text-[11px]">(Zalo)</a>
                  </div>
                  {o.clientTaxId && <div className="text-xs text-gray-500 mt-1">{o.clientTaxId}</div>}
                </td>
                <td className="px-4 py-3 align-top min-w-[250px]">
                  <div className="space-y-2">
                    {o.items.map((it, idx) => (
                      <div key={idx} className="pb-2 border-b border-dashed border-gray-200 dark:border-gray-600 last:border-0 last:pb-0">
                        <div className="text-gray-900 dark:text-white">
                          <span className="mr-1">•</span>
                          <span className="font-bold">{it.name}</span> - SL: <span className="font-bold">{formatNumberString(it.qty)}</span>
                          {it.saleUnitPrice ? ` (${formatMoney(it.saleUnitPrice)}/cái)` : ''}
                        </div>
                        <div className="text-xs mt-1">
                          Xưởng: <span className="font-bold text-amber-700 dark:text-amber-500">{it.supplier}</span>
                          {it.suppVatRate > 0 && <span className="text-amber-600 font-bold ml-1">[VAT Xưởng {it.suppVatRate}%]</span>}
                          {it.finish && <span className="text-rose-600 ml-1">| Lưu ý: {it.finish}</span>}
                        </div>
                        <div className="text-[11px] mt-1 text-gray-500">
                          Cost: {formatMoney(it.itemCostTotal || it.costPrice)} | Trả xưởng: {formatMoney(it.paidToSupplier)}{' '}
                          {it.debtToSupplier > 0 ? <span className="font-bold text-red-600">(Nợ: {formatMoney(it.debtToSupplier)})</span> : <span className="text-emerald-700">(Đủ)</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 align-top">
                  <div className="font-bold text-gray-900 dark:text-white text-sm">{formatMoney(o.finalTotal)}</div>
                  <div className="text-[11px] text-gray-500">
                    Gốc: {formatMoney(o.subTotal)} {o.vatRate > 0 ? `+ VAT ${o.vatRate}%` : ''}
                  </div>
                  {o.adjustAmount > 0 && (
                    <div className={`text-[11px] mt-1 ${o.adjustType === 'discount' ? 'text-red-700' : o.adjustType === 'commission' ? 'text-orange-700' : 'text-primary-600'}`}>
                      {o.adjustType === 'discount' ? '- CK khách: ' : o.adjustType === 'commission' ? '- Hoa hồng: ' : '+ Phụ thu: '}
                      {formatMoney(o.adjustAmount)}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 align-top">
                  <div className="text-sm">Đã thu: {formatMoney(o.clientPaid)}</div>
                  <div className="mt-1">
                    {o.clientDebt > 0 
                      ? <span className="bg-red-100 text-red-800 text-[11px] font-medium px-2 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Khách nợ: {formatMoney(o.clientDebt)}</span>
                      : <span className="bg-emerald-100 text-emerald-800 text-[11px] font-medium px-2 py-0.5 rounded dark:bg-emerald-900 dark:text-emerald-300">Đã thu đủ</span>
                    }
                  </div>
                  {o.clientDebt > 0 && (
                    <button 
                      onClick={() => onQuickPay(o.id)}
                      className="mt-2 bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded"
                    >
                      Thu đủ 100%
                    </button>
                  )}
                </td>
                <td className="px-4 py-3 align-top">
                  <div className="font-bold text-emerald-600 dark:text-emerald-400">{formatMoney(o.profit)}</div>
                </td>
                <td className="px-4 py-3 align-top text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => onEdit(o.id)} className="p-1 text-amber-500 hover:text-amber-600 bg-amber-50 hover:bg-amber-100 rounded">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => onDelete(o.id)} className="p-1 text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 rounded">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
