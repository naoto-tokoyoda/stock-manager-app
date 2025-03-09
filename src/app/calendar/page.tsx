'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { InventoryItem } from '@/types/inventory';
import { inventoryItems as mockItems } from '@/data/mockData';
import Link from 'next/link';

// 1ヶ月のカレンダーを表示するコンポーネント
export default function CalendarPage() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // 初期データのロード
  useEffect(() => {
    setInventoryItems(mockItems);
  }, []);

  // 現在の年月
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  // 月の最初の日と最後の日
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  
  // 月の最初の日の曜日（0: 日曜日, 1: 月曜日, ..., 6: 土曜日）
  const firstDayOfWeek = firstDayOfMonth.getDay();
  
  // カレンダーの日付配列を生成
  const calendarDays = useMemo(() => {
    const days = [];
    
    // 前月の日を追加
    for (let i = 0; i < firstDayOfWeek; i++) {
      const day = new Date(currentYear, currentMonth, -firstDayOfWeek + i + 1);
      days.push({
        date: day,
        isCurrentMonth: false,
        items: [] as InventoryItem[],
      });
    }
    
    // 当月の日を追加
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const day = new Date(currentYear, currentMonth, i);
      days.push({
        date: day,
        isCurrentMonth: true,
        items: [] as InventoryItem[],
      });
    }
    
    // 翌月の日を追加（6週間分になるように）
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const day = new Date(currentYear, currentMonth + 1, i);
      days.push({
        date: day,
        isCurrentMonth: false,
        items: [] as InventoryItem[],
      });
    }
    
    return days;
  }, [currentYear, currentMonth, firstDayOfWeek, lastDayOfMonth]);
  
  // 各日付に期限切れアイテムを割り当て
  const calendarWithItems = useMemo(() => {
    return calendarDays.map(day => {
      const dayStr = day.date.toISOString().split('T')[0];
      const itemsForDay = inventoryItems.filter(item => {
        return item.expirationDate === dayStr;
      });
      
      return {
        ...day,
        items: itemsForDay,
      };
    });
  }, [calendarDays, inventoryItems]);
  
  // 前月へ
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };
  
  // 翌月へ
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };
  
  // 今月へ
  const goToCurrentMonth = () => {
    setCurrentDate(new Date());
  };
  
  // 曜日の表示
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  
  // 月の表示
  const monthNames = [
    '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月', '11月', '12月'
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">賞味期限カレンダー</h1>
        <div className="flex space-x-2">
          <button
            onClick={goToPreviousMonth}
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            前月
          </button>
          <button
            onClick={goToCurrentMonth}
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            今月
          </button>
          <button
            onClick={goToNextMonth}
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            翌月
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-900">
            {currentYear}年 {monthNames[currentMonth]}
          </h2>
        </div>
        
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {/* 曜日ヘッダー */}
          {weekdays.map((day, index) => (
            <div
              key={index}
              className={`py-2 text-center text-sm font-medium ${
                index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-500'
              }`}
            >
              {day}
            </div>
          ))}
          
          {/* カレンダー日付 */}
          {calendarWithItems.map((day, index) => {
            const isToday = new Date().toDateString() === day.date.toDateString();
            const dayOfWeek = day.date.getDay();
            
            return (
              <div
                key={index}
                className={`min-h-[120px] p-2 bg-white ${
                  !day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''
                } ${isToday ? 'bg-blue-50' : ''}`}
              >
                <div className={`text-right font-medium ${
                  dayOfWeek === 0 ? 'text-red-500' : 
                  dayOfWeek === 6 ? 'text-blue-500' : 
                  'text-gray-900'
                }`}>
                  {day.date.getDate()}
                </div>
                
                <div className="mt-1 space-y-1 max-h-[80px] overflow-y-auto">
                  {day.items.map((item) => (
                    <Link
                      href={`/inventory?id=${item.id}`}
                      key={item.id}
                      className="block text-xs p-1 rounded bg-red-100 text-red-800 hover:bg-red-200"
                    >
                      {item.name} ({item.quantity}{item.unit})
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* 凡例 */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-2">凡例</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-100 mr-2"></div>
            <span className="text-sm text-gray-700">賞味期限当日</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-50 mr-2"></div>
            <span className="text-sm text-gray-700">今日</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-50 mr-2"></div>
            <span className="text-sm text-gray-700">前月/翌月</span>
          </div>
        </div>
      </div>
    </div>
  );
} 