# 🗂 Company Announcements App

A **full-stack Announcements Management System** that allows admins to create, view, edit, and delete announcements.

Built with **React + Vite + TailwindCSS (frontend)** and **Express.js + MySQL (backend)**.

---

## 🚀 How to Download & Run the Project

### 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd company-announcements
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in **backend/**

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=announcements_db
```

Run the backend server:

```bash
nodemon app.js
# OR
node app.js
```

---

### 3️⃣ Database Setup

1. Open MySQL and create a database

```sql
CREATE DATABASE announcements_db;
```

2. Create table

```sql
CREATE TABLE announcements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  content TEXT,
  type VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 4️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in **frontend/**

```env
VITE_BACKEND_URL=http://localhost:5000
```

Run the frontend

```bash
npm run dev
```

Now open → **http://localhost:5173**

---

## ✨ Current Features

- **Grid & Table View**
  - Toggle between grid or table layout for announcements
  - Fully **mobile-responsive**

- **Modal-Based Actions**
  - View and Edit announcements in a modal
  - Smooth UI for editing without page reload

- **CRUD Operations**
  - Create, Read, Update, Delete announcements
  - Delete confirmation to prevent accidental removal

- **Announcement Types**
  - 4 sample categories: **Policy Updates,Event Notifications,Compliance Alerts,IT Notices**

- **Search Feature**
  - Quickly filter announcements by title or type

- **Context API State Management**
  - Global state for announcements & search

---

## 📡 API Endpoints

| Method | Endpoint              | Description                |
|--------|----------------------|----------------------------|
| GET    | `/api/announcements` | Fetch all announcements    |
| GET    | `/api/announcements/:id` | Fetch single announcement |
| POST   | `/api/announcements` | Create a new announcement  |
| PUT    | `/api/announcements/:id` | Update an announcement    |
| DELETE | `/api/announcements/:id` | Delete an announcement    |

---

## 📬 Contact

- **Lakshya Sharma**
- 📞 7906396246
- 📧 [lakshyasharma1928@gmail.com](mailto:lakshyasharma1928@gmail.com)
- 🌐 [Portfolio](https://lakshyaportfolio-mu.vercel.app/)
- 🧑‍💻 [Linkedin](https://www.linkedin.com/in/lakshya2207)

---

> _Built with React, Vite, Tailwind CSS, Express.js, and MySQL._
