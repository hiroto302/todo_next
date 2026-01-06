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