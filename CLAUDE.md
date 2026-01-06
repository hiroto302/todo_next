# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple TODO list application built with Next.js 16 (App Router), React 19, and TypeScript. The application is client-side only with no backend or database - all state is managed in memory using React hooks.

## Development Commands

- `npm run dev` - Start the development server (runs on http://localhost:3000)
- `npm run build` - Build the application for production
- `npm start` - Start the production server

## Architecture

### State Management
The application uses React's `useState` hook for all state management in [app/page.tsx](app/page.tsx:13). The TODO items are stored as an array of objects with the structure:
```typescript
interface Todo {
  id: number
  text: string
  completed: boolean
}
```

### Styling Approach
The project uses CSS Modules for component-level styling:
- [app/globals.css](app/globals.css) - Global styles including the body background gradient
- [app/page.module.css](app/page.module.css) - Component-scoped styles for the TODO list

The current color scheme uses a warm gradient (red to yellow/orange) with hex colors `#ff6b6b` and `#feca57`.

### App Structure
This is a Next.js App Router application with a single page:
- [app/layout.tsx](app/layout.tsx) - Root layout with metadata
- [app/page.tsx](app/page.tsx) - Main TODO list component (client component with `'use client'` directive)

All functionality (add, toggle, delete) is implemented in the single page component with inline event handlers.


# テストコード作成時の厳守事項

## 絶対に守ってください！

### テストコードの品質
- テストは必ず実際の機能を検証すること
- `expect(true).toBe(true)` のような意味のないアサーションは絶対に書かない
- 各テストケースは具体的な入力と期待される出力を検証すること
- モックは必要最小限に留め、実際の動作に近い形でテストすること

### ハードコーディングの禁止
- テストを通すためだけのハードコードは絶対に禁止
- 本番コードに `if (testMode)` のような条件分岐を入れない
- テスト用の特別な値（マジックナンバー）を本番コードに埋め込まない
- 環境変数や設定ファイルを使用して、テスト環境と本番環境を適切に分離すること

### テスト実装の原則
- テストが失敗する状態から始めること（Red-Green-Refactor）
- 境界値、異常系、エラーケースも必ずテストすること
- カバレッジだけでなく、実際の品質を重視すること
- テストケース名は何をテストしているか明確に記述すること

### 実装前の確認
- 機能の仕様を正しく理解してからテストを書くこと
- 不明な点があれば、仮の実装ではなく、ユーザーに確認すること