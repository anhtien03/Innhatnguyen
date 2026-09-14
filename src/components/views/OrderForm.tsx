import React, { useState, useEffect } from 'react';
import { CustomClient, Order, OrderItem, SupplierDir } from '../../types';
import { formatMoney, formatNumberString, parseMoney } from '../../utils';
import { Plus, X, Search } from 'lucide-react';

interface OrderFormProps {
  customClients: CustomClient[];
  suppliers: SupplierDir[];
  orders: Order[];
  onSave: (order: Order) => void;
  onCancel?: () => void;
  editingOrder?: Order | null;
}

export function OrderForm({ customClients, suppliers, orders, onSave, onCancel, editingOrder }: OrderFormProps) {
  // Simple form placeholder for now
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã Đơn</label>
          <input type="text" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300" readOnly value="NN-1234" />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày Lập Đơn</label>
          <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
        </div>
      </div>
      
      <div>
        <label className="block mb-2 text-sm font-medium text-primary-700 dark:text-primary-500">SĐT Khách (Gõ để tự điền liên kết)</label>
        <div className="flex gap-2">
          <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Nhập số điện thoại..." />
          <button type="button" className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 whitespace-nowrap">
            Xem Đơn
          </button>
        </div>
      </div>
      
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên Khách Hàng</label>
        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Tên khách" />
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <label className="block mb-2 text-xs font-bold text-primary-600 dark:text-primary-400 uppercase">CÁC MẶT HÀNG & PHÂN BỔ NHÀ IN GIA CÔNG</label>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700 mb-3 relative">
          <button type="button" className="absolute top-3 right-3 text-red-500 hover:text-red-700">
            <X size={18} />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
             <div>
                <label className="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-300">1. Tên Ấn Phẩm</label>
                <input type="text" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 dark:bg-gray-800 dark:border-gray-600 dark:text-white" placeholder="Nhập tên ấn phẩm..." />
             </div>
             <div>
                <label className="block mb-1 text-xs font-medium text-primary-700 dark:text-primary-500">Số Lượng</label>
                <input type="number" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 dark:bg-gray-800 dark:border-gray-600 dark:text-white" placeholder="1000" />
             </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800/30 mb-3">
             <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 mb-2 inline-block">2. GIÁ BÁN KHÁCH</span>
             <div className="grid grid-cols-2 gap-3">
               <div>
                  <label className="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-300">Đơn Giá (đ/cái)</label>
                  <input type="text" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 dark:bg-gray-800 dark:border-gray-600 dark:text-white" placeholder="250" />
               </div>
               <div>
                  <label className="block mb-1 text-xs font-bold text-primary-600 dark:text-primary-400">= Tổng Tiền Bán Khách</label>
                  <input type="text" className="bg-white border border-gray-300 text-primary-600 font-bold text-sm rounded-lg block w-full p-2 dark:bg-gray-800 dark:border-gray-600 dark:text-primary-400" placeholder="0" />
               </div>
             </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/10 p-3 rounded-lg border border-amber-100 dark:border-amber-800/20">
             <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded dark:bg-amber-900 dark:text-amber-300 mb-2 inline-block">3. TIỀN NHÀ IN</span>
             <div className="grid grid-cols-2 gap-3 mb-3">
               <div>
                  <label className="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-300">Nhà In</label>
                  <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 dark:bg-gray-800 dark:border-gray-600 dark:text-white">
                    <option>Chọn nhà in</option>
                  </select>
               </div>
               <div>
                  <label className="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-300">VAT Xưởng</label>
                  <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 dark:bg-gray-800 dark:border-gray-600 dark:text-white">
                    <option>0%</option>
                    <option>8%</option>
                  </select>
               </div>
             </div>
             <div className="grid grid-cols-2 gap-3">
               <div>
                  <label className="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-300">Cost (đ/cái)</label>
                  <input type="text" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 dark:bg-gray-800 dark:border-gray-600 dark:text-white" placeholder="180" />
               </div>
               <div>
                  <label className="block mb-1 text-xs font-bold text-red-600 dark:text-red-400">= Tổng Cost Gốc</label>
                  <input type="text" className="bg-white border border-gray-300 text-red-600 font-bold text-sm rounded-lg block w-full p-2 dark:bg-gray-800 dark:border-gray-600 dark:text-red-400" placeholder="0" />
               </div>
             </div>
          </div>
        </div>

        <button type="button" className="w-full text-primary-700 bg-primary-50 border border-dashed border-primary-300 hover:bg-primary-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-900/30 dark:text-primary-400 dark:border-primary-800 dark:hover:bg-primary-900/50 flex items-center justify-center gap-2">
          <Plus size={16} /> Thêm Mặt Hàng / Ấn Phẩm In Mới
        </button>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Khách Cần Trả (Gồm VAT, Ship, Phụ phí):</span>
          <span className="text-lg font-bold text-primary-600 dark:text-primary-400">0 đ</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tổng Cost Trả Xưởng (Gồm VAT Xưởng):</span>
          <span className="text-lg font-bold text-red-600 dark:text-red-400">0 đ</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
          <span className="text-sm font-bold text-gray-900 dark:text-white">Lợi Nhuận Gộp Thực Tế:</span>
          <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">0 đ</span>
        </div>
      </div>

      <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button type="button" className="flex-1 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
          Lưu Đơn Hàng Này
        </button>
        <button type="button" className="text-gray-700 bg-white border border-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
          Hủy
        </button>
      </div>
    </div>
  );
}
