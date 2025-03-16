import os
import subprocess
from pathlib import Path
from sqlalchemy.orm import Session
from app.db.models import Image
from app.db.database import SessionLocal
from app.services.image_service import populate_default_images

def run_migrations():
    """
    Run Alembic migrations to ensure the database schema is up-to-date.
    This function executes the 'alembic upgrade head' command.
    """
    try:
        # Get the backend directory path (parent of app directory)
        backend_dir = Path(__file__).parent.parent.parent.absolute()
        
        # Change to the backend directory where alembic.ini is located
        os.chdir(backend_dir)
        
        # Run the alembic upgrade command
        result = subprocess.run(
            ["alembic", "upgrade", "head"],
            capture_output=True,
            text=True,
            check=True
        )
        
        print("Database migrations completed successfully.")
        print(result.stdout)
        
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error running migrations: {e}")
        print(f"STDOUT: {e.stdout}")
        print(f"STDERR: {e.stderr}")
        return False
    except Exception as e:
        print(f"Unexpected error running migrations: {e}")
        return False

def seed_database():
    """
    Seed the database with initial data if it's empty.
    """
    db = SessionLocal()
    try:
        # Check if we already have images
        image_count = db.query(Image).count()
        
        if image_count == 0:
            print("Database is empty. Adding seed data...")
            
            # Sample images to add
            seed_images = populate_default_images(db)
            
            # Add all images to the database
            db.add_all(seed_images)
            db.commit()
            
            print(f"Added {len(seed_images)} sample images to the database.")
        else:
            print(f"Database already contains {image_count} images. Skipping seed data.")
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close() 