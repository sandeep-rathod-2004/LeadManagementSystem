# Lead Management System

A full-stack Lead Management System built using FastAPI, React.js, and SQLAlchemy. It allows organizations to manage customer leads, assign them to team members, track activities, and monitor progress through an intuitive dashboard.

## Features

- JWT Authentication
- Role-Based Access Control (Admin & Member)
- Lead CRUD Operations
- Lead Assignment
- Notes Management
- Activity Logging
- Dashboard with Statistics
- Search and Filtering
- Pagination
- Responsive User Interface

## Tech Stack

### Frontend
- React.js
- Vite
- Bootstrap
- Axios
- React Router DOM

### Backend
- FastAPI
- SQLAlchemy
- JWT Authentication
- Passlib (bcrypt)

### Database
- SQLite (Development)
- PostgreSQL (Recommended for Production)

## Project Structure

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

## Getting Started

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API Documentation

After starting the backend, open:

```
http://127.0.0.1:8000/docs
```

## Future Improvements

- PostgreSQL support
- Docker deployment
- Email notifications
- CSV import/export
- Unit testing

## Author

**Sandeep Rathod**

GitHub: https://github.com/sandeep-rathod-2004
