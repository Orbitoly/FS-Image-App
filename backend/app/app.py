from fastapi import FastAPI
from app.db.database import init_db
from app.db.utils import run_migrations, seed_database
from app.api import images, votes
from app.middleware import setup_cors_middleware

app = FastAPI(title="Image Voting System", version="0.1.0")

# Setup middleware
setup_cors_middleware(app)

# Startup event to initialize the database
@app.on_event("startup")
def startup():
    # Run migrations first to ensure schema is up-to-date
    run_migrations()
    # Then initialize the database (create tables if they don't exist)
    init_db()
    print("Database initialized.")
    # Seed the database with initial data if it's empty
    seed_database()

# Include API routes from separate modules
app.include_router(images.router, prefix="/images", tags=["Images"])
app.include_router(votes.router, prefix="/votes", tags=["Votes"])

# Root endpoint - Health Check
@app.get("/", tags=["Health Check"])
def health_check():
    return {"status": "ok"}
