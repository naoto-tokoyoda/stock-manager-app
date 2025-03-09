import React from 'react';

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">設定</h1>
        <button className="btn-primary">
          変更を保存
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 一般設定 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">一般設定</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">会社名</label>
              <input
                type="text"
                id="companyName"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                defaultValue="株式会社サンプル"
              />
            </div>
            <div>
              <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">タイムゾーン</label>
              <select
                id="timezone"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                defaultValue="Asia/Tokyo"
              >
                <option value="Asia/Tokyo">日本時間 (UTC+9)</option>
                <option value="America/New_York">ニューヨーク (UTC-5)</option>
                <option value="Europe/London">ロンドン (UTC+0)</option>
              </select>
            </div>
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">言語</label>
              <select
                id="language"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                defaultValue="ja"
              >
                <option value="ja">日本語</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>

        {/* 在庫設定 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">在庫設定</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="lowStockThreshold" className="block text-sm font-medium text-gray-700 mb-1">低在庫アラートしきい値 (%)</label>
              <input
                type="number"
                id="lowStockThreshold"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                defaultValue="20"
                min="1"
                max="100"
              />
            </div>
            <div>
              <label htmlFor="autoCalculation" className="block text-sm font-medium text-gray-700 mb-1">自動計算設定</label>
              <div className="mt-1 space-y-2">
                <div className="flex items-center">
                  <input
                    id="autoOrderCalculation"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="autoOrderCalculation" className="ml-2 block text-sm text-gray-700">
                    発注数の自動計算
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="autoConsumptionCalculation"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="autoConsumptionCalculation" className="ml-2 block text-sm text-gray-700">
                    月次消費量の自動計算
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="defaultUnit" className="block text-sm font-medium text-gray-700 mb-1">デフォルト単位</label>
              <select
                id="defaultUnit"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                defaultValue="個"
              >
                <option value="個">個</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="L">L</option>
                <option value="ml">ml</option>
                <option value="箱">箱</option>
              </select>
            </div>
          </div>
        </div>

        {/* ユーザー設定 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">ユーザー設定</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
              <input
                type="email"
                id="email"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                defaultValue="user@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">パスワード変更</label>
              <input
                type="password"
                id="password"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="新しいパスワード"
              />
            </div>
            <div>
              <label htmlFor="notifications" className="block text-sm font-medium text-gray-700 mb-1">通知設定</label>
              <div className="mt-1 space-y-2">
                <div className="flex items-center">
                  <input
                    id="emailNotifications"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-700">
                    メール通知
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="lowStockNotifications"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="lowStockNotifications" className="ml-2 block text-sm text-gray-700">
                    低在庫アラート
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="orderNotifications"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="orderNotifications" className="ml-2 block text-sm text-gray-700">
                    発注・入荷通知
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* データ管理 */}
      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-lg font-semibold mb-4">データ管理</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-md font-medium mb-2">データのインポート</h3>
            <p className="text-sm text-gray-600 mb-3">
              CSVファイルから在庫データをインポートします。
            </p>
            <div className="flex items-center">
              <label htmlFor="fileUpload" className="btn-secondary cursor-pointer">
                CSVファイルを選択
                <input id="fileUpload" type="file" className="hidden" accept=".csv" />
              </label>
              <button className="btn-primary ml-2">
                インポート
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-md font-medium mb-2">データのエクスポート</h3>
            <p className="text-sm text-gray-600 mb-3">
              現在の在庫データをCSV形式でエクスポートします。
            </p>
            <div className="flex space-x-2">
              <button className="btn-secondary">
                在庫データ
              </button>
              <button className="btn-secondary">
                発注履歴
              </button>
              <button className="btn-secondary">
                消費レポート
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 