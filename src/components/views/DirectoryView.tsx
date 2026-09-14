import React from 'react';
import { SupplierDir } from '../../types';
import { BookOpen, Trash2 } from 'lucide-react';

interface DirectoryViewProps {
  suppliers: SupplierDir[];
}

export function DirectoryView({ suppliers }: DirectoryViewProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <BookOpen size={20} className="text-primary-600" />
          Danh Bạ Nhà In & Chuyên Môn Gia Công
        </h3>
        
        <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loại Ấn Phẩm</label>
              <input type="text" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:text-white" placeholder="vd: Thẻ từ" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên Nhà In</label>
              <input type="text" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:text-white" placeholder="vd: Nhà in A" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SĐT / Zalo</label>
              <input type="text" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:text-white" placeholder="09..." />
            </div>
            <div>
               <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Năng lực</label>
               <input type="text" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:text-white" placeholder="vd: Lấy gấp" />
            </div>
          </div>
          <button type="button" className="text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            + Thêm Nhà In
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3">Loại Ấn Phẩm</th>
                <th className="px-4 py-3">Tên Nhà In Đối Tác</th>
                <th className="px-4 py-3">SĐT / Zalo</th>
                <th className="px-4 py-3">Ghi Chú Năng Lực</th>
                <th className="px-4 py-3 text-right">Xóa</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((s, i) => (
                <tr key={i} className="border-b dark:border-gray-700">
                  <td className="px-4 py-3 font-medium text-primary-600">{s.product}</td>
                  <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">{s.supplier}</td>
                  <td className="px-4 py-3 text-primary-500">{s.phone}</td>
                  <td className="px-4 py-3">{s.notes}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-red-500 hover:text-red-700 p-1"><Trash2 size={16}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
