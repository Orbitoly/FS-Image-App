from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Enum as SQLEnum
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from .database import Base
import enum

# Enum to enforce valid vote types
class VoteType(enum.Enum):
    like = "like"
    dislike = "dislike"


class Image(Base):
    __tablename__ = "images"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String(255), unique=True, index=True, nullable=False)
    likes = Column(Integer, default=0)
    dislikes = Column(Integer, default=0)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    # Relationship to Vote
    votes = relationship("Vote", back_populates="image", cascade="all, delete")

class Vote(Base):
    __tablename__ = "votes"

    id = Column(Integer, primary_key=True, index=True)
    image_id = Column(Integer, ForeignKey("images.id", ondelete="CASCADE"), nullable=False)
    vote_type = Column(SQLEnum(VoteType), nullable=False)  # Enforced Enum
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    # Relationship to Image
    image = relationship("Image", back_populates="votes")
