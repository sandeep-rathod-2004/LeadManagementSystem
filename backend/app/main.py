from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routers import auth, leads, notes, activity, users, dashboard

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Lead Management API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://lead-management-system-virid-zeta.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(leads.router)
app.include_router(notes.router)
app.include_router(activity.router)
app.include_router(users.router)
app.include_router(dashboard.router)


@app.get("/")
def home():
    return {"message": "Lead Management API Running"}