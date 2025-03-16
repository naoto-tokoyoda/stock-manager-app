'use client';

import React from 'react';
import CategoryManager from '@/components/inventory/CategoryManager';

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">カテゴリー管理</h1>
        <p className="text-gray-600">在庫アイテムのカテゴリーを管理します</p>
      </div>
      <CategoryManager />
    </div>
  );
} 