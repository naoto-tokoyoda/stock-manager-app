import { create } from 'zustand';
import { InventoryItem } from '@/types/inventory';
import { inventoryItems as mockItems } from '@/data/mockData';

// フィルター条件の型定義
export interface FilterCriteria {
  searchTerm: string;
  category: string;
  showExpiredOnly: boolean;
  showNearExpirationOnly: boolean;
  showLowStockOnly: boolean;
}

// 在庫管理ストアの型定義
interface InventoryStore {
  // 状態
  inventoryItems: InventoryItem[];
  filters: FilterCriteria;
  
  // アクション
  setInventoryItems: (items: InventoryItem[]) => void;
  addItem: (item: InventoryItem) => void;
  updateItem: (updatedItem: InventoryItem) => void;
  deleteItem: (id: string) => void;
  
  // フィルター関連
  setFilter: (filter: Partial<FilterCriteria>) => void;
  resetFilters: () => void;
  
  // 初期化
  initializeStore: () => void;
}

// デフォルトのフィルター状態
const defaultFilters: FilterCriteria = {
  searchTerm: '',
  category: '',
  showExpiredOnly: false,
  showNearExpirationOnly: false,
  showLowStockOnly: false,
};

// Zustandストアの作成
export const useInventoryStore = create<InventoryStore>((set) => ({
  // 初期状態
  inventoryItems: [],
  filters: defaultFilters,
  
  // アクション
  setInventoryItems: (items) => set({ inventoryItems: items }),
  
  addItem: (item) => set((state) => ({
    inventoryItems: [...state.inventoryItems, item]
  })),
  
  updateItem: (updatedItem) => set((state) => ({
    inventoryItems: state.inventoryItems.map((item) => 
      item.id === updatedItem.id ? updatedItem : item
    )
  })),
  
  deleteItem: (id) => set((state) => ({
    inventoryItems: state.inventoryItems.filter((item) => item.id !== id)
  })),
  
  // フィルター関連
  setFilter: (filter) => set((state) => ({
    filters: { ...state.filters, ...filter }
  })),
  
  resetFilters: () => set({ filters: defaultFilters }),
  
  // 初期化関数
  initializeStore: () => set({ inventoryItems: mockItems }),
})); 