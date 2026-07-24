# Lead Management System

A full-stack **Lead Management System** built with **FastAPI**, **React.js**, and **PostgreSQL**. It enables organizations to efficiently manage customer leads, assign them to team members, track activities, and monitor progress through an intuitive dashboard.

## 🚀 Live Demo

- **Frontend:** https://lead-management-system-virid-zeta.vercel.app
- **Backend API:** https://leadmanagementsystem-8z6z.onrender.com
- **API Documentation:** https://leadmanagementsystem-8z6z.onrender.com/docs

---

## ✨ Features

- Secure JWT Authentication
- Role-Based Access Control (Admin & Member)
- User Registration & Login
- Lead CRUD Operations
- Lead Assignment
- Notes Management
- Activity Logging
- Dashboard with Statistics
- Search & Filtering
- Pagination
- Responsive User Interface
- PostgreSQL Database Integration

---

## 🛠 Tech Stack

### Frontend
- React.js
- Vite
- Bootstrap
- Axios
- React Router DOM

### Backend
- FastAPI
- SQLAlchemy
- JWT Authentication (python-jose)
- Passlib (bcrypt)
- Pydantic

### Database
- PostgreSQL (Production)
- SQLite (Development)

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: Render PostgreSQL

---

## 📁 Project Structure

```text
LeadManagementSystem/
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
└── README.md
```

---

## ⚙️ Local Setup

### Clone Repository

```bash
git clone https://github.com/sandeep-rathod-2004/LeadManagementSystem.git
cd LeadManagementSystem
```

### Backend

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux / macOS
source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 📖 API Documentation

Run the backend locally and open:

```
http://127.0.0.1:8000/docs
```

Production API Docs:

```
https://leadmanagementsystem-8z6z.onrender.com/docs
```

---

## 🔒 Authentication

The application uses **JWT (JSON Web Tokens)** for secure authentication.

Roles supported:

- Admin
- Member

Admins can manage users and assign leads, while Members can manage their assigned leads.

---

## 📌 Future Improvements

- Email Notifications
- CSV Import/Export
- File Attachments for Leads
- Advanced Analytics Dashboard
- Docker Support
- Unit & Integration Testing
- CI/CD Pipeline

---

## 👨‍💻 Author

**Sandeep Rathod**

GitHub: https://github.com/sandeep-rathod-2004

