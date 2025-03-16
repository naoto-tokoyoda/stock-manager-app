'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { InventoryItem } from '@/types/inventory';
import InventoryTable from '@/components/inventory/InventoryTable';
import InventoryFilter from '@/components/inventory/InventoryFilter';
import InventoryForm from '@/components/inventory/InventoryForm';
import { isExpired, isNearExpiration } from '@/utils/dateUtils';
import { useInventoryStore } from '@/state/store/inventoryStore';
import { useCategoryStore } from '@/state/store/categoryStore';

export default function InventoryManager() {
  // Zustandストアから状態と関数を取得
  const inventoryItems = useInventoryStore((state) => state.inventoryItems);
  const filters = useInventoryStore((state) => state.filters);
  const initializeStore = useInventoryStore((state) => state.initializeStore);
  const updateItem = useInventoryStore((state) => state.updateItem);
  const addItem = useInventoryStore((state) => state.addItem);
  const deleteItem = useInventoryStore((state) => state.deleteItem);
  
  // カテゴリーストアから状態と関数を取得
  const categories = useCategoryStore((state) => state.categories);
  const initializeCategoryStore = useCategoryStore((state) => state.initializeStore);
  
  // モーダル状態
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | undefined>(undefined);
  
  // 確認ダイアログ状態
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  // 初期データのロード
  useEffect(() => {
    initializeStore();
    initializeCategoryStore();
    
    // カテゴリーが正しく初期化されているか確認
    console.log('Categories initialized:', categories);
  }, [initializeStore, initializeCategoryStore]);
  
  // カテゴリーの変更を監視
  useEffect(() => {
    console.log('Categories updated:', categories);
  }, [categories]);

  // フィルター適用後のアイテム
  const filteredItems = useMemo(() => {
    return inventoryItems.filter((item) => {
      // 検索語でフィルタリング
      if (
        filters.searchTerm &&
        !item.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
        !item.category.toLowerCase().includes(filters.searchTerm.toLowerCase())
      ) {
        return false;
      }

      // カテゴリーでフィルタリング
      if (filters.category && item.category !== filters.category) {
        return false;
      }

      // 期限切れアイテムのみ表示
      if (filters.showExpiredOnly && !isExpired(item.expirationDate)) {
        return false;
      }

      // 期限間近アイテムのみ表示
      if (filters.showNearExpirationOnly && !isNearExpiration(item.expirationDate)) {
        return false;
      }

      // 在庫少アイテムのみ表示 (仮の閾値として10を使用)
      if (filters.showLowStockOnly && item.quantity > 10) {
        return false;
      }

      return true;
    });
  }, [inventoryItems, filters]);

  // 編集モーダルを開く
  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  // 削除確認ダイアログを開く
  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setShowDeleteConfirm(true);
  };

  // アイテム削除の実行
  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      deleteItem(itemToDelete);
      setShowDeleteConfirm(false);
      setItemToDelete(null);
    }
  };

  // 新規アイテム追加モーダルを開く
  const handleAddNew = () => {
    setEditingItem(undefined);
    setIsModalOpen(true);
  };

  // フォーム送信ハンドラー (追加/更新)
  const handleFormSubmit = (item: InventoryItem) => {
    if (editingItem) {
      // 既存アイテムの更新
      updateItem(item);
    } else {
      // 新規アイテムの追加
      addItem(item);
    }
    setIsModalOpen(false);
  };

  // CSVエクスポート
  const handleExportCSV = () => {
    // CSVヘッダー
    const headers = [
      'ID',
      'カテゴリー',
      '名称',
      '数量',
      '単位',
      '入荷日',
      '入荷状況',
      '賞味期限',
      'パッケージサイズ',
    ].join(',');

    // CSVデータ行
    const rows = inventoryItems.map((item) => [
      item.id,
      item.category,
      item.name,
      item.quantity,
      item.unit,
      item.receiveDate || '',
      item.receiveStatus || '',
      item.expirationDate || '',
      item.packageSize || '',
    ].join(','));

    // CSVデータ作成
    const csvContent = [headers, ...rows].join('\n');

    // BOMを追加してUTF-8として認識されるようにする
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const blob = new Blob([bom, csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // ダウンロードリンク作成
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `inventory_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">在庫一覧</h1>
        <div className="flex space-x-2">
          <button 
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={handleExportCSV}
          >
            CSVエクスポート
          </button>
          <button 
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={handleAddNew}
          >
            新規アイテム追加
          </button>
        </div>
      </div>

      {/* フィルターコンポーネント */}
      <InventoryFilter categories={categories} />

      {/* 在庫テーブル */}
      <InventoryTable 
        items={filteredItems} 
        onEdit={handleEdit} 
        onDelete={handleDeleteClick} 
      />

      {/* 編集/追加モーダル */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="max-w-2xl w-full mx-4">
            <InventoryForm
              item={editingItem}
              categories={categories}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* 削除確認ダイアログ */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">アイテムを削除しますか？</h3>
            <p className="text-gray-500 mb-4">
              このアイテムを削除すると、関連するすべてのデータが失われます。この操作は元に戻せません。
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                キャンセル
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                削除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 