import React from 'react';

// 仮のデータ
const monthlyConsumptionData = [
  { month: '1月', rice: 50, flour: 30, soy: 15, tea: 25 },
  { month: '2月', rice: 45, flour: 28, soy: 18, tea: 22 },
  { month: '3月', rice: 55, flour: 35, soy: 20, tea: 30 },
  { month: '4月', rice: 60, flour: 40, soy: 22, tea: 35 },
  { month: '5月', rice: 48, flour: 32, soy: 16, tea: 28 },
];

const topItemsData = [
  { name: '米', consumption: 258, percentage: 30 },
  { name: '小麦粉', consumption: 165, percentage: 19 },
  { name: 'お茶', consumption: 140, percentage: 16 },
  { name: '醤油', consumption: 91, percentage: 11 },
  { name: '味噌', consumption: 75, percentage: 9 },
];

export default function ReportsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">分析レポート</h1>
        <div className="flex space-x-2">
          <button className="btn-secondary">
            CSVエクスポート
          </button>
          <button className="btn-primary">
            レポート生成
          </button>
        </div>
      </div>

      {/* レポート期間選択 */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-1">レポートタイプ</label>
            <select
              id="reportType"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="monthly">月次消費量</option>
              <option value="category">カテゴリー別分析</option>
              <option value="forecast">在庫予測</option>
            </select>
          </div>
          <div>
            <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700 mb-1">期間（から）</label>
            <input
              type="date"
              id="dateFrom"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700 mb-1">期間（まで）</label>
            <input
              type="date"
              id="dateTo"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* レポートグリッド */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* 月次消費量グラフ */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">月次消費量推移</h2>
          <div className="h-64 flex items-end justify-between">
            {monthlyConsumptionData.map((data) => (
              <div key={data.month} className="flex flex-col items-center w-1/6">
                <div className="flex flex-col-reverse w-full">
                  <div 
                    className="bg-blue-500 w-full" 
                    style={{ height: `${data.rice / 2}px` }}
                    title={`米: ${data.rice}kg`}
                  ></div>
                  <div 
                    className="bg-yellow-500 w-full" 
                    style={{ height: `${data.flour / 2}px` }}
                    title={`小麦粉: ${data.flour}kg`}
                  ></div>
                  <div 
                    className="bg-green-500 w-full" 
                    style={{ height: `${data.soy / 2}px` }}
                    title={`醤油: ${data.soy}L`}
                  ></div>
                  <div 
                    className="bg-red-500 w-full" 
                    style={{ height: `${data.tea / 2}px` }}
                    title={`お茶: ${data.tea}箱`}
                  ></div>
                </div>
                <span className="mt-2 text-sm">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 mr-1"></div>
                <span className="text-xs">米</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 mr-1"></div>
                <span className="text-xs">小麦粉</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 mr-1"></div>
                <span className="text-xs">醤油</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 mr-1"></div>
                <span className="text-xs">お茶</span>
              </div>
            </div>
          </div>
        </div>

        {/* 消費量トップ5 */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">消費量トップ5</h2>
          <div className="space-y-4">
            {topItemsData.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className="text-sm text-gray-500">{item.consumption} 単位 ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 消費傾向分析 */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">消費傾向分析</h2>
        <div className="prose max-w-none">
          <p>
            過去5ヶ月間のデータに基づく分析結果:
          </p>
          <ul>
            <li>米の消費量は平均して月48kgで、4月に最大消費量(60kg)を記録しました。</li>
            <li>小麦粉の消費量は徐々に増加傾向にあり、前年同期比で15%増加しています。</li>
            <li>醤油の消費量は比較的安定していますが、3月と4月に若干の増加が見られました。</li>
            <li>お茶の消費量は季節変動があり、暖かい月に増加する傾向があります。</li>
          </ul>
          <p>
            推奨事項:
          </p>
          <ul>
            <li>米の発注量を6月に向けて10%増やすことを検討してください。</li>
            <li>小麦粉の在庫を現在のレベルで維持し、消費傾向を継続的に監視してください。</li>
            <li>醤油の発注サイクルを現在の月1回から隔月に変更することで、発注コストを削減できる可能性があります。</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 