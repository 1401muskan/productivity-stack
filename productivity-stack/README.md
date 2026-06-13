# Productivity Stack

A self-hosted productivity workspace inspired by Notion.

## Features

- Authentication
- Notes
- Kanban Board
- Calendar
- Personal Wiki
- Workspace Export
- Docker Support

## Tech Stack

### Frontend
- React
- TypeScript
- Vite

### Backend
- Node.js
- Express
- TypeScript

### Database
- PostgreSQL
- Prisma

## Setup

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Database

```bash
docker compose up -d
npx prisma migrate dev
```