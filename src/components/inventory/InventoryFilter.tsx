'use client';

import React from 'react';
import { InventoryCategory } from '@/types/inventory';
import { useInventoryStore } from '@/state/store/inventoryStore';

interface InventoryFilterProps {
  categories: InventoryCategory[];
}

export default function InventoryFilter({ categories }: InventoryFilterProps) {
  // Zustandストアから状態と関数を取得
  const filters = useInventoryStore((state) => state.filters);
  const setFilter = useInventoryStore((state) => state.setFilter);
  const resetFilters = useInventoryStore((state) => state.resetFilters);

  // 各フィルター項目の変更ハンドラー
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ searchTerm: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({ category: e.target.value });
  };

  const handleExpiredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ showExpiredOnly: e.target.checked });
  };

  const handleNearExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ showNearExpirationOnly: e.target.checked });
  };

  const handleLowStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ showLowStockOnly: e.target.checked });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            検索
          </label>
          <input
            type="text"
            id="search"
            value={filters.searchTerm}
            onChange={handleSearchChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="名称で検索..."
          />
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            カテゴリー
          </label>
          <select
            id="category"
            value={filters.category}
            onChange={handleCategoryChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">すべて</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex flex-col justify-end">
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="expired"
              checked={filters.showExpiredOnly}
              onChange={handleExpiredChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="expired" className="ml-2 block text-sm text-gray-700">
              期限切れのみ表示
            </label>
          </div>
          
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="nearExpiration"
              checked={filters.showNearExpirationOnly}
              onChange={handleNearExpirationChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="nearExpiration" className="ml-2 block text-sm text-gray-700">
              期限間近のみ表示
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="lowStock"
              checked={filters.showLowStockOnly}
              onChange={handleLowStockChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="lowStock" className="ml-2 block text-sm text-gray-700">
              在庫少のみ表示
            </label>
          </div>
        </div>
        
        <div className="flex items-end">
          <button
            onClick={resetFilters}
            className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            フィルターをリセット
          </button>
        </div>
      </div>
    </div>
  );
} 