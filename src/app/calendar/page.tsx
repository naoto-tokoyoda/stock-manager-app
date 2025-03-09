import React from 'react';

// 仮のカレンダーデータ
const calendarData = {
  month: '2023年5月',
  days: Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    events: i % 7 === 3 ? [
      { id: 1, type: 'delivery', title: '米 (20kg) 入荷予定', status: 'pending' }
    ] : i % 5 === 2 ? [
      { id: 2, type: 'order', title: '小麦粉 (10kg) 発注予定', status: 'planned' }
    ] : []
  }))
};

export default function CalendarPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">発注・入荷カレンダー</h1>
        <div className="flex space-x-2">
          <button className="btn-secondary">
            前月
          </button>
          <button className="btn-secondary">
            今月
          </button>
          <button className="btn-secondary">
            翌月
          </button>
        </div>
      </div>

      {/* カレンダーの凡例 */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex space-x-6">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-sm">発注予定</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm">入荷予定</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
            <span className="text-sm">在庫確認日</span>
          </div>
        </div>
      </div>

      {/* カレンダーグリッド */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="text-center p-4 bg-gray-50 border-b">
          <h2 className="text-xl font-semibold">{calendarData.month}</h2>
        </div>
        
        {/* 曜日ヘッダー */}
        <div className="grid grid-cols-7 border-b">
          {['日', '月', '火', '水', '木', '金', '土'].map((day, index) => (
            <div key={day} className={`p-2 text-center font-medium ${index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : ''}`}>
              {day}
            </div>
          ))}
        </div>
        
        {/* カレンダー日付グリッド */}
        <div className="grid grid-cols-7">
          {/* 5月1日が月曜日と仮定して、前月の日を空白で埋める */}
          <div className="min-h-[100px] p-2 border-b border-r bg-gray-50"></div>
          
          {/* 日付セル */}
          {calendarData.days.map((dayData, index) => (
            <div 
              key={dayData.day} 
              className={`min-h-[100px] p-2 border-b border-r ${(index + 1) % 7 === 0 ? 'border-r-0' : ''} ${(index + 1) % 7 === 6 ? 'bg-blue-50' : (index + 1) % 7 === 0 ? 'bg-red-50' : ''}`}
            >
              <div className={`text-right mb-1 ${(index + 1) % 7 === 6 ? 'text-blue-500' : (index + 1) % 7 === 0 ? 'text-red-500' : ''}`}>
                {dayData.day}
              </div>
              
              {/* イベント */}
              {dayData.events.map(event => (
                <div 
                  key={event.id} 
                  className={`p-1 mb-1 text-xs rounded ${
                    event.type === 'delivery' ? 'bg-green-100 text-green-800' : 
                    event.type === 'order' ? 'bg-blue-100 text-blue-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {event.title}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 