from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.services import vote_service
from app.api.schemas import VoteType, VoteResponse
from fastapi.responses import FileResponse
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/{image_id}/{vote_type}", response_model=VoteResponse, status_code=status.HTTP_200_OK)
async def vote(image_id: int, vote_type: VoteType, db: Session = Depends(get_db)):
    """
    Register a vote (like or dislike) for an image.
    
    Returns the updated like/dislike counts.
    """
    try:
        return vote_service.register_vote(image_id, vote_type, db)
    except HTTPException:
        # Re-raise HTTP exceptions from the service
        raise
    except Exception as e:
        # Log any unexpected errors
        logger.exception(f"Unexpected error in vote endpoint: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred while processing your vote"
        )

@router.get("/export", status_code=status.HTTP_200_OK)
async def export_votes(db: Session = Depends(get_db)):
    """
    Export all votes as a CSV file.
    
    Returns a downloadable CSV file.
    """
    try:
        file_path = vote_service.export_votes(db)
        return FileResponse(
            file_path, 
            media_type="text/csv", 
            filename="votes.csv",
            status_code=status.HTTP_200_OK
        )
    except HTTPException:
        # Re-raise HTTP exceptions from the service
        raise
    except Exception as e:
        # Log any unexpected errors
        logger.exception(f"Unexpected error in export endpoint: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred while exporting votes"
        )
