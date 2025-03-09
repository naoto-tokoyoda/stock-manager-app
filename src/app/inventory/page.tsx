import React from 'react';

// 仮のデータ
const inventoryData = [
  { id: 1, category: '食材', name: '米', quantity: 10, unit: 'kg', lastUpdated: '2023-05-15' },
  { id: 2, category: '食材', name: '小麦粉', quantity: 5, unit: 'kg', lastUpdated: '2023-05-10' },
  { id: 3, category: '調味料', name: '醤油', quantity: 3, unit: 'L', lastUpdated: '2023-05-12' },
  { id: 4, category: '調味料', name: '味噌', quantity: 2, unit: 'kg', lastUpdated: '2023-05-08' },
  { id: 5, category: '飲料', name: 'お茶', quantity: 20, unit: '箱', lastUpdated: '2023-05-14' },
];

export default function InventoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">在庫一覧</h1>
        <div className="flex space-x-2">
          <button className="btn-secondary">
            CSVエクスポート
          </button>
          <button className="btn-primary">
            新規アイテム追加
          </button>
        </div>
      </div>

      {/* 検索・フィルターセクション */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">検索</label>
            <input
              type="text"
              id="search"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="名称で検索..."
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">カテゴリー</label>
            <select
              id="category"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">すべて</option>
              <option value="食材">食材</option>
              <option value="調味料">調味料</option>
              <option value="飲料">飲料</option>
            </select>
          </div>
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">並び替え</label>
            <select
              id="sort"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="name">名称</option>
              <option value="quantity">数量</option>
              <option value="lastUpdated">最終更新日</option>
            </select>
          </div>
        </div>
      </div>

      {/* 在庫テーブル */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                カテゴリー
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                名称
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                数量
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                最終更新日
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                アクション
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventoryData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.quantity} {item.unit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.lastUpdated}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      編集
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      削除
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 