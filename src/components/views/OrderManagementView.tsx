import React, { useState } from 'react';
import { CustomClient, Order, SupplierDir } from '../../types';
import { formatMoney, formatNumberString } from '../../utils';
import { OrderList } from './OrderList';
import { OrderForm } from './OrderForm';

interface OrderManagementViewProps {
  orders: Order[];
  customClients: CustomClient[];
  suppliers: SupplierDir[];
}

export function OrderManagementView({ 
  orders, 
  customClients, 
  suppliers, 
}: OrderManagementViewProps) {
  
  const handleEdit = (id: string) => {
    console.log('Edit order', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete order', id);
  };

  const handleQuickPay = (id: string) => {
    console.log('Quick pay order', id);
  };

  const handleSaveOrder = (order: Order) => {
    console.log('Save order', order);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1">
           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
             <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 flex justify-between items-center">
               <span>Tạo Đơn Hàng Mới</span>
             </h3>
             
             <OrderForm 
               customClients={customClients}
               suppliers={suppliers}
               orders={orders}
               onSave={handleSaveOrder}
             />
           </div>
        </div>
        <div className="xl:col-span-2">
           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-0 overflow-hidden flex flex-col">
              <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Danh Sách Đơn Hàng Nhật Nguyên
                </h3>
                <div className="flex flex-wrap gap-2 mt-4">
                  <input type="text" placeholder="Tìm nhanh..." className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <option value="">Tất cả nhà in</option>
                  </select>
                </div>
              </div>
              <OrderList 
                orders={orders} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
                onQuickPay={handleQuickPay} 
              />
           </div>
        </div>
      </div>
    </div>
  );
}
