import { create } from 'zustand';
import { InventoryCategory } from '@/types/inventory';
import { categories as mockCategories } from '@/data/mockData';
import { v4 as uuidv4 } from 'uuid';

// カテゴリー管理ストアの型定義
interface CategoryStore {
  // 状態
  categories: InventoryCategory[];
  
  // アクション
  setCategories: (categories: InventoryCategory[]) => void;
  addCategory: (name: string) => void;
  updateCategory: (updatedCategory: InventoryCategory) => void;
  deleteCategory: (id: string) => void;
  
  // 初期化
  initializeStore: () => void;
}

// Zustandストアの作成
export const useCategoryStore = create<CategoryStore>((set) => ({
  // 初期状態
  categories: mockCategories,
  
  // アクション
  setCategories: (categories) => set({ categories }),
  
  addCategory: (name) => set((state) => ({
    categories: [...state.categories, { id: uuidv4(), name }]
  })),
  
  updateCategory: (updatedCategory) => set((state) => ({
    categories: state.categories.map((category) => 
      category.id === updatedCategory.id ? updatedCategory : category
    )
  })),
  
  deleteCategory: (id) => set((state) => ({
    categories: state.categories.filter((category) => category.id !== id)
  })),
  
  // 初期化関数
  initializeStore: () => set({ categories: mockCategories }),
})); 