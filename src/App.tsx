import React, { useState, useMemo } from 'react';
import { useAppStore } from './store';
import { Layout } from './components/Layout';
import { TopStats } from './components/TopStats';
import { isOrderInTimeFilter } from './utils';

import { OrderManagementView } from './components/views/OrderManagementView';
import { ClientsDirectoryView } from './components/views/ClientsDirectoryView';
import { DirectoryView } from './components/views/DirectoryView';

export default function App() {
  const store = useAppStore();
  const [activeTab, setActiveTab] = useState('orders');
  const [globalSearch, setGlobalSearch] = useState('');
  
  const [timeFilter, setTimeFilter] = useState('year');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleSearch = () => {
    setActiveTab('orders');
  };

  const resetSearch = () => {
    setGlobalSearch('');
  };
  
  // Calculate top stats
  const stats = useMemo(() => {
    let periodRev = 0;
    let periodProfit = 0;
    let totalVatOut = 0;
    let totalVatIn = 0;
    let totalClientDebt = 0;
    let totalSupplierCost = 0;
    let totalSupplierPaidAll = 0;

    store.orders.forEach(o => {
      totalClientDebt += o.clientDebt;
      if (o.items) {
        o.items.forEach(it => {
          totalSupplierCost += (it.itemCostTotal || it.costPrice || 0);
          totalSupplierPaidAll += (it.paidToSupplier || 0);
        });
      }

      // Simple time check logic needs to be implemented in utils, using a stub for now
      // Assuming all for now
      periodRev += o.finalTotal;
      periodProfit += o.profit;
      totalVatOut += (o.vatOutAmount || 0);
      totalVatIn += (o.vatInAmount || 0);
    });

    Object.values(store.payments).forEach(pList => {
      pList.forEach(p => {
        totalSupplierPaidAll += (p.amount || 0);
      });
    });

    const totalSupplierDebt = Math.max(0, totalSupplierCost - totalSupplierPaidAll);
    
    let periodLabel = 'Năm ' + selectedYear;
    if (timeFilter === 'month') periodLabel = 'Tháng Này';
    else if (timeFilter === 'week') periodLabel = 'Tuần Này';
    else if (timeFilter === 'all') periodLabel = 'Tất Cả';

    return {
      periodLabel,
      periodRev,
      periodProfit,
      totalVatOut,
      totalVatIn,
      totalClientDebt,
      totalSupplierDebt
    };
  }, [store.orders, store.payments, timeFilter, selectedYear]);

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      globalSearch={globalSearch}
      setGlobalSearch={setGlobalSearch}
      handleSearch={handleSearch}
      resetSearch={resetSearch}
    >
      <div className="mb-4 flex flex-wrap items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Kỳ thống kê:</label>
          <select 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option value="year">Toàn Bộ Năm</option>
            <option value="month">Tháng Này</option>
            <option value="week">Tuần Này</option>
            <option value="all">Tất Cả Các Năm</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
           <select 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {[0, 1, 2, 3].map(offset => {
              const y = new Date().getFullYear() + 1 - offset;
              return <option key={y} value={y}>Năm {y}</option>;
            })}
          </select>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 ml-auto">
          Xuất Excel (CSV)
        </button>
      </div>

      <TopStats {...stats} />

      {activeTab === 'orders' && (
        <OrderManagementView 
           orders={store.orders}
           customClients={store.clients}
           suppliers={store.suppliers}
        />
      )}
      
      {activeTab === 'clientsDirectory' && (
        <ClientsDirectoryView clients={store.clients} />
      )}

      {activeTab === 'charts' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Biểu Đồ Lợi Nhuận</h2>
        </div>
      )}

      {activeTab === 'dailyCare' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Chăm Sóc Khách Hàng</h2>
        </div>
      )}

      {activeTab === 'clients' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Phân Tích Khách Hàng</h2>
        </div>
      )}

      {activeTab === 'suppliers' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Công Nợ Nhà In</h2>
        </div>
      )}

      {activeTab === 'directory' && (
        <DirectoryView suppliers={store.suppliers} />
      )}
    </Layout>
  );
}
