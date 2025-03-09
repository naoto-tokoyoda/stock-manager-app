'use client';

import React, { useState, useEffect } from 'react';
import { InventoryItem, InventoryCategory, UnitType } from '@/types/inventory';

interface InventoryFormProps {
  item?: InventoryItem;
  categories: InventoryCategory[];
  onSubmit: (item: InventoryItem) => void;
  onCancel: () => void;
}

const unitOptions: UnitType[] = ['個', '枚', '本', '袋', '箱', '缶', 'kg', 'g', 'L', 'mL', '束'];

export default function InventoryForm({ item, categories, onSubmit, onCancel }: InventoryFormProps) {
  const [formData, setFormData] = useState<Partial<InventoryItem>>({
    id: '',
    category: '',
    name: '',
    quantity: 0,
    unit: '個',
    packageSize: '',
    packageQuantity: undefined,
    receiveDate: '',
    receiveStatus: undefined,
    expirationDate: '',
    scheduledUseDate: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // 編集モードの場合、初期値をセット
  useEffect(() => {
    if (item) {
      setFormData({
        ...item,
      });
    }
  }, [item]);

  // フォーム入力の変更ハンドラー
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // 数値フィールドの処理
    if (type === 'number') {
      setFormData({
        ...formData,
        [name]: value === '' ? undefined : Number(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    
    // エラーをクリア
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  // フォーム送信ハンドラー
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // バリデーション
    const newErrors: Record<string, string> = {};
    
    if (!formData.category) {
      newErrors.category = 'カテゴリーを選択してください';
    }
    
    if (!formData.name) {
      newErrors.name = '名称を入力してください';
    }
    
    if (formData.quantity === undefined || formData.quantity < 0) {
      newErrors.quantity = '有効な数量を入力してください';
    }
    
    if (!formData.unit) {
      newErrors.unit = '単位を選択してください';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // 新規アイテムの場合はIDを生成
    const submittedItem: InventoryItem = {
      ...formData,
      id: formData.id || `item-${Date.now()}`,
      quantity: formData.quantity || 0,
      unit: formData.unit || '個',
      category: formData.category || '',
      name: formData.name || '',
    } as InventoryItem;
    
    onSubmit(submittedItem);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        {item ? '在庫アイテムを編集' : '新規アイテムを追加'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* カテゴリー */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              カテゴリー <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category || ''}
              onChange={handleChange}
              className={`w-full rounded-md shadow-sm ${
                errors.category ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
            >
              <option value="">選択してください</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>
          
          {/* 名称 */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              名称 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              className={`w-full rounded-md shadow-sm ${
                errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
          
          {/* 数量 */}
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              数量 <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="0"
              value={formData.quantity === undefined ? '' : formData.quantity}
              onChange={handleChange}
              className={`w-full rounded-md shadow-sm ${
                errors.quantity ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            {errors.quantity && (
              <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
            )}
          </div>
          
          {/* 単位 */}
          <div>
            <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
              単位 <span className="text-red-500">*</span>
            </label>
            <select
              id="unit"
              name="unit"
              value={formData.unit || '個'}
              onChange={handleChange}
              className={`w-full rounded-md shadow-sm ${
                errors.unit ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
            >
              {unitOptions.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
            {errors.unit && (
              <p className="mt-1 text-sm text-red-600">{errors.unit}</p>
            )}
          </div>
          
          {/* パッケージサイズ */}
          <div>
            <label htmlFor="packageSize" className="block text-sm font-medium text-gray-700 mb-1">
              パッケージサイズ
            </label>
            <input
              type="text"
              id="packageSize"
              name="packageSize"
              value={formData.packageSize || ''}
              onChange={handleChange}
              placeholder="例: 10個入り"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          {/* パッケージ数量 */}
          <div>
            <label htmlFor="packageQuantity" className="block text-sm font-medium text-gray-700 mb-1">
              パッケージ数量
            </label>
            <input
              type="number"
              id="packageQuantity"
              name="packageQuantity"
              min="0"
              value={formData.packageQuantity === undefined ? '' : formData.packageQuantity}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          {/* 入荷日 */}
          <div>
            <label htmlFor="receiveDate" className="block text-sm font-medium text-gray-700 mb-1">
              入荷日
            </label>
            <input
              type="date"
              id="receiveDate"
              name="receiveDate"
              value={formData.receiveDate || ''}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          {/* 入荷状況 */}
          <div>
            <label htmlFor="receiveStatus" className="block text-sm font-medium text-gray-700 mb-1">
              入荷状況
            </label>
            <select
              id="receiveStatus"
              name="receiveStatus"
              value={formData.receiveStatus || ''}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">選択してください</option>
              <option value="済">済</option>
              <option value="未">未</option>
            </select>
          </div>
          
          {/* 賞味期限 */}
          <div>
            <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700 mb-1">
              賞味期限
            </label>
            <input
              type="date"
              id="expirationDate"
              name="expirationDate"
              value={formData.expirationDate || ''}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          {/* 予定使用日 */}
          <div>
            <label htmlFor="scheduledUseDate" className="block text-sm font-medium text-gray-700 mb-1">
              予定使用日
            </label>
            <input
              type="date"
              id="scheduledUseDate"
              name="scheduledUseDate"
              value={formData.scheduledUseDate || ''}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {/* メモ */}
        <div className="mb-6">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            メモ
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            value={formData.notes || ''}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        {/* ボタン */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {item ? '更新' : '追加'}
          </button>
        </div>
      </form>
    </div>
  );
} 