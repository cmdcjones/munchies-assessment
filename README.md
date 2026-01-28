# Munchies - Full-stack Assessment

## Prerequisites

- **Node.js**: v24.0.0 or higher (project uses v24.13.0)

### 1. Install Dependencies

Navigate to both the backend and frontend folders and install dependencies:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd frontend
npm install
```

### 2. Start the Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:3001`

### 3. Start the Frontend Server

In a new terminal window:

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

### 4. Open the Application

Open your browser and navigate to `http://localhost:5173`

### Backend

- Node.js v24+
- TypeScript 5.3+
- Express
- axios
- node-cache

### Frontend

- React 18
- TypeScript 5.3+
- vite
- CSS

## Troubleshooting

**Backend won't start:**

- Ensure Node.js version is 24.0.0 or higher: `node -v`
- Ensure port 3001 is available
- Run `npm install` in the backend directory

**Frontend won't start:**

- Ensure Node.js version is 24.0.0 or higher: `node -v`
- Ensure port 5173 is available
- Run `npm install` in the frontend directory
- Ensure backend is running on port 3001
