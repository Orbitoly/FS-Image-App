from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.services import image_service
from app.api.schemas import Image, ImageCreate, ImageMetadata
from typing import List

router = APIRouter()

@router.post("/", response_model=Image)
def create_image(image: ImageCreate, db: Session = Depends(get_db)):
    return image_service.create_image(image, db)

@router.get("/", response_model=List[Image])
def get_images(response: Response, db: Session = Depends(get_db)):
    """Get all images with their URLs (without metadata)"""
    return image_service.get_images(db, response)

@router.get("/metadata", response_model=List[ImageMetadata])
def get_image_metadata(response: Response, db: Session = Depends(get_db)):
    """Get metadata (likes/dislikes) for all images"""
    return image_service.get_image_metadata(db, response)