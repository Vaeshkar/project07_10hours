# Project 07 – Event Management App

This is a fullstack project featuring a React frontend and a RESTful Node.js backend API.

## Live Demo
- [Frontend on Netlify](https://event-management-app.netlify.app)
- [Backend on Heroku](https://event-management-app-backend.herokuapp.com)

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
Make sure the backend is running at `http://localhost:3001`.

Create a `.env` file in the backend directory with:
```env
PORT=3001
JWT_SECRET=someTopSecret
ENVIRONMENT=development
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

create a `.env` file in the frontend directory with:
```env
VITE_API_URL=http://localhost:3001
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

### [v1.3.0] - 2025-06-19
#### Major UI Enhancements and New Features

-	Added Profile and Edit Profile pages with reusable Card component layout for consistent styling
- Implemented Delete Event functionality on Event Details page with confirmation and toast feedback
- Refactored event list and event details to use modular EventCard and Card components for better maintainability and UI consistency
- Enhanced header navigation to dynamically show authentication-related links (Sign In, Sign Up vs. Profile, Logout) and disabled Create Event button when unauthenticated
- Styled footer and page layout using TailwindCSS grid and flex utilities for responsive and clean design
- General UI/UX polish: consistent button styles, hover effects, toast notifications positioning, and responsive grid layouts


### [v1.2.0] - 2025-06-19

- **Full deployment pipeline established**: backend successfully deployed to Heroku, frontend deployed to Netlify with environment variables fully configured  
- **CORS configuration fixed**: backend now properly allows cross-origin requests from frontend, solving previous CORS issues  
- **Database setup and connection stabilized**: PostgreSQL on Heroku fully connected, data fetching working correctly on production  
- **Authentication flow improved**: login, signup, token storage, and protected routes functioning end-to-end in deployed environment  
- **UI polish**: consistent styling improvements across event list, event details, profile, and navigation components using TailwindCSS. Bare minimum styling applied to ensure a clean and functional UI 
- **Error handling & debugging**: implemented clearer error logging and handled network/API errors gracefully  
- **Codebase cleanup**: removed unused code, aligned config files, and finalized environment variable usage for local and production

### [v1.1.0] - 2025-06-19

- **Fixed deployment issues**: added `Procfile` and configured buildpacks for Heroku backend
- **Configured PostgreSQL** for Heroku deployment, replacing local SQLite
- **Implemented CORS support** to allow frontend hosted on Netlify to access backend API
- **Refactored API calls** to use Axios with automatic token injection
- **Added authentication context** with protected routes and token persistence
- **Deployed frontend** to Netlify and backend to Heroku with working live URLs
- **Improved routing and navigation** with React Router v7, including guarded routes
- **Fixed styling and hover effects** on header and SVG logo with TailwindCSS
- **Cleaned up environment variable handling** for local and production builds

### [v1.0.0] - 2025-06-18

- Initial setup of React frontend and Node.js backend API
- Implemented event list and event detail pages
- Added authentication with signup and signin forms
- Integrated toast notifications for success and error messages
- Added spinner component for loading states
- Setup routing with React Router v6
- Configured backend to support SQLite locally and PostgreSQL on Heroku
- Prepared deployment to Heroku (backend) and Netlify (frontend)