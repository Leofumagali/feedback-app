# 📬 Feedback App

A complete feedback collection and management platform with a React + Reactstrap frontend and a Node.js + Express backend. Ideal for landing pages, SaaS platforms, or any product that needs user input with style and control.

---

## 🚀 Tech Stack

### Frontend
- React
- Reactstrap (Bootstrap 5)
- Vite
- Context API + custom hooks
- React Router

### Backend
- Node.js
- Express
- JWT-based authentication
- Native `fs` for file-based JSON storage
- Clean MVC architecture with services and middlewares

---

## 🛠️ Features

- Public feedback form with:
  - Name, email, feedback type, and comment
- Admin dashboard with:
  - Secure JWT authentication
  - View and delete feedbacks
  - Update feedback status (`new`, `in_review`, `responded`, `closed`)
- Protected routes
- Loading spinner and form validation
- Modern design with styled badges and subtle UI animations

---

## 🔐 Environment Variables

Only the backend uses a `.env` file. Copy from `.env.example` and fill in your own values:

```env
JWT_SECRET=your-ultra-secure-jwt-secret
```

### 🧑‍💻 Admin user setup

To log into the admin dashboard, you must create a `users.json` file in `backend/data/`.

Use the following format (you can start by copying from `users.example.json`):

```json
[
  {
    "id": "1",
    "username": "admin",
    "passwordHash": "$2b$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  }
]
```

To generate a new admin password hash:

```bash
node -e "require('bcrypt').hash('your-password', 10).then(console.log)"
```

Don't forget to run this command inside backend folder and change 'your-password' to your real password.

---

## 🧪 Getting Started

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

---

## 📁 Folder Structure

```
backend/
  controllers/
  routes/
  services/
  models/
  middlewares/
  utils/
  data/               ← stores JSON files
  .env

frontend/src/
  components/
  pages/
  context/
  hooks/
  services/
  styles/
  routes/
```

---

## 📷 Screenshots

### 📝 Feedback Form
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/180fbe98-7e1a-444d-a1ac-778c71f327c0" />


### 🔐 Admin Login
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/86fd21b9-4fd7-4d71-8745-f910c3543db2" />


### 📊 Admin Dashboard
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/544566f7-292f-47a9-917d-34608e89daf6" />


---

## 📄 License

MIT — free to use, modify, and contribute.
