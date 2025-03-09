import React from 'react';

// 仮のデータ
const ordersData = [
  { 
    id: 1, 
    itemName: '米', 
    quantity: 20, 
    unit: 'kg', 
    orderDate: '2023-05-01', 
    expectedDeliveryDate: '2023-05-10',
    status: '受取済み',
    supplier: '〇〇食品'
  },
  { 
    id: 2, 
    itemName: '小麦粉', 
    quantity: 10, 
    unit: 'kg', 
    orderDate: '2023-05-05', 
    expectedDeliveryDate: '2023-05-15',
    status: '発送済み',
    supplier: '△△製粉'
  },
  { 
    id: 3, 
    itemName: '醤油', 
    quantity: 5, 
    unit: 'L', 
    orderDate: '2023-05-08', 
    expectedDeliveryDate: '2023-05-18',
    status: '発注中',
    supplier: '□□醸造'
  },
  { 
    id: 4, 
    itemName: 'お茶', 
    quantity: 30, 
    unit: '箱', 
    orderDate: '2023-05-12', 
    expectedDeliveryDate: '2023-05-22',
    status: '発注中',
    supplier: '××茶園'
  },
];

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">発注管理</h1>
        <button className="btn-primary">
          新規発注
        </button>
      </div>

      {/* 検索・フィルターセクション */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">検索</label>
            <input
              type="text"
              id="search"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="商品名で検索..."
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">ステータス</label>
            <select
              id="status"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">すべて</option>
              <option value="発注中">発注中</option>
              <option value="発送済み">発送済み</option>
              <option value="受取済み">受取済み</option>
            </select>
          </div>
          <div>
            <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700 mb-1">発注日（から）</label>
            <input
              type="date"
              id="dateFrom"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700 mb-1">発注日（まで）</label>
            <input
              type="date"
              id="dateTo"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* 発注テーブル */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                商品名
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                数量
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                発注日
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                納品予定日
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ステータス
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                仕入先
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                アクション
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ordersData.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.itemName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.quantity} {order.unit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.orderDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.expectedDeliveryDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${order.status === '受取済み' ? 'bg-green-100 text-green-800' : 
                      order.status === '発送済み' ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.supplier}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      編集
                    </button>
                    {order.status !== '受取済み' && (
                      <button className="text-green-600 hover:text-green-800">
                        状態更新
                      </button>
                    )}
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