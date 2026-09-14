import React from 'react';
import { CustomClient } from '../../types';
import { Edit2, Trash2, Users } from 'lucide-react';

interface ClientsDirectoryViewProps {
  clients: CustomClient[];
}

export function ClientsDirectoryView({ clients }: ClientsDirectoryViewProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Users size={20} className="text-primary-600" />
          Danh Bạ & Hồ Sơ Khách Hàng
        </h3>
        
        <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số Điện Thoại (*)</label>
              <input type="text" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:text-white" placeholder="09xxxx..." />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên Khách Hàng (*)</label>
              <input type="text" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:text-white" placeholder="vd: Anh Tuấn / Cty Minh Phát" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nhóm Khách</label>
              <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:text-white">
                <option>Khách in nhiều</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nguồn Khách</label>
              <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:text-white">
                <option>Zalo</option>
              </select>
            </div>
          </div>
          <button type="button" className="text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            + Lưu Khách
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3">SĐT / Zalo</th>
                <th className="px-4 py-3">Tên Khách Hàng</th>
                <th className="px-4 py-3">Phân Nhóm</th>
                <th className="px-4 py-3">Nguồn</th>
                <th className="px-4 py-3 text-right">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {clients.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">Chưa có khách hàng</td></tr>
              ) : (
                clients.map((c, i) => (
                  <tr key={i} className="border-b dark:border-gray-700">
                    <td className="px-4 py-3 font-medium text-primary-600">{c.phone}</td>
                    <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">{c.name}</td>
                    <td className="px-4 py-3">{c.tier}</td>
                    <td className="px-4 py-3">{c.source}</td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-red-500 hover:text-red-700 p-1"><Trash2 size={16}/></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
