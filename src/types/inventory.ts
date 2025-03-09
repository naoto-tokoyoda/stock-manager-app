export interface InventoryItem {
  id: string;
  category: string;
  name: string;
  quantity: number;
  unit: string;
  packageSize?: string;
  packageQuantity?: number;
  receiveDate?: string;
  receiveStatus?: '済' | '未';
  expirationDate?: string;
  scheduledUseDate?: string;
  notes?: string;
}

export interface InventoryCategory {
  id: string;
  name: string;
}

export interface InventoryAddition {
  id: string;
  inventoryItemId: string;
  date: string;
  quantity: number;
  unit: string;
}

export type UnitType = '個' | '枚' | '本' | '袋' | '箱' | '缶' | 'kg' | 'g' | 'L' | 'mL' | '束';

// 在庫状況のステータス
export type InventoryStatus = '十分' | '注文必要' | '在庫切れ';

// 日付フォーマット用の型
export type DateFormat = 'yyyy/MM/dd' | 'yyyy年MM月dd日' | 'MM/dd' | 'MM月dd日'; 