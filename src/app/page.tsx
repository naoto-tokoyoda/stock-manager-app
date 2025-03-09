import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8">在庫管理システム</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        <DashboardCard 
          title="在庫一覧" 
          description="現在の在庫状況を確認" 
          link="/inventory" 
          icon="📦" 
        />
        <DashboardCard 
          title="発注管理" 
          description="発注履歴と新規発注" 
          link="/orders" 
          icon="📝" 
        />
        <DashboardCard 
          title="カレンダー" 
          description="発注・入荷予定の確認" 
          link="/calendar" 
          icon="📅" 
        />
        <DashboardCard 
          title="分析レポート" 
          description="消費量と在庫推移の分析" 
          link="/reports" 
          icon="📊" 
        />
        <DashboardCard 
          title="設定" 
          description="アプリケーション設定" 
          link="/settings" 
          icon="⚙️" 
        />
      </div>
    </main>
  );
}

function DashboardCard({ title, description, link, icon }: { 
  title: string; 
  description: string; 
  link: string; 
  icon: string;
}) {
  return (
    <a 
      href={link} 
      className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center mb-2">
        <span className="text-3xl mr-3">{icon}</span>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <p className="text-gray-600">{description}</p>
    </a>
  );
} 