
# Anime Forum App

This is a full-stack web application built using React (frontend), Express.js (backend), and MySQL (database). The app allows users to post questions, answer them, and upvote/downvote content.

## 📦 Tech Stack

- **Frontend**: React + Vite
- **Backend**: Express.js + Node.js
- **Database**: MySQL

---

## 📁 Project Structure

```
/Frontend        # React frontend
/Backend        # Express backend
```

---

## ⚙️ Prerequisites

- Node.js (v18+ recommended)
- MySQL server (running locally or on a host)
- npm or yarn
- `.env` files in both `/Frontend` and `/Backend` folders

---

## 🧪 1. Setup MySQL

1. Create a new database, e.g. `anime_forum`.
2. Run the SQL schema + tables:

```bash
mysql -u root -p anime_forum < tables.sql
```

---

## 🛠️ 2. Backend Setup

```bash
cd Backend/Server
npm install
```

### Create `.env` file:

```env
JWT_SECRET=labai_slapta_reiksme
FRONTEND_PORT=5173
DB_PORT=3306
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=anime_forum
```

### Start the backend:

```bash
node app.js
```

> By default, backend will run at: `http://localhost:3000`

---

## 🎨 3. Frontend Setup

```bash
cd Frontend/anime_forum
npm install
```

### Start the frontend:

```bash
npm run dev
```

> By default, app will open at: `http://localhost:5173`

---

## 📬 API Endpoints (Optional)

| Method | Endpoint              | Description             |
|--------|-----------------------|-------------------------|
| GET    | `/questions`          | Fetch paginated posts   |
| GET    | `/questions/:id`      | Fetch specific question |
| POST   | `/questions`          | Create new question     |
| Put    | `/questions/:id`      | Update question content |
| Delete | `/questions/:id`      | Delete question         |
| GET    | `/answers`            | Fetch paginated answers |
| GET    | `/answers/:id`        | Fetch specific answer   |
| POST   | `/answers`            | Create new answer       |
| Put    | `/answers/:id`        | Update answer content   |
| Delete | `/answers/:id`        | Delete answer           |
| POST   | `/auth/register`      | Register user           |
| POST   | `/auth/login`         | Login user              |

---

## 🧼 Troubleshooting

- If you get `Access denied for user` → check MySQL user/password.
- Make sure both frontend and backend use matching ports in `.env`.

---

## 📚 License

This project is for me.