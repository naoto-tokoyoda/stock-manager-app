'use client';

import React, { useState, useEffect } from 'react';
import { InventoryCategory } from '@/types/inventory';
import { useCategoryStore } from '@/state/store/categoryStore';

export default function CategoryManager() {
  const categories = useCategoryStore((state) => state.categories);
  const initializeStore = useCategoryStore((state) => state.initializeStore);
  const addCategory = useCategoryStore((state) => state.addCategory);
  const updateCategory = useCategoryStore((state) => state.updateCategory);
  const deleteCategory = useCategoryStore((state) => state.deleteCategory);

  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<InventoryCategory | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  // 初期データのロード
  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  // 新規カテゴリー追加
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      addCategory(newCategoryName.trim());
      setNewCategoryName('');
    }
  };

  // カテゴリー編集モード開始
  const handleEditStart = (category: InventoryCategory) => {
    setEditingCategory({ ...category });
  };

  // カテゴリー編集キャンセル
  const handleEditCancel = () => {
    setEditingCategory(null);
  };

  // カテゴリー更新
  const handleUpdateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory && editingCategory.name.trim()) {
      updateCategory(editingCategory);
      setEditingCategory(null);
    }
  };

  // カテゴリー名変更
  const handleCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingCategory) {
      setEditingCategory({ ...editingCategory, name: e.target.value });
    }
  };

  // 削除確認ダイアログを開く
  const handleDeleteClick = (id: string) => {
    setCategoryToDelete(id);
    setShowDeleteConfirm(true);
  };

  // 削除確認
  const handleDeleteConfirm = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete);
      setShowDeleteConfirm(false);
      setCategoryToDelete(null);
    }
  };

  // 削除キャンセル
  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setCategoryToDelete(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-medium text-gray-900 mb-4">カテゴリー管理</h2>

      {/* 新規カテゴリー追加フォーム */}
      <form onSubmit={handleAddCategory} className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="新規カテゴリー名"
            className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            追加
          </button>
        </div>
      </form>

      {/* カテゴリーリスト */}
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center justify-between p-3 border rounded-md">
            {editingCategory && editingCategory.id === category.id ? (
              <form onSubmit={handleUpdateCategory} className="flex-1 flex">
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={handleCategoryNameChange}
                  className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-green-600 text-white px-3 py-1 rounded-none hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  保存
                </button>
                <button
                  type="button"
                  onClick={handleEditCancel}
                  className="bg-gray-500 text-white px-3 py-1 rounded-r-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  キャンセル
                </button>
              </form>
            ) : (
              <>
                <span className="text-gray-800">{category.name}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditStart(category)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    編集
                  </button>
                  <button
                    onClick={() => handleDeleteClick(category.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    削除
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* 削除確認ダイアログ */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">カテゴリーを削除しますか？</h3>
            <p className="text-gray-500 mb-4">
              このカテゴリーを削除すると、関連する在庫アイテムのカテゴリー情報が失われる可能性があります。
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleDeleteCancel}
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