from pydantic import BaseModel, ConfigDict
from datetime import datetime
from app.db.models import VoteType  # Import the Enum from models

# Pydantic Model for Creating Images
class ImageBase(BaseModel):
    url: str

class ImageCreate(ImageBase):
    pass

# Pydantic Model for API Responses (Read-Only)
class Image(ImageBase):
    id: int
    created_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)  # Converts SQLAlchemy to Pydantic

# New schema for image metadata (only likes and dislikes)
class ImageMetadata(BaseModel):
    id: int
    likes: int = 0
    dislikes: int = 0

    model_config = ConfigDict(from_attributes=True)

# Pydantic Model for Creating Votes
class VoteBase(BaseModel):
    vote_type: VoteType  # Use Enum instead of str

class VoteCreate(VoteBase):
    image_id: int

# Pydantic Model for API Responses (Read-Only)
class Vote(VoteBase):
    id: int
    image_id: int
    created_at: datetime  # Ensure created_at is included in responses

    model_config = ConfigDict(from_attributes=True)  # Correct way to convert SQLAlchemy to Pydantic


class VoteResponse(BaseModel):
    message: str
    image_id: int
    vote_type: VoteType 
    likes: int
    dislikes: int