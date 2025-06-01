# Recipe Collection App

## Overview

A beautiful recipe collection application built with React/Next.js frontend and Express backend. Users can browse, search, filter, and paginate through recipes from various cuisines around the world.

## Features

- 🍳 Browse a collection of recipes with beautiful card layouts
- 🔍 Search recipes by title or ingredients
- 🌍 Filter by cuisine type
- 📱 Responsive design with Tailwind CSS
- 📄 Pagination for easy browsing
- ⭐ Recipe ratings and difficulty indicators
- ⏱️ Cooking time and serving information

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: JSON Server (for mock API)
- **Styling**: Tailwind CSS with modern design
- **Images**: Unsplash integration

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd assessment
   ```

2. **Install All Dependencies**

   ```bash
   npm run setup
   ```

### Running the Application (simulataneously)

1. **Start the Application**

   ```bash
   npm run dev
   ```

### Running the Application (separately)

1. **Start the Backend API** (in one terminal):

   ```bash
   cd backend
   npm run dev
   ```

   This starts the JSON Server on http://localhost:3001

2. **Start the Frontend** (in another terminal):

   ```bash
   cd frontend
   npm run dev
   ```

   This starts the Next.js app on http://localhost:3000

3. **Open your browser** and navigate to http://localhost:3000

> **Important**: Both servers must be running simultaneously for the app to work properly.

## API Endpoints

The JSON Server provides the following endpoints at `http://localhost:3001`:

- `GET /recipes` - Get all recipes
- `GET /recipes?_page=1&_limit=6` - Get paginated recipes
- `GET /recipes?cuisine=Italian` - Filter by cuisine
- `GET /recipes?q=search-term` - Search recipes

## Project Structure

```
assessment/
├── frontend/               # Next.js React application
│   ├── src/
│   │   └── app/
│   │       └── page.tsx   # Main recipe listing page
│   │   ├── package.json
│   │   └── ...
│   ├── backend/               # JSON Server backend
│   │   ├── db.json           # Recipe database
│   │   ├── package.json
│   │   └── ...
│   ├── README.md
│   └── ASSESSMENT.md
```

## Development

The app includes:

- **Modern React patterns** with hooks and TypeScript
- **Responsive design** that works on all devices
- **Clean code structure** with proper component organization
- **Beautiful UI** with hover effects and smooth transitions
- **Efficient pagination** for better performance
- **Real-time search and filtering**

## Assumptions and Trade-offs

### Assumptions Made
- Users prefer visual recipe browsing over text-heavy interfaces

### Trade-offs Made
- **Client-side vs Server-side filtering**: Chose client-side for simplicity and faster user experience with small dataset, but this wouldn't scale well with thousands of recipes
- **JSON Server vs Full Database**: Used JSON Server for rapid prototyping, but implemented TypeORM backend architecture for future scalability


## Time Tracking

**Total Development Time: ~1 hour 40 minutes**


### Completed Features:
✅ Recipe browsing with card layout  
✅ Search functionality (title and ingredients)  
✅ Cuisine filtering  
✅ Pagination  
✅ Responsive design  
✅ Backend API with validation  
✅ TypeORM database integration  
✅ Repository pattern implementation  

## Troubleshooting

If you encounter issues:

1. Make sure both frontend and backend servers are running
2. Check that ports 3000 and 3001 are available
3. Ensure all dependencies are installed (`npm install` in both directories)
4. Clear browser cache if images don't load properly
