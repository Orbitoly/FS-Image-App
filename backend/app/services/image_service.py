from sqlalchemy.orm import Session
from fastapi import Response
from app.db.models import Image
from app.api.schemas import ImageCreate

def create_image(image: ImageCreate, db: Session) -> Image:
    """Create a new image and store it in the database."""
    db_image = Image(url=image.url)
    db.add(db_image)
    db.commit()
    db.refresh(db_image)
    return db_image

def populate_default_images(db: Session) -> list[Image]:
    """Populate the database with default images using consistent IDs."""
    for i in range(100):
        # Use a specific image ID to ensure consistency
        # Picsum Photos has images with IDs from 1 to 1000
        image_id = (i % 1000) + 1  # Ensure we stay within valid range
        new_image = Image(url=f"https://picsum.photos/id/{image_id}/200/300")
        db.add(new_image)
    db.commit()
    return db.query(Image).all()

def get_images(db: Session, response: Response = None) -> list[Image]:
    """Retrieve images from the database (URLs only)."""
    
    # Add cache control headers for images (can be cached longer)
    ttl_seconds = 3600 * 1  # 1 hour
    if response:
        response.headers["Cache-Control"] = f"public, max-age={ttl_seconds}"
        response.headers["Vary"] = "Accept"

    images = db.query(Image).all()
    if not images:
        print("Database is empty")
        return []
    return images

def get_image_metadata(db: Session, response: Response = None) -> list[Image]:
    """Retrieve image metadata (likes/dislikes) from the database."""
    
    # Set no-cache headers for metadata since it changes frequently
    if response:
        response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
        response.headers["Pragma"] = "no-cache"
        response.headers["Expires"] = "0"
        response.headers["Vary"] = "Accept"

    images = db.query(Image).all()
    if not images:
        print("Database is empty")
        return []
    return images
