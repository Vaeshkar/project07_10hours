# Project 07 – Event Management App

This is a fullstack project featuring a React frontend and a RESTful Node.js backend API.

## 🔧 Project Structure

```
83_project07_10hours/
├── backend/     ← Local Events API (Node.js, Express)
├── frontend/    ← Vite + React + Tailwind App
```

## 🚀 Getting Started

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Make sure the backend is running at `http://localhost:3001`.

Create a `.env` file in the frontend directory with:
```env
PORT=3001
JWT_SECRET=someTopSecret
ENVIRONMENT=development
```

## ✅ Features

- 📄 Event list with card layout on homepage
- 🔎 Event detail page via route `/events/:id`
- 🌐 React Router v6+ with layout structure
- 🎨 TailwindCSS-based responsive layout
- 🔁 Fetches data from local Events API

## 🧱 Tech Stack

- **Frontend:** React, Vite, TailwindCSS, React Router
- **Backend:** Node.js, Express (provided API)

## 📜 Changelog

### [v1.0.0] - 2025-06-18

- Initial setup of React frontend and Node.js backend API
- Implemented event list and event detail pages
- Added authentication with signup and signin forms
- Integrated toast notifications for success and error messages
- Added spinner component for loading states
- Setup routing with React Router v6
- Configured backend to support SQLite locally and PostgreSQL on Heroku
- Prepared deployment to Heroku (backend) and Netlify (frontend)
