import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  MessageCircle, 
  PieChart, 
  Building2, 
  BookOpen, 
  Search, 
  Menu,
  Bell,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  globalSearch: string;
  setGlobalSearch: (search: string) => void;
  handleSearch: () => void;
  resetSearch: () => void;
}

export function Layout({ children, activeTab, setActiveTab, globalSearch, setGlobalSearch, handleSearch, resetSearch }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Quản Lý Đơn Hàng', id: 'orders', icon: LayoutDashboard },
    { name: 'Danh Bạ Khách Hàng', id: 'clientsDirectory', icon: Users },
    { name: 'Biểu Đồ Lợi Nhuận', id: 'charts', icon: BarChart3 },
    { name: 'Lên Lịch Chăm Sóc', id: 'dailyCare', icon: MessageCircle },
    { name: 'Phân Tích Khách Hàng', id: 'clients', icon: PieChart },
    { name: 'Công Nợ Nhà In', id: 'suppliers', icon: Building2 },
    { name: 'Danh Bạ Nhà In', id: 'directory', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-auto flex flex-col`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-xl">
              N
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">Nhật Nguyên</span>
          </div>
          <button className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id 
                  ? 'bg-primary-50 text-primary-700 dark:bg-gray-700 dark:text-white' 
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'text-primary-700 dark:text-primary-500' : 'text-gray-500 dark:text-gray-400'} />
              {item.name}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar */}
        <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <div className="flex items-center gap-4 flex-1">
              <button 
                className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu size={24} />
              </button>
              
              <div className="hidden sm:flex items-center max-w-md w-full relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Nhập Mã đơn hoặc SĐT khách..."
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button onClick={handleSearch} className="px-3 text-sm font-medium text-white bg-primary-600 rounded-r-lg hover:bg-primary-700 h-full border border-primary-600">
                    Tìm
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:block text-sm text-gray-500 dark:text-gray-400">
                Hotline: <strong className="text-gray-900 dark:text-white">0359005469</strong>
              </div>
            </div>
          </div>
          
          {/* Mobile Search - visible only on small screens */}
          <div className="sm:hidden px-4 pb-4">
             <div className="flex items-center w-full relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Tìm kiếm..."
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
