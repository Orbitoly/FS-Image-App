from sqlalchemy.orm import Session
from fastapi import HTTPException
from sqlalchemy.exc import SQLAlchemyError
from app.db.models import Image, Vote
from app.api.schemas import VoteType, VoteResponse
import logging

logger = logging.getLogger(__name__)

def register_vote(image_id: int, vote_type: VoteType, db: Session) -> VoteResponse:
    """Register a like or dislike for an image."""
    try:
        # Start a transaction
        image = db.query(Image).filter(Image.id == image_id).first()
        
        if not image:
            raise HTTPException(status_code=404, detail="Image not found")

        try:
            # Create and store the vote in the database
            vote = Vote(image_id=image_id, vote_type=vote_type)
            db.add(vote)
            db.flush()  # Flush changes to get the vote ID but don't commit yet
            
            # Update like/dislike counters
            if vote_type == VoteType.like:
                image.likes += 1
            else:
                image.dislikes += 1
                
            # Commit the transaction - this will save both the vote and the updated counters
            db.commit()
            
            return VoteResponse(
                message=f"Vote '{vote_type}' registered successfully!",
                image_id=image_id,
                vote_type=vote_type,
                likes=image.likes,
                dislikes=image.dislikes
            )
            
        except SQLAlchemyError as db_error:
            # Roll back the transaction if anything goes wrong
            db.rollback()
            logger.error(f"Database error while voting: {str(db_error)}")
            raise HTTPException(
                status_code=500, 
                detail=f"Failed to register vote: Database error"
            )
            
    except HTTPException:
        # Re-raise HTTP exceptions as they are already properly formatted
        raise
        
    except Exception as e:
        # Catch any other unexpected errors
        logger.exception(f"Unexpected error in register_vote: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred while processing your vote"
        )

def export_votes(db: Session) -> str:
    """Export votes as a CSV file and return the file path."""
    try:
        import csv

        votes = db.query(Vote).all()
        file_path = "votes.csv"

        with open(file_path, mode="w", newline="") as file:
            writer = csv.writer(file)
            writer.writerow(["id", "image_id", "vote_type", "created_at"])
            
            for vote in votes:
                writer.writerow([vote.id, vote.image_id, vote.vote_type.value, vote.created_at])

        return file_path
        
    except SQLAlchemyError as db_error:
        logger.error(f"Database error while exporting votes: {str(db_error)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to export votes: Database error"
        )
        
    except Exception as e:
        logger.exception(f"Unexpected error in export_votes: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred while exporting votes"
        )
