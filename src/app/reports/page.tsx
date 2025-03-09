'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { InventoryItem } from '@/types/inventory';
import { inventoryItems as mockItems } from '@/data/mockData';
import { isExpired, isNearExpiration } from '@/utils/dateUtils';

export default function ReportsPage() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  
  // 初期データのロード
  useEffect(() => {
    setInventoryItems(mockItems);
  }, []);
  
  // 統計データの計算
  const stats = useMemo(() => {
    // カテゴリー別アイテム数
    const categoryCount: Record<string, number> = {};
    
    // カテゴリー別在庫数
    const categoryQuantity: Record<string, number> = {};
    
    // 期限切れアイテム数
    let expiredCount = 0;
    
    // 期限間近アイテム数
    let nearExpirationCount = 0;
    
    // 在庫少アイテム数（仮の閾値として10を使用）
    let lowStockCount = 0;
    
    inventoryItems.forEach(item => {
      // カテゴリー別集計
      if (!categoryCount[item.category]) {
        categoryCount[item.category] = 0;
      }
      categoryCount[item.category]++;
      
      if (!categoryQuantity[item.category]) {
        categoryQuantity[item.category] = 0;
      }
      categoryQuantity[item.category] += item.quantity;
      
      // 期限切れチェック
      if (isExpired(item.expirationDate)) {
        expiredCount++;
      }
      
      // 期限間近チェック
      if (isNearExpiration(item.expirationDate)) {
        nearExpirationCount++;
      }
      
      // 在庫少チェック
      if (item.quantity <= 10) {
        lowStockCount++;
      }
    });
    
    return {
      totalItems: inventoryItems.length,
      categoryCount,
      categoryQuantity,
      expiredCount,
      nearExpirationCount,
      lowStockCount,
    };
  }, [inventoryItems]);
  
  // カテゴリー別の色
  const categoryColors: Record<string, string> = {
    '蔵時記菓子': 'bg-red-200',
    '抹茶': 'bg-green-200',
    'せんべい': 'bg-yellow-200',
    'もち': 'bg-purple-200',
    '一口': 'bg-blue-200',
    '駄菓子': 'bg-pink-200',
    'アイス': 'bg-cyan-200',
    'ジュース': 'bg-orange-200',
    '茶': 'bg-lime-200',
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">在庫レポート</h1>
        <p className="text-gray-600">在庫状況の概要と統計情報</p>
      </div>
      
      {/* 概要カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600 text-sm">総アイテム数</h2>
              <p className="text-2xl font-bold text-gray-900">{stats.totalItems}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600 text-sm">期限切れアイテム</h2>
              <p className="text-2xl font-bold text-gray-900">{stats.expiredCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600 text-sm">期限間近アイテム</h2>
              <p className="text-2xl font-bold text-gray-900">{stats.nearExpirationCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100 text-orange-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600 text-sm">在庫少アイテム</h2>
              <p className="text-2xl font-bold text-gray-900">{stats.lowStockCount}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* カテゴリー別統計 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">カテゴリー別アイテム数</h2>
          <div className="space-y-4">
            {Object.entries(stats.categoryCount).map(([category, count]) => (
              <div key={category}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{category}</span>
                  <span className="text-sm font-medium text-gray-700">{count}個</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${categoryColors[category] || 'bg-gray-500'}`} 
                    style={{ width: `${(count / stats.totalItems) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">カテゴリー別在庫数</h2>
          <div className="space-y-4">
            {Object.entries(stats.categoryQuantity).map(([category, quantity]) => {
              // 総在庫数を計算
              const totalQuantity = Object.values(stats.categoryQuantity).reduce((sum, qty) => sum + qty, 0);
              
              return (
                <div key={category}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{category}</span>
                    <span className="text-sm font-medium text-gray-700">{quantity}個</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${categoryColors[category] || 'bg-gray-500'}`} 
                      style={{ width: `${(quantity / totalQuantity) * 100}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* 期限切れ・在庫少アイテムリスト */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">期限切れ・期限間近アイテム</h2>
          {inventoryItems.filter(item => isExpired(item.expirationDate) || isNearExpiration(item.expirationDate)).length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      名称
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      カテゴリー
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      賞味期限
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      状態
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {inventoryItems
                    .filter(item => isExpired(item.expirationDate) || isNearExpiration(item.expirationDate))
                    .map(item => (
                      <tr key={item.id}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {item.category}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {item.expirationDate}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">
                          {isExpired(item.expirationDate) ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              期限切れ
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              期限間近
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">期限切れ・期限間近のアイテムはありません。</p>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">在庫少アイテム</h2>
          {inventoryItems.filter(item => item.quantity <= 10).length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      名称
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      カテゴリー
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      在庫数
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {inventoryItems
                    .filter(item => item.quantity <= 10)
                    .map(item => (
                      <tr key={item.id}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {item.category}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                            {item.quantity} {item.unit}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">在庫少のアイテムはありません。</p>
          )}
        </div>
      </div>
    </div>
  );
} 