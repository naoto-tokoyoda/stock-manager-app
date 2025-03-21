# 在庫管理システム

効率的な在庫管理と発注管理のためのウェブアプリケーションです。このアプリケーションは、在庫の追跡、発注管理、消費量の分析、および在庫予測を簡単に行うことができます。


## 技術スタック

- **フロントエンド**: Next.js, React.js, Tailwind CSS
- **デプロイ**: Vercel

## デプロイ環境

- **本番環境**: https://stock-manager-app-cyan.vercel.app
- **ステージング環境**: https://stock-manager-app-git-staging-naoto-tokoyodas-projects.vercel.app
- **開発環境**: https://stock-manager-app-git-develop-naoto-tokoyodas-projects.vercel.app

## 始め方

まず、開発サーバーを起動します:

```bash
yarn install
yarn dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くと、アプリケーションが表示されます。

## 使用方法

1. **在庫一覧**: 現在の在庫状況を確認し、新しいアイテムを追加できます
2. **発注管理**: 発注履歴を確認し、新規発注を登録できます
3. **カレンダー**: 発注・入荷予定を月単位で確認できます
4. **分析レポート**: 消費量の推移や傾向を分析できます
5. **設定**: アプリケーションの各種設定を変更できます

## データのインポート/エクスポート

- CSVファイルから在庫データをインポートできます
- 現在の在庫データをCSV形式でエクスポートできます
