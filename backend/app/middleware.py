from fastapi.middleware.cors import CORSMiddleware

def setup_cors_middleware(app):
    """
    Configure CORS middleware for the FastAPI application.
    """
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  #TODO: Change in prod
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    ) 