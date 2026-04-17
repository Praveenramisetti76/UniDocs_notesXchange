# UniDocs — Notes X Change 📚

A full-stack university notes sharing platform built with React, Node.js, Express, and MongoDB. Students can upload, browse, search, vote on, and download study notes across branches and semesters.

## 🛠 Tech Stack

| Layer      | Technology                                        |
| ---------- | ------------------------------------------------- |
| Frontend   | React 19, Vite, Tailwind CSS v4, React Router     |
| Backend    | Node.js, Express, Mongoose                        |
| Database   | MongoDB                                           |
| Auth       | JWT + bcryptjs                                    |
| File Upload| Multer (disk storage)                             |
| Validation | express-validator                                 |

---

## 📂 Project Structure

```
UniDocs/
├── client/                   # React frontend (Vite)
│   ├── src/
│   │   ├── components/       # Layout, NoteCard, ErrorBoundary, ProtectedRoute
│   │   ├── context/          # AuthContext (user, token, login/logout)
│   │   ├── pages/            # Home, Login, Register, Upload, NoteDetail, NotFound
│   │   └── App.jsx           # Router + Toaster
│   ├── index.html
│   └── .env
├── server/                   # Express backend
│   ├── config/               # MongoDB connection
│   ├── controllers/          # authController, noteController, voteController
│   ├── middlewares/          # authMiddleware (JWT), upload (Multer)
│   ├── models/               # User, Note, Vote (Mongoose schemas)
│   ├── routes/               # authRoutes, noteRoutes
│   ├── uploads/              # Uploaded files (PDF/images)
│   ├── server.js             # Express entry point
│   └── .env
└── README.md
```

---

## ⚡ Quick Start

### Prerequisites

- Node.js v18+
- MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the repo

```bash
git clone https://github.com/Praveenramisetti76/UniDocs--notesXchange.git
cd UniDocs--notesXchange
```

### 2. Setup the server

```bash
cd server
npm install
```

Create a `.env` file in `/server`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/unidocs
JWT_SECRET=your_super_secret_key
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Start the server:

```bash
npm run dev
```

### 3. Setup the client

```bash
cd client
npm install
```

Create a `.env` file in `/client`:

```env
VITE_API_URL=http://localhost:5000
```

Start the client:

```bash
npm run dev
```

The app will be available at **http://localhost:5173**

---

## 🔑 Environment Variables

### Server (`/server/.env`)

| Variable      | Description                          | Example                            |
| ------------- | ------------------------------------ | ---------------------------------- |
| `PORT`        | Server port                          | `5000`                             |
| `MONGO_URI`   | MongoDB connection string            | `mongodb+srv://...`                |
| `JWT_SECRET`  | Secret key for JWT signing           | `mysecretkey123`                   |
| `NODE_ENV`    | Environment mode                     | `development` / `production`       |
| `CLIENT_URL`  | Frontend URL for CORS                | `http://localhost:5173`            |

### Client (`/client/.env`)

| Variable       | Description               | Example                   |
| -------------- | ------------------------- | ------------------------- |
| `VITE_API_URL` | Backend API base URL      | `http://localhost:5000`   |

---

## 📡 API Endpoints

### Auth

| Method | Endpoint              | Auth | Description                 |
| ------ | --------------------- | ---- | --------------------------- |
| POST   | `/api/auth/register`  | ❌   | Register a new user         |
| POST   | `/api/auth/login`     | ❌   | Login and get JWT token     |

### Notes

| Method | Endpoint                 | Auth | Description                              |
| ------ | -----------------------  | ---- | ---------------------------------------- |
| GET    | `/api/notes`             | ❌   | List notes (filter, search, paginate)    |
| GET    | `/api/notes/:id`         | ❌   | Get single note details                  |
| POST   | `/api/notes/upload`      | ✅   | Upload a note (multipart/form-data)      |
| DELETE | `/api/notes/:id`         | ✅   | Delete note (owner only)                 |

### Voting

| Method | Endpoint                  | Auth | Description                          |
| ------ | ------------------------- | ---- | ------------------------------------ |
| POST   | `/api/notes/:id/vote`     | ✅   | Upvote/downvote (toggle/switch)      |
| GET    | `/api/notes/:id/myvote`   | ✅   | Get current user's vote on a note    |

### Query Parameters for `GET /api/notes`

| Param      | Type   | Description                         |
| ---------- | ------ | ----------------------------------- |
| `semester` | Number | Filter by semester (1-8)            |
| `branch`   | String | Filter by branch (CSE/ECE/etc.)     |
| `subject`  | String | Filter by subject name (partial)    |
| `search`   | String | Search by subject code (partial)    |
| `page`     | Number | Page number (default: 1)            |
| `limit`    | Number | Results per page (default: 10)      |

---

## 🎯 Features

- **🔐 Authentication** — Register/login with JWT, protected routes
- **📤 File Upload** — Drag-and-drop PDF/image upload with progress bar
- **🔍 Browse & Filter** — Filter by semester, branch, subject + search by subject code
- **👍 Voting** — Upvote/downvote with toggle/switch logic (one vote per user per note)
- **📄 Preview** — Inline PDF viewer (iframe) and image preview
- **🗑 Delete** — Owner-only note deletion with file cleanup
- **📱 Responsive** — Mobile-first design with collapsible nav
- **🎨 Modern UI** — TailwindCSS, glassmorphism, gradients, skeleton loaders
- **⚡ Toast Notifications** — react-hot-toast for all user actions
- **🛡 Error Handling** — ErrorBoundary, 404 page, graceful API errors

---

## 📝 License

MIT
