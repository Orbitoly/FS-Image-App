from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Environment variable to control database mode
USE_MOCK_DB = os.getenv("USE_MOCK_DB", "true").lower() == "true"
TESTING = os.getenv("TESTING", "false").lower() == "true"

# Create Base class for all models
Base = declarative_base()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:password@db:5432/votes_db")
engine = create_engine(DATABASE_URL)

# Create a session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Function to initialize the database
def init_db():
    Base.metadata.create_all(bind=engine)

# Dependency to get a new DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
