# Viral Inbound MERN - Setup Guide

This guide will help you set up the project locally and deploy it to a server.

## Prerequisites

- **Node.js**: v16 or higher
- **MongoDB**: Local installation or MongoDB Atlas account

## Project Structure

- `client/`: React frontend (Vite)
- `server/`: Express/Node.js backend

## 1. Local Setup

### Backend (Server)

1.  Navigate to the server directory:
    ```bash
    cd server
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file in the `server` directory with the following variables:
    ```env
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/viral-inbound
    # If using Atlas, replace the URI with your connection string
    # MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/viral-inbound
    ```

4.  Start the server:
    ```bash
    npm run dev
    ```
    The server should run on `http://localhost:5000`.

### Frontend (Client)

1.  Navigate to the client directory:
    ```bash
    cd client
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  **API Configuration**:
    The client uses a proxy configuration in `vite.config.js` to forward requests starting with `/api` to the backend.
    
    *Development*:
    - The `vite.config.js` file likely contains a `server.proxy` setting pointing to `http://localhost:5000`.
    - You do not need to configure an API URL environment variable for local development if the proxy is set correctly.

    *Production*:
    - When deployed, the frontend and backend are usually served from the same domain, or you configure Nginx/Apache to proxy `/api` requests to the backend server.
    - If hosting separately (e.g., Netlify + Heroku), you will need to update `client/src/api/index.js` to use the full backend URL (e.g., `https://my-backend.herokuapp.com/api`) instead of the relative `/api` path, OR use a `VITE_API_URL` environment variable if you modify the code to support it.

4.  Start the development server:
    ```bash
    npm run dev
    ```
    The client should run on `http://localhost:5173` (or similar).

### Helper Scripts

Root directory contains batch scripts for Windows:
- `start-app.bat`: Starts both client and server.
- `seed-data.bat`: Runs the seed script to populate the database.

## 2. Database Setup

### Local MongoDB
1.  Install MongoDB Community Server.
2.  Start the MongoDB service.
3.  The app will automatically create the `viral-inbound` database when you run it.

### MongoDB Atlas (Cloud)
1.  Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  Get your connection string (Driver: Node.js)
3.  Replace `<password>` with your database user password.
4.  Update `server/.env`:
    ```env
    MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname?retryWrites=true&w=majority
    ```
5.  **Important**: Whitelist your IP address in Atlas Network Access.

### Seeding Data
To populate the database with initial data:
1.  Ensure MongoDB is running.
2.  Run:
    ```bash
    cd server
    node seed.js
    ```
    (Or use `seed-data.bat` from root)

## 3. Server Deployment (Production)

### Backend
1.  Deploy the `server` folder to a Node.js host (Heroku, Railway, Render, VPS).
2.  Set Environment Variables in your host's dashboard:
    - `MONGODB_URI`: Your production database connection string.
    - `PORT`: (Usually handled automatically by host, or set to 80/443).
    - `CORS_ORIGIN`: setup allowed origins in `server.js` if strict CORS is enabled.

### Frontend
1.  Build the client:
    ```bash
    cd client
    npm run build
    ```
2.  Deploy the `client/dist` folder to a static host (Vercel, Netlify) or serve it via Nginx/Apache.
3.  **Important**: Update the API URL in `client/src/api/index.js` to point to your production backend URL before building, or use separate `.env.production` file if configured.

## Troubleshooting

- **CORS Errors**: Ensure the backend allows requests from your frontend's domain (check `server.js`).
- **Connection Refused**: Check if MongoDB is running locally.
- **Port In Use**: Change `PORT` in `.env`.
