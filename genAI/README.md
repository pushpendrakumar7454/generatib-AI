# genAI — Full-stack Authentication Starter

## Requirements
- Node.js 20+
- MongoDB running locally or a MongoDB Atlas connection

## 1. Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```
Set `MONGO_URI`, `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`, and `CLIENT_URL` in `backend/.env`.

Backend runs at `http://localhost:5000`.

## 2. Frontend
Open another terminal:
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
Frontend runs at `http://localhost:5173`.

## Auth flow
- Register and login return a short-lived access token in JSON.
- Refresh token is stored in an HttpOnly, SameSite=Lax cookie.
- Frontend keeps the access token in memory (Redux/localStorage is intentionally not used).
- Axios sends the refresh cookie with `withCredentials: true`.
- On a 401, the Axios response interceptor calls `/api/auth/refresh` once and retries the original request.
- Logout revokes the refresh token and clears the cookie.

For production, serve frontend and backend over HTTPS, use a strong unique secret, configure exact CORS origins, and consider storing hashed refresh tokens in a dedicated token collection.
